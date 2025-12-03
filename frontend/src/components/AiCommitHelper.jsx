import React, { useState } from "react";
import axios from "axios";
import "./AiCommitHelper.css";

const AiCommitHelper = ({ changes, onSelectMessage, disabled = false }) => {
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    const generateSuggestions = async () => {
        if (!changes || changes.length === 0) {
            setError("No changes to analyze");
            return;
        }

        setLoading(true);
        setError(null);
        setSuggestions(null);

        try {
            const response = await axios.post(
                "/api/ai/generate-commit-message",
                { changes },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setSuggestions(response.data.suggestions);
                setSelectedSuggestion(response.data.suggestions.title);
            } else {
                setError(response.data.error || "Failed to generate suggestions");
            }
        } catch (err) {
            console.error("Error generating suggestions:", err);
            setError(
                err.response?.data?.error || "Failed to generate suggestions"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        setSelectedSuggestion(suggestion);
        if (onSelectMessage) {
            onSelectMessage(suggestion);
        }
    };

    return (
        <div className="ai-commit-helper">
            <div className="ai-header">
                <h3>✨ AI Commit Message Generator</h3>
                <button
                    onClick={generateSuggestions}
                    disabled={disabled || loading || !changes || changes.length === 0}
                    className="generate-btn"
                >
                    {loading ? "Generating..." : "Generate Suggestions"}
                </button>
            </div>

            {error && (
                <div className="error-message">
                    <span>⚠️ {error}</span>
                </div>
            )}

            {suggestions && (
                <div className="suggestions-container">
                    <div className="suggestion-item">
                        <h4>Suggested Message</h4>
                        <p className="message-title">{suggestions.title}</p>
                        <p className="message-description">{suggestions.description}</p>
                        {suggestions.type && (
                            <div className="commit-type">
                                Type: <span className="type-badge">{suggestions.type}</span>
                            </div>
                        )}
                        {suggestions.tags && suggestions.tags.length > 0 && (
                            <div className="tags">
                                {suggestions.tags.map((tag, idx) => (
                                    <span key={idx} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={() =>
                                handleSelectSuggestion(suggestions.fullMessage)
                            }
                            className="use-suggestion-btn"
                        >
                            Use This Message
                        </button>
                    </div>
                </div>
            )}

            {selectedSuggestion && (
                <div className="selected-message">
                    <p>
                        <strong>Selected:</strong> {selectedSuggestion.substring(0, 50)}
                        ...
                    </p>
                </div>
            )}
        </div>
    );
};

export default AiCommitHelper;
