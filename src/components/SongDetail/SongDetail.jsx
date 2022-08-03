import React, { useEffect, useState } from 'react'

import { getSong, getLyric } from 'nhaccuatui-api-full'
import { useParams } from 'react-router-dom'
import _ from "lodash"
import { useDispatch } from 'react-redux'

import { addSong } from '../../redux/reducers/songSlice'


import Footer from '../Footer/Footer'

const SongDetail = () => {

    const { key } = useParams()

    const [item, setItem] = useState({})
    const [lyric, setLyric] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        const getSongDetail = async () => {
            try {
                const res = await getSong(key)
                if (res) {
                    setItem(res.song)
                    console.log("data", res.song)
                }
            }
            catch (e) {
                console.log("Error", e);
            }
        }

        const getLyricDetail = async () => {
            try {
                const res = await getLyric(key)
                if (res) {
                    setLyric(res.lyric)
                }
            }
            catch (e) {
                console.log("Error", e);
            }
        }
        getSongDetail()
        getLyricDetail()
        window.scrollTo(0, 0)
    }, [])

    const playMusic = () => {
        dispatch(addSong(item))
    }

    return (
        <>
            {
                item && !_.isEmpty(item) &&
                <div className="song-detail">
                    <div className="song-detail__info">
                        <div className="song-detail__info__img"
                            onClick={() => playMusic(item)}
                            style={{ backgroundImage: `url(${item.thumbnail})` }}
                        >
                            <i className='bx bx-play-circle'></i>
                        </div>
                        <div className="song-detail__info__info">
                            <p className="title">Bài hát: <span>{item.title}</span></p>
                            <div className="art">
                                <div className="art__img">
                                    {
                                        item.artists.map((item, i) => (
                                            <img src={item.imageUrl} key={i} />
                                        ))
                                    }
                                </div>
                                <div className="art__name">
                                    {
                                        item.artists.map((item, i) => (
                                            <span key={i}>{`${i > 0 ? ", " : ""}${item.name}`}</span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="time">Thời gian: <span>{item.duration}</span></div>
                            <p className="description">
                                {`Ca khúc ${item.title} do ca sĩ ${item.artists.map((item, i) => (
                                    `${i > 0 ? ", " : ""}${item.name}`
                                ))
                                    } thể hiện. ${item.title} miễn phí tại tMusic.com.`}
                            </p>
                        </div>
                    </div>
                    {
                        lyric && !_.isEmpty(lyric) &&
                        <div className="song-detail__lyric">
                            <h2 className="title">Lời bài hát</h2>
                            <p className="author">Lời đăng bởi: <span>{lyric.userNameUpload}</span></p>
                            <div className="lyric" dangerouslySetInnerHTML={{ __html: lyric.lyric }}>
                            </div>
                        </div>
                    }
                </div>
            }
            <Footer />
        </>
    )
}

export default SongDetail