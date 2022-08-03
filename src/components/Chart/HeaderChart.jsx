import { useState, useEffect } from 'react';

import { Link } from "react-router-dom"


const menuHeaderChart = [
    {
        param: "nhac-viet",
        display: "Việt Nam",
    },
    {
        param: "au-my",
        display: "Âu Mỹ",
    },
    {
        param: "nhac-han",
        display: "Hàn Quốc",
    }
]

const HeaderChart = (props) => {

    const [activeItem, setActiveItem] = useState(props.params);


    const handleActiveItem = (item) => {
        setActiveItem(item.param)
        props.setCategory(item.param)
    }

    return <div className="header-chart">
        <h2 className="header-chart__title">Bảng xếp hạng tuần</h2>
        <ul className="header-chart__menu">
            {
                menuHeaderChart.map((item, i) => (
                    <li className={`header-chart__menu__item
                     ${activeItem === item.param ? "active" : ""}`}
                        key={i}
                        onClick={() => handleActiveItem(item)}
                    >
                        <Link to={`/discover/chart/${item.param}`}>{item.display}</Link>
                    </li>
                ))
            }
        </ul>
    </div>;
};

export default HeaderChart;
