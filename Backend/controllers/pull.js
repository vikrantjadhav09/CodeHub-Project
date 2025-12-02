const fs = require("fs").promises;
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".CodeHubCLI");
    const commitsPath = path.join(repoPath, "commits");

    try {
        console.log("Fetching commits list from Cloudinary...");

        const result = await cloudinary.search
            .expression("public_id:codehub_commits/*")
            .max_results(500)
            .execute();

        if (!result.resources || result.resources.length === 0) {
            console.log("No commits found in Cloudinary!");
            return;
        }

        const commits = {};

        result.resources.forEach((file) => {
            // Extract commitID from public_id
            // codehub_commits/<commitID>/<fileName>
            const parts = file.public_id.split("/");

            const commitID = parts[1]; // index 0 = codehub_commits, index 1 = commitID

            if (!commits[commitID]) commits[commitID] = [];
            commits[commitID].push(file);
        });

        // Download all files
        for (const commitID in commits) {
            const commitDir = path.join(commitsPath, commitID);
            await fs.mkdir(commitDir, { recursive: true });

            for (const file of commits[commitID]) {
                const downloadURL = file.secure_url;

                const fileContent = await fetch(downloadURL).then((r) =>
                    r.arrayBuffer()
                );

                const fileName = file.public_id.split("/").pop();

                await fs.writeFile(
                    path.join(commitDir, fileName),
                    Buffer.from(fileContent)
                );

                console.log(`Downloaded: ${fileName}`);
            }
        }

        console.log("All commits pulled from Cloudinary!");
    } catch (err) {
        console.error("Pull error:", err.message);
    }
}

module.exports = { pullRepo };


