import { animeImages} from './images';
import './SplashPage.css';

function SplashPage() {
    //NEED TO ADD MORE, LOOK INTO KEYFRAMES
    const mainText = ['Big Anime Show !'];
    const imageArray = [
        animeImages,
    ];

    return (
        <>
            <div className="SplashPage-static">
                <h1>
                    Get your next
                </h1>
            </div>
            <div className='Splashpage-secondary-text'>
                    <h2>
                        {/* NEEDS TO ROTATE LIKE PINTEREST */}
                        {mainText[0]}
                    </h2>
            </div>
            <div className="Splashpage-image-container">
                {imageArray.map((urls, i) => (
                    <div key={i}>
                        {urls.map((url) => (
                            <img
                                src={url}
                                alt={`anime-${i}`}
                                className={`splashpage-images`}
                                // className={`splashpage-images-img-${i+1}`}
                                style={{borderRadius: '10px'}}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default SplashPage;
