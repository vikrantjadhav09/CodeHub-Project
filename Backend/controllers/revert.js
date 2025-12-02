const fs = require("fs").promises;
const path = require("path");

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".CodeHubCLI");
    const commitsPath = path.join(repoPath, "commits", commitID);
    const projectPath = path.resolve(process.cwd()); // user project root

    try {
        // Check commit exists
        await fs.access(commitsPath).catch(() => {
            throw new Error("Commit not found!");
        });

        const files = await fs.readdir(commitsPath);

        for (const file of files) {
            if (file === "commit.json") continue; // skip metadata

            const src = path.join(commitsPath, file);
            const dest = path.join(projectPath, file);

            const content = await fs.readFile(src);
            await fs.writeFile(dest, content);
        }

        console.log(`Project reverted to commit ${commitID}`);
    } catch (err) {
        console.error("Unable to revert:", err.message);
    }
}

module.exports = { revertRepo };

