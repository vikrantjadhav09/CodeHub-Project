import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Repository.css";
import { useAuth } from "../../authContext";

const API = "http://localhost:3000";

const Repository = () => {

    const { currentUser } = useAuth();
    const userId = currentUser?._id || currentUser;  // IMPORTANT FIX

    const [repos, setRepos] = useState([]);
    const [repoName, setRepoName] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchRepositories = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/repo/user/${userId}`);
            setRepos(res.data.repositories || []);
        } catch (err) {
            console.error("❌ Error fetching repos:", err);
            setError("Failed to fetch repositories.");
        } finally {
            setLoading(false);
        }
    };

    const createRepository = async (e) => {
        e.preventDefault();
        if (!repoName) return setError("Repository name is required!");

        setLoading(true);
        setError("");
        try {
            const res = await axios.post(`${API}/repo/create`, {
                owner: userId,        // FIX HERE
                name: repoName,
                description,
                visibility,
                issues: [],
                content: [],
            });

            console.log("Repo created:", res.data);
            setRepoName("");
            setDescription("");
            setVisibility(true);
            fetchRepositories();

        } catch (err) {
            console.error("❌ Error creating repository:", err);
            setError("Failed to create repository.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchRepositories();
    }, [userId]);

    return (
        <div className="repo-container">
            <h2>Your Repositories</h2>

            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}

            <form className="repo-form" onSubmit={createRepository}>
                <input
                    type="text"
                    placeholder="Repository Name"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                />
                <label className="visibility-label">
                    <input
                        type="checkbox"
                        checked={visibility}
                        onChange={(e) => setVisibility(e.target.checked)}
                    />{" "}
                    Public
                </label>
                <button type="submit" className="create-btn">
                    Create Repository
                </button>
            </form>

            <ul className="repo-list">
                {repos.length === 0 && <li>No repositories found.</li>}
                {repos.map((repo) => (
                    <li key={repo._id} className="repo-item">
                        <strong>{repo.name}</strong>
                        <p>{repo.description || "No description"}</p>
                        <span className={repo.visibility ? "public" : "private"}>
                            {repo.visibility ? "Public" : "Private"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Repository;
