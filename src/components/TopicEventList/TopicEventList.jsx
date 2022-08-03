import React, { useEffect } from 'react';
import MusicCard from "../MusicCard/MusicCard"

import { Link } from "react-router-dom"

import { SwiperSlide, Swiper } from 'swiper/react'


const TopicEventList = props => {
    const { topicEvents } = props



    return <div className='topic-event-list'>
        <Swiper
            grabCursor={true}
            spaceBetween={10}
            slidesPerView={'auto'}
        >
            {
                topicEvents && topicEvents.length > 0 &&
                topicEvents.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/playlist/${item.key}`}>
                            <MusicCard item={item} to="/" isShowFull={true} />
                        </Link>
                    </SwiperSlide>
                ))
            }
        </Swiper>

    </div>;
};

export default TopicEventList;
