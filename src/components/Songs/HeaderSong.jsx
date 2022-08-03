import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';


const menuHeaderSongs = [
    {
        to: "/discover/song/moi-hot",
        display: "Mới & Hot",
        id: "moi-hot"
    },
    {
        to: "/discover/song/nhac-tre",
        display: "Việt Nam",
        id: "nhac-tre"
    },
    {
        to: "/discover/song/pop",
        display: "Âu Mỹ",
        id: "pop"
    },
    {
        to: "/discover/song/han-quoc",
        display: "Châu Á",
        id: "han-quoc"
    },
    {
        to: "/discover/song/thieu-nhi",
        display: "Khác",
        id: "thieu-nhi"
    }
]

const menuHeaderPlaylists = [
    {
        to: "/discover/playlist/moi-hot",
        display: "Mới & Hot",
        id: "moi-hot"
    },
    {
        to: "/discover/playlist/nhac-tre",
        display: "Việt Nam",
        id: "nhac-tre"
    },
    {
        to: "/discover/playlist/pop",
        display: "Âu Mỹ",
        id: "pop"
    },
    {
        to: "/discover/playlist/han-quoc",
        display: "Châu Á",
        id: "han-quoc"
    },
    {
        to: "/discover/playlist/thieu-nhi",
        display: "Khác",
        id: "thieu-nhi"
    }
]

const HeaderSong = (props) => {

    const { params } = useParams()

    const [activeItem, setActiveItem] = useState("moi-hot");

    const hanldeActiveItem = (item) => {
        setActiveItem(item.id)
    }


    useEffect(() => {
        props.setKey(params)
    }, [params])

    return <div className="header-song">
        <ul className="header-song__menu">
            {props.type === "playlist" ?
                menuHeaderPlaylists.map((item, i) => (
                    <li className={`header-song__menu__item ${activeItem === item.id ? "active" : ""}`}
                        key={i}
                        onClick={() => hanldeActiveItem(item)}
                    >
                        <Link to={item.to}>
                            {item.display}
                        </Link>
                    </li>
                ))
                :
                menuHeaderSongs.map((item, i) => (
                    <li className={`header-song__menu__item ${activeItem === item.id ? "active" : ""}`}
                        key={i}
                        onClick={() => hanldeActiveItem(item)}
                    >
                        <Link to={item.to}>
                            {item.display}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>;
};

export default HeaderSong;
