import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getVideoDetail } from "nhaccuatui-api-full"
import _ from 'lodash'
import Footer from '../Footer/Footer'

const VideoDetail = () => {

    const { key } = useParams()

    const [item, setItem] = useState({})

    useEffect(() => {
        const getVideoDetailItem = async () => {
            try {
                const res = await getVideoDetail(key)
                if (res) {
                    setItem(res.video)
                }
            }
            catch (e) {
                console.log("Error", e)
            }
        }
        getVideoDetailItem()
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            {
                item && !_.isEmpty(item) &&
                <div className="video-detail">
                    <div className="video-detail__video">
                        <video src={item.streamUrls[0].streamUrl} preload="auto" controls></video>
                    </div>
                    <div className="video-detail__info">
                        <p className="title">Bài hát: <span>{item.title}</span></p>
                        <p className="art">
                            <span className="art__title">Tác giả: </span>
                            {
                                item.artists.map((el, i) => (
                                    <Link to={`/artist/${el.shortLink}`} key={i}>
                                        <span>{`${i > 0 ? ", " : ""}${el.name}`}</span>
                                    </Link>
                                ))
                            }
                        </p>
                    </div>

                </div>
            }
            <Footer />
        </>
    )
}

export default VideoDetail