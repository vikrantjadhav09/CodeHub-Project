const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".CodeHubCLI");
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try {
        // Check if staging folder exists
        await fs.access(stagedPath).catch(() => {
            throw new Error("No files in staging area! Add files first.");
        });

        // Generate unique commit ID
        const commitID = uuidv4();
        const commitDir = path.join(commitPath, commitID);

        // Make commit folder
        await fs.mkdir(commitDir, { recursive: true });

        // Copy staged files to commit folder
        const files = await fs.readdir(stagedPath);
        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file)
            );
        }

        // Save commit metadata
        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify(
                { message, date: new Date().toISOString() },
                null,
                2
            )
        );

        console.log(`Commit ${commitID} created with message: ${message}`);
    } catch (err) {
        console.error("Error committing files :", err.message);
    }
}

module.exports = { commitRepo };
