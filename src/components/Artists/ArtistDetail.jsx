
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getArtistDetail } from "nhaccuatui-api-full"
import _ from 'lodash'
import { Link } from "react-router-dom"
import bgArtist from "../../assets/images/background.png"
import avatar from "../../assets/images/user.png"

import Footer from "../Footer/Footer"
import MusicCard from "../MusicCard/MusicCard"
import { VideoCard } from "../Home/VideoHot"

const ArtistDetail = () => {

    const { key } = useParams()

    const [item, setItem] = useState({})

    useEffect(() => {
        const getArtistDetailItem = async () => {
            try {
                if (key) {
                    const res = await getArtistDetail(key)
                    setItem(res)
                }
            }
            catch (e) {
                console.log("Error", e)
            }
        }
        getArtistDetailItem()
    }, [])

    return (
        <>
            {
                item && !_.isEmpty(item) &&
                <div className="artist-detail">
                    <div className="artist-detail__bg">
                        <img src={item.artist.coverImageURL ? item.artist.coverImageURL : bgArtist} alt="" className="artist-detail__bg__img" />
                        <div className="artist-detail__bg__name">
                            <img src={item.artist.imageUrl ? item.artist.imageUrl : avatar} alt="" />
                            <p>{item.artist.name}</p>
                        </div>
                    </div>
                    <div className="artist-detail__nearly">
                        <h2 className="artist-detail__title">{item.songNearly ? "Gần đây" : ""}</h2>
                        <div className="artist-detail__nearly__list">
                            {
                                item.songNearly && item.songNearly.slice(0, 4).map((el, i) => (
                                    <div className="artist-detail__nearly__list__item" key={i}>
                                        <Link to={`/song/${el.key}`}>
                                            <MusicCard item={el} isShowFull={true} />
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="artist-detail__songs">
                        <h2 className="artist-detail__title">{item.song && item.song.song ? "Bài hát" : ""}</h2>
                        <div className="artist-detail__songs__list">
                            {
                                item.song && item.song.song &&
                                item.song.song.slice(0, 8).map((el, i) => (
                                    <div className="artist-detail__songs__list__item" key={i}>
                                        <Link to={`/song/${el.key}`}>
                                            <MusicCard item={el} isShowFull={true} />
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="artist-detail__playlist">
                        <h2 className="artist-detail__title">{item.playlist && item.playlist.playlist ? "Playlist" : ""}</h2>
                        <div className="artist-detail__playlist__list">
                            {
                                item.playlist && item.playlist.playlist &&
                                item.playlist.playlist.slice(0, 4).map((el, i) => (
                                    <div className="artist-detail__playlist__list__item" key={i}>
                                        <Link to={`/playlist/${el.key}`}>
                                            <MusicCard item={el} isShowFull={true} />
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="artist-detail__videos">
                        <h2 className="artist-detail__title">{item.video && item.video.video ? "Video" : ""}</h2>
                        <div className="artist-detail__videos__list">
                            {
                                item.video && item.video.video &&
                                item.video.video.map((el, i) => (
                                    <div className="artist-detail__videos__list__item" key={i}>
                                        <VideoCard item={el} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default ArtistDetail