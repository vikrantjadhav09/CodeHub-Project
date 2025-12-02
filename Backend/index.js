const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");


const mainRouter = require("./routes/main.router");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

// Cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Controllers
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

// Load env
dotenv.config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "codehub_uploads",
        resource_type: "auto",
    },
});

const upload = multer({ storage });

// =============================
// START SERVER COMMAND
// =============================
function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cors({ origin: "*" }));
    app.use("/", mainRouter);

    //MongoDB connection
    const mongoURI = process.env.MONGODB_URL;
    mongoose
        .connect(mongoURI)
        .then(() => console.log("MongoDb Connected! "))
        .catch((err) => console.error("Unable to connect:", err));

    // CLOUDINARY UPLOAD ROUTE
    app.post("/upload", upload.single("file"), (req, res) => {
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded!" });
        }

        res.send({
            message: "File uploaded to Cloudinary!",
            url: req.file.path || req.file.secure_url || req.file.url,      // Cloudinary URL
            public_id: req.file.filename,
        });
    });




    let user = "test";
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
            user = userID;
            console.log("=====");
            console.log(user);
            console.log("=====");
            socket.join(userID);
        });
    });

    const db = mongoose.connection;

    db.once("open", async () => {
        console.log("CRUD operations called");
        // CRUD operations
    });


    httpServer.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    });
}

// =============================
// YARGS COMMANDS
// =============================
yargs(hideBin(process.argv))
    .command("start", "Starts a new server", {}, startServer)
    .command("init", "Initialise a new repository", {}, initRepo)
    .command(
        "add <file>",
        "Add a file to the repository",
        (yargs) => {
            yargs.positional("file", {
                describe: "File to add to the staging area",
                type: "string",
            });
        },
        (argv) => {
            addRepo(argv.file);
        }
    )
    .command(
        "commit <message>",
        "Commit the staged files",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit message",
                type: "string",
            });
        },
        (argv) => {
            commitRepo(argv.message);
        }
    )
    .command("push", "Push commits to Cloudinary", {}, pushRepo)
    .command("pull", "Pull commits from Cloudinary", {}, pullRepo)
    .command(
        "revert <commitID>",
        "Revert to a specific commit",
        (yargs) => {
            yargs.positional("commitID", {
                describe: "Commit ID to revert to",
                type: "string",
            });
        },
        (argv) => {
            revertRepo(argv.commitID);
        }
    )
    .demandCommand(1, "You need at least one command")
    .help().argv;

