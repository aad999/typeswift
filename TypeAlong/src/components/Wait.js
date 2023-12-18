import React, { useState, useEffect } from 'react';

const Wait = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Toggle the visibility state
            setIsVisible((prevVisible) => !prevVisible);
        }, 500); // Flashing interval in milliseconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures that the effect runs only once on mount

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            {isVisible && (
                <div className="text-white text-xl font-extrabold italic">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default Wait;
