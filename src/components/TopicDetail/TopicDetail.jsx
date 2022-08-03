import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { getTopicDetail } from 'nhaccuatui-api-full'
import _ from "lodash"
import { Link } from 'react-router-dom'

import MusicCard from '../MusicCard/MusicCard'
import Footer from "../Footer/Footer"

const TopicDetail = () => {

    const { key } = useParams()
    const [item, setItem] = useState({})

    const [isViewMore, setIsViewMore] = useState(false)



    useEffect(() => {
        const getTopicDetailItem = async () => {
            try {
                const res = await getTopicDetail(key)
                if (res) {
                    setItem(res.topic)
                }
            }
            catch (e) {
                console.log("Error", e)
            }
        }
        getTopicDetailItem()
        window.scrollTo(0, 0)
    }, [])


    const viewMoreDescription = () => {
        setIsViewMore(!isViewMore)
    }

    return (
        <>
            {
                item && !_.isEmpty(item) &&
                <div className="topic-detail">
                    <div className="topic-detail__bg"
                        style={{ backgroundImage: `url(${item.coverImageURL})` }}></div>
                    <p className={`topic-detail__description ${isViewMore ? "view" : "collapse"}`}

                    >
                        {item.description}
                    </p>
                    <div className="topic-detail__view-more"
                        onClick={viewMoreDescription}
                    >
                        {isViewMore ? <i className='bx bx-chevron-down'></i> : <i className='bx bx-chevron-up'></i>}
                        {isViewMore ? "Xem thêm" : "Thu gọn"}
                    </div>
                    <h2 className="topic-detail__title">{item.title}</h2>
                    <div className="topic-detail__list">
                        {
                            item.playlist.slice(0, 16).map((item, i) => (
                                <div className="topic-detail__list__item" key={i}>
                                    <Link to={`/playlist/${item.key}`} >
                                        <MusicCard isShowFull={true} item={item} />
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                </div>
            }
            <Footer />
        </>
    )
}

export default TopicDetail