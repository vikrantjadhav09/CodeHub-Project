const fs = require("fs").promises;
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Cloudinary config from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".CodeHubCLI");
    const commitsPath = path.join(repoPath, "commits");

    try {
        // Read all commits
        const commitDirs = await fs.readdir(commitsPath);

        if (commitDirs.length === 0) {
            console.log("No commits found to push!");
            return;
        }

        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);

            for (const file of files) {
                // Skip commit.json if you don't want to upload it
                if (file === "commit.json") continue;

                const filePath = path.join(commitPath, file);

                // Upload to Cloudinary under folder: codehub_commits/<commitID>
                await cloudinary.uploader.upload(filePath, {
                    folder: `codehub_commits/${commitDir}`,
                    resource_type: "raw",
                    public_id: file
                });

                console.log(`Uploaded ${file} from commit ${commitDir}`);
            }
        }

        console.log("All commits pushed to Cloudinary!");
    } catch (err) {
        console.error("Error pushing commits to Cloudinary:", err.message);
    }
}

module.exports = { pushRepo };

