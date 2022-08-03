import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { getTop100, getSong } from 'nhaccuatui-api-full'
import _ from "lodash"
import { useDispatch } from 'react-redux'
import { addSong } from "../../redux/reducers/songSlice"

import userImg from "../../assets/images/user.png"
import Footer from "../Footer/Footer"

const Top100 = () => {

    const { key } = useParams()
    const dispatch = useDispatch()
    const [item, setItem] = useState({})

    useEffect(() => {
        const getTop100Detail = async () => {
            try {
                const res = await getTop100(key)
                if (res) {
                    setItem(res.playlist)
                }
            }
            catch (e) {
                console.log("Error", e)
            }
        }
        getTop100Detail()
        window.scrollTo(0, 0)
    }, [])

    const playSong = async item => {
        const res = await getSong(item.key)
        if (res) {
            dispatch(addSong(res.song))
        }
    }

    return (
        <>
            {
                item && !_.isEmpty(item) &&
                <div className="top-100-detail">
                    <div className="top-100-detail__header">
                        <div className="top-100-detail__header__img" style={{ backgroundImage: `url(${item.thumbnail})` }}>

                        </div>
                        <div className="top-100-detail__header__info">
                            <h2 className="top-100-detail__header__info__title">TOP 100</h2>
                            <p className="top-100-detail__header__info__desc">
                                <span>{item.listTag[0].name}</span>
                                {` - Cập nhật vào: ${item.dateModify}`}
                            </p>
                        </div>
                    </div>
                    <div className="top-100-detail__songs">
                        <h2 className="top-100-detail__songs__title">Tất cả các bài hát</h2>
                        <ul className="top-100-detail__songs__list">
                            {
                                item.songs.map((el, i) => (
                                    <li className="top-100-detail__songs__item" key={i}
                                        onClick={() => playSong(el)}
                                    >
                                        <div className="top-100-detail__songs__item__stt">{i + 1}</div>
                                        <div className="top-100-detail__songs__item__content">
                                            <div className="img">
                                                <img src={el.artists[0].imageUrl ? el.artists[0].imageUrl : userImg} alt="" />
                                            </div>
                                            <div className="info">
                                                <p className="info__title">{el.title}</p>
                                                <span className="info__art">{el.artists[0].name}</span>
                                            </div>
                                        </div>
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

export default Top100