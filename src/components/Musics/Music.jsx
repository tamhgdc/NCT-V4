import React, { useState, useEffect, useRef } from 'react';

import bgMusic from "../../assets/images/bg-music.jpg"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addSong } from '../../redux/reducers/songSlice';
import { getSong } from 'nhaccuatui-api-full';
import MusicPlaylist from './MusicPlaylist';

import _ from "lodash"

const Music = (props) => {

    const song = useSelector(state => state.song.song)
    const playlist = useSelector(state => state.song.playlist)
    const dispatch = useDispatch()

    const audioRef = useRef(null)
    const rangeRef = useRef(null)
    const volumeRef = useRef(null)
    const playerRef = useRef(null)
    const fillVolumeRef = useRef(null)
    const musicPlayerRef = useRef(null)
    const nextMusicRef = useRef(null)

    const [play, setPlay] = useState(false)
    const [timeCur, setTimeCur] = useState("00:00")
    const [progressPercent, setProgressPercent] = useState(0)
    const [volumeValue, setVolumeValue] = useState(60)
    const [isRepeatMusic, setIsRepeatMusic] = useState(false)

    const [activePlaylist, setactivePlaylist] = useState(false)

    const playMusic = () => {
        setPlay(!play)
        if (!play) {
            audioRef.current.play()

        } else {
            audioRef.current.pause()
        }
    }

    useEffect(() => {
        if (song) {
            if (audioRef) {
                setPlay(true)
                audioRef.current.autoplay = true
            }
            setTimeCur("00:00")
            setProgressPercent(0)
        } else {
            if (audioRef) {
                audioRef.current.pause()
            }
            setPlay(false)
            setTimeCur("00:00")
            setProgressPercent(0)
        }
    }, [song])




    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        let seconds = 0
        if (Math.floor(minutes * 60) === Math.floor(time)) {
            seconds = 0
        } else {
            seconds = Math.floor(time - (minutes * 60))
        }

        return {
            minutes, seconds
        }
    }


    const handleChangeInput = (e) => {
        if (audioRef.current.duration) {
            const currTime = Math.floor((e.target.value * audioRef.current.duration) / 100)
            const { seconds, minutes } = formatTime(currTime)
            audioRef.current.currentTime = currTime
            setProgressPercent(Math.floor((currTime / audioRef.current.duration) / 100))
            setTimeCur(`0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
        }
    }



    useEffect(() => {
        const handleRangeInput = () => {
            if (audioRef.current.duration) {
                const progress = Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)
                const { seconds, minutes } = formatTime(audioRef.current.currentTime);
                setProgressPercent(progress)
                setTimeCur(`0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
            }
        }

        const changeVolume = () => {
            fillVolumeRef.current.style.width = `${volumeRef.current.value}%`
            setVolumeValue(volumeRef.current.value)
            audioRef.current.volume = volumeRef.current.value / 100
        }

        const endedMusic = () => {
            if (isRepeatMusic) {
                audioRef.current.play()
            } else {
                nextMusicRef.current.click()
            }

        }

        volumeRef.current.addEventListener('input', changeVolume)
        audioRef.current.addEventListener('timeupdate', handleRangeInput)
        audioRef.current.addEventListener('ended', endedMusic)

        return () => {
            if (audioRef) {
                audioRef.current.removeEventListener('timeupdate', handleRangeInput)
                audioRef.current.removeEventListener('ended', endedMusic)
            }
            if (volumeRef) {

                volumeRef.current.removeEventListener('input', changeVolume)
            }
        }
    }, [isRepeatMusic])

    const viewPlaylist = () => {
        const heightPlayer = playerRef.current.offsetHeight

        if (musicPlayerRef) {
            musicPlayerRef.current.style.bottom = `${heightPlayer + 30}px`
        }
        setactivePlaylist(!activePlaylist)

    }

    const ramDomMusic = async (song) => {
        const numberRamdum = Math.floor(Math.random() * playlist.length)
        const indexSong = playlist.findIndex(item => song.key === item.songKey)
        if (indexSong === -1 || indexSong !== numberRamdum) {
            const res = await getSong(playlist[numberRamdum].songKey)
            if (res) {
                dispatch(addSong(res.song))
            }
        } else if (indexSong === numberRamdum) {
            if (indexSong > 5) {
                const res = await getSong(playlist[numberRamdum - 1].songKey)
                if (res) {
                    dispatch(addSong(res.song))
                }
            } else {
                const res = await getSong(playlist[numberRamdum + 1].songKey)
                if (res) {
                    dispatch(addSong(res.song))
                }
            }
        }
    }

    const prevMusic = async (song) => {
        const indexSong = playlist.findIndex(item => song.key === item.songKey)
        if (indexSong === -1 || indexSong === 0) {
            const res = await getSong(playlist[0].songKey)
            if (res) {
                dispatch(addSong(res.song))
            }
        } else {
            const res = await getSong(playlist[indexSong - 1].songKey)
            if (res) {
                dispatch(addSong(res.song))
            }
        }
    }

    const nextMusic = async (song) => {
        const indexSong = playlist.findIndex(item => song.key === item.songKey)
        if (indexSong === -1 || indexSong === playlist.length - 1) {
            const res = await getSong(playlist[0].songKey)
            if (res) {
                dispatch(addSong(res.song))
            }
        } else {
            const res = await getSong(playlist[indexSong + 1].songKey)
            if (res) {
                dispatch(addSong(res.song))
            }
        }
    }

    const repeatMusic = () => {
        setIsRepeatMusic(!isRepeatMusic)
    }


    return <div className="music">
        <div className="music__close" onClick={() => props.setIsShowMusic(false)}>
            <i className='bx bx-x'></i>
        </div>
        <div className={`music__top ${activePlaylist ? "hidden" : ""}`}>
            <div className="music__top__bg" style={{ backgroundImage: `url(${song && song.thumbnail ? song.thumbnail : bgMusic})` }}>

            </div>
            {
                song && !_.isEmpty(song) ?
                    <div className="music__top__info">
                        <p className="music__top__info__name">
                            {song.title}
                        </p>
                        <span className="music__top__info__art">
                            {
                                song.artists.map((el, i) => (
                                    <Link key={i} to={`/artist/${el.shortLink}`}>
                                        <span>{`${i > 0 ? ", " : ""}${el.name}`}</span>
                                    </Link>
                                ))
                            }
                        </span>
                    </div>
                    :
                    <p className="music__top__note">Thưởng thức nhạc cùng tMusic ngay nào!</p>
            }
        </div>
        <div className={`music-playlist-wrap ${activePlaylist ? "active" : ""}`} ref={musicPlayerRef}>
            <MusicPlaylist
                curSong={song}
                active={activePlaylist}
                setactivePlaylist={setactivePlaylist}
                playlist={playlist}
            />
        </div>
        <div className="player-music" ref={playerRef}>
            <div className="player-music__controls-top">
                <div className="player-music__controls-top__volume">
                    <i className='bx bx-volume-full'></i>
                    <div className="change-volume">
                        <span className="fill" ref={fillVolumeRef}></span>

                        <input type="range" min="0" max="100" defaultValue={volumeValue} ref={volumeRef}
                        // onInput={changeVolume}
                        />
                    </div>
                </div>
                <p className="player-music__controls-top__playlist"
                    onClick={viewPlaylist}
                >
                    Danh sách phát
                </p>
                <div className="player-music__controls-top__option"><i className='bx bx-dots-vertical-rounded' ></i></div>
            </div>
            <div className="player-music__duration">
                <div className="time-left">{timeCur}</div>
                <div className="player-music__duration__bar">
                    <input type="range"
                        className="player-music__duration__bar__range"
                        name="range"
                        ref={rangeRef}
                        min="0"
                        max="100"
                        step="1"
                        value={progressPercent}
                        onChange={(e) => { handleChangeInput(e) }}
                    />
                    <audio src={song && song.streamUrls && song.streamUrls[0] ? song.streamUrls[0].streamUrl : null} ref={audioRef}></audio>
                </div>
                <div className="time-right">{song && song.duration ? song.duration : "00:00"}</div>
            </div>
            <div className="player-music__controls-down">
                <div className="ramdom" onClick={() => ramDomMusic(song)}>
                    <i className='bx bx-shuffle' ></i>
                    <p>Ngẫu nhiên</p>
                </div>
                <div className="prev" onClick={() => prevMusic(song)}>
                    <i className='bx bx-skip-previous'></i>
                    <p>Bài trước</p>
                </div>
                <div className="play" onClick={playMusic}>
                    {
                        !play ?
                            <>
                                <i className='bx bx-play' ></i>
                                <p>Phát</p>
                            </>
                            :
                            <>
                                <i className='bx bx-pause' ></i>
                                <p>Tạm dừng</p>
                            </>
                    }
                </div>
                <div className="next" onClick={() => nextMusic(song)} ref={nextMusicRef}>
                    <i className='bx bx-skip-next' ></i>
                    <p>Tiếp theo</p>
                </div>
                <div className={`repeat ${isRepeatMusic ? "active" : ""}`} onClick={repeatMusic}>
                    <i className='bx bx-repeat'></i>
                    <p>Lặp lại</p>
                </div>
            </div>
        </div>
    </div>;
};

export default Music;
