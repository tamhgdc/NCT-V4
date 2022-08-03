import React, { useEffect, useState } from 'react'
import { getPlaylistDetail, getSong } from "nhaccuatui-api-full"
import _ from "lodash"
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addSong, addPlaylist } from '../../redux/reducers/songSlice'
import Footer from "../Footer/Footer"

const PlayListItem = () => {

    const { key } = useParams()
    const dispatch = useDispatch()

    const [item, setItem] = useState({})


    useEffect(() => {
        const getPlayList = async () => {
            try {
                const res = await getPlaylistDetail(key)
                if (res) {
                    setItem(res.playlist)
                }
            }
            catch (e) {
                console.log("Error", e);
            }
        }
        getPlayList()
        window.scrollTo(0, 0)
    }, [])


    const playSong = async (item) => {
        const res = await getSong(item.key)
        if (res) {
            dispatch(addSong(res.song))
        }
    }

    if (item && !_.isEmpty(item)) {
        dispatch(addPlaylist(item.songs))
    }



    return (
        <>
            {
                item && !_.isEmpty(item) &&
                <div className="playlist-item">
                    <div className="playlist-item__info">
                        <div className="playlist-item__info__img">
                            <div className="playlist-item__info__img__img"
                                style={{ backgroundImage: `url(${item.thumbnail})` }}
                            >
                            </div>
                        </div>
                        <div className="playlist-item__info__info">
                            <p className="title">Playlist: <span>{item.title}</span></p>
                            <p className="date">{item.dateModify}</p>
                            <div className="tags">
                                <span className="tags__title">Tags: </span>
                                {
                                    item.listTag.map((item, i) => (
                                        <span className="tags__item" key={i}>{item.name}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="playlist-item__songs">
                        <h2 className="playlist-item__songs__title">Danh sách bài hát</h2>
                        <ul className="playlist-item__songs__list">
                            <li className="playlist-item__songs__list__item">
                                <div className="title head">Tiêu đề</div>
                                <div className="art head">Nghệ Sĩ</div>
                                <div className="time head">Thời gian</div>
                            </li>
                            {
                                item.songs && item.songs.map((el, i) => (
                                    <li className="playlist-item__songs__list__item" key={i}
                                        onClick={() => playSong(el)}
                                    >
                                        <div className="title">{el.title}</div>
                                        <div className="art">
                                            {
                                                el.artists.map((el, i) => (
                                                    <span key={i}>{`${i > 0 ? ", " : ""}${el.name}`}</span>
                                                ))
                                            }
                                        </div>
                                        <div className="time">{el.duration}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default PlayListItem