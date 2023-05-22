import { animeImages} from './images';
import './SplashPage.css';

function SplashPage() {
    //NEED TO ADD MORE, LOOK INTO KEYFRAMES
    const mainText = ['anime binge idea'];
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
                        {urls.map((url, j) => (
                            <img
                                src={url}
                                className='splashpage-images'
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default SplashPage;
