import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom"

const menuHeaderArtist = [
    {
        nation: "hot",
        gender: "1",
        display: "Hot",
        param: "art-hot"
    },
    {
        nation: "vn",
        gender: "1",
        display: "Việt Nam",
        param: "art-vn"
    },
    {
        nation: "usuk",
        gender: "1",
        display: "Âu Mỹ",
        param: "art-usuk"
    },
    {
        nation: "kpop",
        gender: "1",
        display: "Hàn Quốc",
        param: "art-k-pop"
    },

]

const menuHeaderSubs = [
    {
        gender: "1",
        display: "Nam",
        param: "art-nam"
    },
    {
        gender: "2",
        display: "Nữ",
        param: "art-nu"
    },
    {
        gender: "3",
        display: "Nhóm nhạc",
        param: "art-nhom-nhac"
    },
]

const HeaderArtists = (props) => {

    const [activeItem, setActiveItem] = useState(menuHeaderArtist[0])
    const [activeItemSubs, setActiveItemSubs] = useState(menuHeaderSubs[0])

    const handleActiveItem = (item) => {
        setActiveItem(item)
    }

    const handleActiveItemSubs = (item) => {
        setActiveItemSubs(item)
    }

    useEffect(() => {
        props.setNation(activeItem.nation)
        props.setGender(activeItemSubs.gender)
    }, [activeItem, activeItemSubs])

    useEffect(() => {
        setActiveItemSubs(menuHeaderSubs[0])
    }, [activeItem])


    return (
        <div className="header-artist">
            <div className="header-artist__main">
                {
                    menuHeaderArtist.map((item, i) => (
                        <div className={`header-artist__main__item 
                    ${activeItem.param === item.param ? "active" : ""}`}
                            key={i}
                            onClick={() => handleActiveItem(item)}
                        >
                            <Link to={`/discover/artist/${item.param}`}>{item.display}</Link>
                        </div>
                    ))
                }
            </div>
            <div className="header-artist__sub">
                <div className="header-artist__sub__menu">
                    {
                        menuHeaderSubs.map((item, i) => (
                            <div className={`header-artist__sub__menu__item 
                        ${activeItemSubs && activeItemSubs.param === item.param ? "active" : ""}`}
                                key={i}
                                onClick={() => handleActiveItemSubs(item)}
                            >
                                <Link to={`/discover/artist/${item.param}`}>{item.display}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}



export default HeaderArtists