const express = require("express");
const { generateCommitMessage } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

const aiRouter = express.Router();

/**
 * POST /api/ai/generate-commit-message
 * Generate AI commit message based on code changes
 * @body {Array} changes - Array of file changes with diffs
 * @returns {JSON} - Generated commit message suggestions
 */
aiRouter.post(
    "/generate-commit-message",
    authMiddleware,
    async (req, res) => {
        try {
            const { changes } = req.body;

            if (!changes || !Array.isArray(changes)) {
                return res.status(400).json({
                    success: false,
                    error: "Changes array is required",
                });
            }

            const result = await generateCommitMessage(changes);

            if (!result.success) {
                return res.status(500).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in generate-commit-message route:", error);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
);

module.exports = aiRouter;
