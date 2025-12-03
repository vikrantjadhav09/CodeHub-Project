# AI Commit Message Generator - Integration Guide

## Overview
The AI Commit Message Generator uses OpenAI's GPT models to automatically generate descriptive, well-formatted commit messages based on code changes. This feature integrates seamlessly with your CodeHub project.

## Setup Instructions

### 1. Get OpenAI API Key
- Visit [OpenAI Platform](https://platform.openai.com/)
- Sign up or log in to your account
- Navigate to API keys and create a new secret key
- Copy the key (you'll only see it once)

### 2. Configure Environment Variables
Add the following to your `.env` file in the Backend directory:

```
OPENAI_API_KEY=sk-...your_api_key_here...
```

Alternatively, use the provided `.env.example` as a template:
```bash
cp Backend/.env.example Backend/.env
```
Then edit the `.env` file and add your OpenAI API key.

### 3. Backend Setup
The backend implementation is complete. The AI feature includes:

- **Controller**: `Backend/controllers/aiController.js`
  - `generateCommitMessage(changes)` - Generates commit messages from code changes
  
- **Route**: `Backend/routes/ai.router.js`
  - `POST /api/ai/generate-commit-message` - API endpoint for generating commit messages

### 4. Frontend Integration

#### Using the AiCommitHelper Component

Import and use the component in your commit/dashboard page:

```jsx
import AiCommitHelper from "./components/AiCommitHelper";
import { useState } from "react";

function CommitPage() {
    const [changes, setChanges] = useState([]);
    const [message, setMessage] = useState("");

    const handleSelectMessage = (selectedMsg) => {
        setMessage(selectedMsg);
    };

    return (
        <div>
            {/* Your existing form */}
            
            <AiCommitHelper 
                changes={changes}
                onSelectMessage={handleSelectMessage}
                disabled={false}
            />
            
            <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Commit message..."
            />
        </div>
    );
}
```

## API Endpoint

### POST `/api/ai/generate-commit-message`

#### Authentication
- Required: JWT Token (via authMiddleware)

#### Request Body
```json
{
    "changes": [
        {
            "filename": "src/app.js",
            "type": "modified",
            "diff": "... git diff output ..."
        },
        {
            "filename": "src/utils.js",
            "type": "added",
            "diff": "... git diff output ..."
        }
    ]
}
```

#### Response (Success)
```json
{
    "success": true,
    "suggestions": {
        "title": "Add user authentication module",
        "description": "Implemented JWT-based authentication system with login and signup endpoints. Added middleware for protecting routes.",
        "tags": ["feature", "auth"],
        "type": "feat",
        "fullMessage": "feat: Add user authentication module\n\nImplemented JWT-based authentication system with login and signup endpoints. Added middleware for protecting routes."
    },
    "model": "gpt-3.5-turbo",
    "usage": {
        "prompt_tokens": 150,
        "completion_tokens": 85,
        "total_tokens": 235
    }
}
```

#### Response (Error)
```json
{
    "success": false,
    "error": "OPENAI_API_KEY is not set"
}
```

## Component Props

### AiCommitHelper Component

| Prop | Type | Description |
|------|------|-------------|
| `changes` | Array | Array of file changes with `filename`, `type`, and `diff` |
| `onSelectMessage` | Function | Callback when user selects a suggestion |
| `disabled` | Boolean | Disable the generate button |

## Response Format

The AI generates commit messages following **Conventional Commits** format:

- **Type**: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`
- **Title**: Concise description (max 50 characters)
- **Description**: Detailed explanation of changes
- **Tags**: Relevant tags for categorization

## Example Usage

1. **User selects changed files** in the commit interface
2. **Clicks "Generate Suggestions"** button
3. **AI analyzes the diffs** and generates suggested messages
4. **User reviews and selects** the best suggestion
5. **Message is populated** in the commit form

## Cost Considerations

- Uses GPT-3.5 Turbo (cost-effective)
- ~150-200 tokens per request (~$0.0001 per request)
- Token usage is returned in API response for monitoring

## Troubleshooting

### "OPENAI_API_KEY is not set"
- Ensure `.env` file exists with `OPENAI_API_KEY`
- Restart backend server after adding key
- Check for typos in environment variable name

### "No changes provided"
- Ensure changes array is not empty
- Verify changes have `filename`, `type`, and `diff` properties

### Generating takes too long
- API timeout is set to default
- Check internet connection
- Verify OpenAI API status

### Weak suggestions
- Provide more context in diffs
- Include more detailed change information
- The more complete the diff, the better the suggestion

## Features

✨ **Smart Message Generation**
- Analyzes actual code changes
- Follows conventional commits format
- Context-aware suggestions

🎯 **Conventional Commits**
- Proper categorization (feat, fix, etc.)
- Structured message format
- Type and tag suggestions

⚡ **Fast & Efficient**
- Uses GPT-3.5 Turbo for speed
- Token usage optimization
- Instant suggestions

🔒 **Secure**
- Requires authentication
- API key stored in environment
- Changes not logged/stored

## Next Steps

1. Add your OpenAI API key to `.env`
2. Restart the backend server
3. Import `AiCommitHelper` component in your commit page
4. Test with actual file changes
5. Customize the prompt in `aiController.js` if needed

## Support

For issues or questions:
1. Check troubleshooting section
2. Verify API key is valid
3. Check OpenAI API documentation
4. Review error messages in console logs
