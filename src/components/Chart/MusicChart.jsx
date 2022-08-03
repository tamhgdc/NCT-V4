import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { getSong } from 'nhaccuatui-api-full';

import { useDispatch } from 'react-redux';
import { addSong } from '../../redux/reducers/songSlice';

const MusicChart = (props) => {

    const { item } = props
    const dispatch = useDispatch()
    const itemRef = useRef(null)
    const iconRef = useRef(null)

    const [showRank, setShowRank] = useState(false);

    const viewRanking = () => {
        if (!showRank) {
            itemRef.current.style.display = "flex"
            iconRef.current.style.transform = "rotate(180deg)"
            setShowRank(true)
        } else if (showRank) {
            itemRef.current.style.display = "none"
            iconRef.current.style.transform = "rotate(0)"
            setShowRank(false)
        }
    }

    const playSong = async (item) => {
        const res = await getSong(item.songKey)
        if (res) {
            dispatch(addSong(res.song))
        }
    }

    return (
        <>
            {
                item &&
                <div className="music-chart">
                    <span className="music-chart__stt">{props.index}</span>
                    <div className="music-chart__item" onClick={() => playSong(item)}>
                        <div className="music-chart__item__item">
                            <div className="music-chart__item__item__info">
                                <img src={item.thumbnail} alt="" />
                                <div className="music-chart__item__item__info__info">
                                    <span className="name">{item.title}</span>
                                    <div className="art">
                                        {
                                            item.artists.map((item, i) => (
                                                <Link key={i} to={`/artist/${item.shortLink}`}>
                                                    <span>{`${i > 0 ? ", " : ""}${item.name}`}</span>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="music-chart__item__item__icon">
                                <div className="rank-change">
                                    {
                                        item.oldPosition === 0 ? <span className="new">New</span>
                                            :
                                            item.oldPosition - item.position === 0 ?
                                                <span className="zero">
                                                    <i className='bx bx-minus'></i>
                                                </span>
                                                : item.oldPosition - item.position > 0 ?
                                                    <span className="up">
                                                        <i className='bx bxs-up-arrow'></i>{item.oldPosition - item.position}
                                                    </span>
                                                    :
                                                    <span className="down">
                                                        <i className='bx bxs-down-arrow'></i> {-(item.oldPosition - item.position)}
                                                    </span>
                                    }
                                </div>
                                <div className="view-rank">
                                    <i className='bx bxs-chevron-down'
                                        onClick={viewRanking}
                                        ref={iconRef}
                                    ></i>
                                </div>
                            </div>
                        </div>
                        <div className="music-chart__item__chart" ref={itemRef}>
                            <div className="music-chart__item__chart__last-week">
                                <span>{item.position}</span>
                                <p>TUẦN TRƯỚC</p>
                            </div>
                            <div className="music-chart__item__chart__top">
                                <span>{item.highestPosition}</span>
                                <p>CAO NHẤT</p>
                            </div>
                            <div className="music-chart__item__chart__total">
                                <span>{item.totalWeekInRanked}</span>
                                <p>TUẦN TRONG BXH</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default MusicChart;
