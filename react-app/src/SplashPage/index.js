import { animeImages, dogImages, foodImages } from './images';
import './SplashPage.css';
import React, { useState, useEffect } from "react"

function SplashPage() {
    //NEED TO ADD MORE, LOOK INTO KEYFRAMES
    const mainText = ['Big Anime Show !', 'Favorite Dog Breed', 'Favorite New Meal'];
    const imageArrays = [
        animeImages,
        dogImages,
        foodImages
    ];

    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentArrayIndex, setCurrentArrayIndex] = useState(0)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentTextIndex(prevIndex => (prevIndex + 1) % mainText.length);
        }, 4500)

        const imageInterval = setInterval(() => {
            setCurrentArrayIndex(prevIndex => (prevIndex + 1) % imageArrays.length);
        }, 4500)

        return () => {
            clearInterval(textInterval);
            clearInterval(imageInterval);
        };
    }, [mainText.length, imageArrays.length]);

    return (
        <>
            <div className='SplashPage'>
                <div className="SplashPage-static">
                    <h1 >
                        Get your next
                    </h1>
                </div>
                <div className='Splashpage-secondary-text'>
                    <h2 className="secondary-text">
                        {mainText[currentTextIndex]}
                    </h2>
                </div>
                <div className="Splashpage-image-container">
                    {imageArrays.map((urls, i) => (
                        <div key={i}>
                            {urls.map((url, j) => (
                                <img
                                    key={`${i}-${j}`}
                                    src={url}
                                    alt={`image-${j}`}
                                    id={`img${j + 1}`}
                                    className={i === currentArrayIndex ? "splashpage-images animated-image" : "hidden"}
                                    style={{ borderRadius: '10px' }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SplashPage;
