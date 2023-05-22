import { animeImages} from './images';
import './SplashPage.css';

function SplashPage() {

    const mainText = ['anime binge idea'];
    const imageArray = [
        animeImages,
    ];

    return (
        <>
            <div className="SplashPage-Find-Your-text">
                <h1>
                    Get your next
                </h1>
            </div>
            <div className='Splashpage-secondary-text'>
                    <h1>
                        {mainText[0]}
                    </h1>
            </div>
            <div className="SP-images">
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
