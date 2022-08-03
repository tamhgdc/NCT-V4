import { useState, useEffect } from 'react';

import { getHome } from 'nhaccuatui-api-full';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

const SlideHome = () => {

    SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getHomeSong = async () => {
            const response = await getHome(1)
            setItems(response.showcase)
        }
        getHomeSong()


    }, []);


    return <div className='home__slide'>
        <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
        // autoplay={{ delay: 3000 }}
        >
            {
                items && items.length > 0 &&
                items.map((item, i) => (
                    <SwiperSlide key={i}>
                        {
                            ({ isActive }) => (
                                <HomeSlideItem item={item} className={`${isActive ? 'active' : ""}`} />
                            )
                        }
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>;
};

const HomeSlideItem = props => {

    const { item } = props

    return (
        <Link to={`/`}>
            <div className={`home__slide__item ${props.className}`}>
                <img src={item.imageUrl} alt="" />
            </div>
        </Link>
    )
}

export default SlideHome;
