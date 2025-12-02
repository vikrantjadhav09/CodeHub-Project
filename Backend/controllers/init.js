const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".CodeHubCLI");
    const commitsPath = path.join(repoPath, "commits");

    try {
        // Create main repo folder
        await fs.mkdir(repoPath, { recursive: true });

        // Create commits folder
        await fs.mkdir(commitsPath, { recursive: true });

        // Save cloudinary related config
        const configData = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            folder: "codehub_commits"
        };

        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify(configData, null, 2)
        );

        console.log("Cloudinary Repository initialised!");
    } catch (err) {
        console.error("Error initialising repository:", err);
    }
}

module.exports = { initRepo };
