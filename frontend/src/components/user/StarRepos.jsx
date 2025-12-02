import { useState, useEffect } from "react"


function StarRepos({ userId }) {

    let [starReposData, setStarRepos] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/userProfile/${userId}`)
            const user = await response.json()

            setStarRepos(user.starRepos)


        }

        fetchData()
    }, [])
    return (
        <div className="starred-repos">
            <h2>Starred Repositories</h2>
            {
                starReposData.map((repo, index) => (
                    <div className="repo-card" key={index}>
                        <div className="repo-header">
                            <h3 className="repo-name">{repo.name}</h3>
                            <span className="repo-owner">by {repo.owner.username}</span>
                        </div>
                        <p className="repo-description">{repo.description || "No description provided."}</p>
                        {/* <div className="repo-footer">
          <span className="stars">⭐ {repo.stars || 0}</span>
        </div> */}
                    </div>
                ))
            }
        </div>
    )
}

export default StarRepos