import React, { useState, useEffect, useRef } from 'react';

import _ from "lodash"

import { getChart } from 'nhaccuatui-api-full';
import { Link } from 'react-router-dom';

const ChartHome = props => {

    const [charts, setCharts] = useState([]);
    const [activeItem, setActiveItem] = useState({});
    const itemRef = useRef(null)

    useEffect(() => {
        const getChartHome = async () => {
            const response = await getChart({ category: props.category, time: { week: 51, year: 2021 } })
            if (response) {
                setCharts(response.ranking.song.slice(0, 3))
                setActiveItem(response.ranking.song[0])
            }
        }
        getChartHome()
    }, []);



    return <div className="chart-home">
        <div className="chart-home__bg" style={{ backgroundImage: `url(${props.bg})` }}></div>
        <h2 className="chart-home__title">{props.title}</h2>
        <div className="chart-home__list">
            {
                charts && charts.length > 0 &&
                charts.map((item, index) => (
                    <div className="chart-home__list__item" key={index}
                        ref={activeItem.songKey && activeItem.songKey === item.songKey ? itemRef : null}
                    >
                        <div className="chart-home__list__item__img"
                            style={{ backgroundImage: `url(${item.thumbnail})` }}
                            onMouseOver={() => setActiveItem(item)}
                        >
                            <i className='bx bx-play-circle'></i>
                            <div className="overlay"></div>
                        </div>
                    </div>
                ))
            }
        </div>
        <h3 className="chart-home__name">{activeItem && !_.isEmpty(activeItem) ? activeItem.title : null}</h3>
        <h3 className="chart-home__artists">{activeItem && !_.isEmpty(activeItem) ? activeItem.artists[0].name : null}</h3>
        <Link to={`/discover/chart/${props.category}`}>
            <button className="btn btn-view-all">Xem tất cả</button>
        </Link>

    </div>;
};

export default ChartHome;
