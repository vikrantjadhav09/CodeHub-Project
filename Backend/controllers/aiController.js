const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate commit message using AI based on code changes
 * @param {Array} changes - Array of file changes with diffs
 * @returns {Promise<Object>} - Generated commit message and suggestions
 */
async function generateCommitMessage(changes) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not set");
        }

        if (!changes || changes.length === 0) {
            throw new Error("No changes provided");
        }

        // Format changes into a readable prompt
        const changesText = changes
            .map((change) => {
                return `File: ${change.filename}\nChange Type: ${change.type}\n${
                    change.diff || "No diff available"
                }`;
            })
            .join("\n---\n");

        const prompt = `You are a helpful Git commit message generator. Analyze the following code changes and generate a concise, descriptive commit message following conventional commits format.

Code Changes:
${changesText}

Please provide:
1. A main commit message (max 50 characters, imperative mood)
2. A detailed description (2-3 sentences explaining the changes)
3. Any relevant tags (if applicable)

Format your response as JSON:
{
  "title": "commit message title",
  "description": "detailed description",
  "tags": ["tag1", "tag2"],
  "type": "feat|fix|refactor|docs|style|test|chore"
}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert Git commit message writer.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        // Parse the response
        const responseText =
            completion.choices[0].message.content.trim();

        // Extract JSON from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid response format from AI");
        }

        const suggestions = JSON.parse(jsonMatch[0]);

        return {
            success: true,
            suggestions: {
                title: suggestions.title,
                description: suggestions.description,
                tags: suggestions.tags || [],
                type: suggestions.type,
                fullMessage: `${suggestions.type}: ${suggestions.title}\n\n${suggestions.description}`,
            },
            model: completion.model,
            usage: completion.usage,
        };
    } catch (error) {
        console.error("Error generating commit message:", error.message);
        return {
            success: false,
            error: error.message,
        };
    }
}

module.exports = { generateCommitMessage };
