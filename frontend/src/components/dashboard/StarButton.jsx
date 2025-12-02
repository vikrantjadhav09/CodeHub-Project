import React, { useState, useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa'; // using react-icons

function StarButton({ reps, sahi, onToggle }) {
    const [starred, setStarred] = useState(sahi);
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        setStarred(sahi); // sync with props if updated
    }, [sahi]);
    //   console.log(reps.reps)
    const toggleStar = async () => {
        let result;
        if (starred) {
            result = await fetch(`http://localhost:3000/unstar/${userId}/${reps}`);
        } else {
            result = await fetch(`http://localhost:3000/star/${userId}/${reps}`);
        }

        setStarred(!starred);
        if (onToggle) onToggle(reps, !starred);
    };


    return (
        <button
            onClick={toggleStar}
            style={{
                backgroundColor: '#21262d',
                color: starred ? '#f1c40f' : '#c9d1d9',
                border: '1px solid #30363d',
                borderRadius: '6px',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
            }}
        >
            {starred ? <FaStar /> : <FaRegStar />}
            {starred ? 'Unstar' : 'Star'}
        </button>
    );
}

export default StarButton;