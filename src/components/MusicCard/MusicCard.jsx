import React, { useRef, useState, useEffect } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import img from "../../assets/images/gallery.png"


const MusicCard = props => {
    const { item } = props

    const content_ref = useRef(null);
    const card_ref = useRef(null)

    const [activeCopy, setActiveCopy] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleActiveOption = (e) => {
        setActiveCopy(!activeCopy)
    }

    useEffect(() => {
        if (activeCopy) {
            if (document.querySelector(".music-card__copy.active")) {
                document.querySelector(".music-card__copy.active").classList.remove("active")
            }
            content_ref.current.classList.add("active")
        } else {
            content_ref.current.classList.remove("active")
        }
    }, [activeCopy]);


    useEffect(() => {
        if (copied) {
            content_ref.current.classList.remove("active")
        }
    }, [copied]);




    return <div className='music-card' ref={card_ref}>
        <div className={`music-card__img ${!props.isShowFull ? "small-img-wrap" : ""}`}>
            <div className={`music-card__img__img ${!props.isShowFull ? "img-small" : ""}`}
                style={{ backgroundImage: `url(${item.thumbnail ? item.thumbnail : img})` }}></div>
            <div className={`music-card__img__play ${!props.isShowFull ? "play-small" : ""}`}>
                <i className={`bx bx-play-circle ${!props.isShowFull ? "small" : ""}`}></i>
                {
                    props.isShowFull &&
                    <div className="music-card__img__play__option">
                        <i className='bx bx-dots-vertical-rounded'
                            onClick={handleActiveOption}
                        ></i>
                    </div>
                }
            </div>
        </div>
        <CopyToClipboard text="hhh"
            onCopy={() => setCopied(true)}
        >
            <div ref={content_ref} className="music-card__copy">
                <i className='bx bx-link' ></i><span>Sao chép link</span>
            </div>
        </CopyToClipboard>
        {
            props.isShowFull &&
            <h3 className="music-card__name">
                {item.title}
            </h3>
        }
    </div>;
};

export default MusicCard;
