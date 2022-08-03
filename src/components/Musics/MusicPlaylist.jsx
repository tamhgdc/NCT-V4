import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import _ from "lodash"
import { getSong } from 'nhaccuatui-api-full'

import { addSong } from '../../redux/reducers/songSlice'

const MusicPlaylist = (props) => {

    const { curSong, active, playlist } = props


    const dispatch = useDispatch()

    const playSong = async (item) => {
        const res = await getSong(item.songKey || item.key)
        if (res) {
            dispatch(addSong(res.song))
        }
    }

    return (
        <div className="music-playlist">
            <div className="music-playlist__close" onClick={() => props.setactivePlaylist(!active)}><i className='bx bx-x'></i></div>
            {
                curSong && !_.isEmpty(curSong) &&
                <div className="music-playlist__cur-song">
                    <p className="music-playlist__cur-song__title">Đang phát</p>
                    <div className="music-playlist__cur-song__item">
                        <img src={curSong.thumbnail} alt="" />
                        <div className="music-playlist__cur-song__item__info">
                            <p className="name">{curSong.title}</p>
                            <div className="art">
                                {
                                    curSong.artists.map((el, i) => (
                                        <Link to={`/artist/${el.shortLink}`} key={i}>
                                            <span>{`${i > 0 ? ", " : ""}${el.name}`}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                playlist && playlist.length > 0 &&
                <div className="music-playlist__list">
                    <p className="music-playlist__list__title">Danh sách bài hát</p>
                    {
                        playlist.map((item, i) => (
                            <div className="music-playlist__cur-song__item"
                                key={i}
                                onClick={() => playSong(item)}
                            >
                                <img src={item.thumbnail} alt="" />
                                <div className="music-playlist__cur-song__item__info">
                                    <p className="name">{item.title}</p>
                                    <div className="art">
                                        {
                                            item.artists.map((el, i) => (
                                                <Link to={`/artist/${el.shortLink}`} key={i}>
                                                    <span>{`${i > 0 ? ", " : ""}${el.name}`}</span>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default MusicPlaylist