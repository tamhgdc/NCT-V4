import React from 'react';

import { Link } from 'react-router-dom';

const VideoHot = props => {

    const videos = props.videos ? props.videos : null


    return <div className="video-hot">
        <div className="video-hot__large">
            {
                videos && videos.slice(0, 2).map((item, i) => (
                    <div className="video-hot__large__item" key={i}>
                        <Link to={`video/${item.key}`}>
                            <div className="video-hot__large__item__img">
                                <div className="video-hot__large__item__img__img"
                                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                                ></div>
                                <i className='bx bx-play-circle play'></i>
                                <div className="overlay"></div>
                                <i className='bx bx-dots-vertical-rounded options'></i>
                                <span className="time">{item.duration}</span>
                            </div>
                        </Link>
                        <h3 className="video-hot__large__item__name">
                            {item.title}
                        </h3>
                        <span className="video-hot__large__item__art">
                            {item.artists[0].name}
                        </span>
                    </div>
                ))
            }
        </div>
        <div className="video-hot__small">
            {
                videos && videos.slice(3, 7).map((item, i) => (
                    <VideoCard item={item} key={i} videoHot={true} />
                ))
            }
        </div>
    </div>;
};

export const VideoCard = props => {

    const { item, videoHot } = props

    return (
        <div className={`video-hot__small__item ${videoHot ? "item-video-hot" : ""}`}>
            <Link to={`/video/${item.key}`}>
                <div className="video-hot__small__item__img">
                    <div className="video-hot__small__item__img__img"
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                    ></div>
                    <i className='bx bx-play-circle play'></i>
                    <div className="overlay"></div>
                    <i className='bx bx-dots-vertical-rounded options'></i>
                    <span className="time">{item.duration}</span>
                </div>
            </Link>
            <h3 className="video-hot__small__item__name">
                {item.title}
            </h3>
            <span className="video-hot__small__item__art">
                {item.artists[0].name}
            </span>
        </div>
    )
}

export default VideoHot;
