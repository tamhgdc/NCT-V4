import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

const sidebarNavItems = [
    {
        display: "Bài hát",
        icon: 'bx bxs-music',
        path: "/discover/song/new-hot",
        param: "new-hot"
    },
    {
        display: "Danh sách phát",
        icon: 'bx bxs-playlist',
        path: "/discover/playlist/new",
        param: "new"
    },
    {
        display: "Video",
        icon: 'bx bxs-videos',
        path: "/discover/video/moi-hot",
        param: "moi-hot"
    },
    {
        display: "Bảng xếp hạng",
        icon: 'bx bx-bar-chart-alt-2',
        path: "/discover/chart/nhac-viet",
        param: "nhac-viet"
    },
    {
        display: "Nghệ Sĩ",
        icon: 'bx bx-user',
        path: "/discover/artist/art-hot",
        param: "art-hot"
    }
]

const Sidebar = (props) => {

    const { pathname } = useLocation()

    const [active, setActive] = useState(pathname);

    useEffect(() => {
        setActive(pathname)
    }, [pathname])


    return <div className='sidebar'>
        <div className="sidebar__close" onClick={() => props.setIsShowMenu(false)}>
            <i className='bx bx-x'></i>
        </div>
        <div className='sidebar__logo'>
            <Link to="/"><h2>tMusic</h2></Link>
        </div>
        <div className='sidebar__menu'>
            <Link to="/">
                <div className={`sidebar__menu__item ${active === "/" ? "active" : ""} `}
                    onClick={() => setActive("/")}
                >
                    <i className='bx bx-home-alt' ></i>
                    <span>Trang chủ</span>
                </div>
            </Link>
            <h3 className='sidebar__menu__discover'>Khám phá</h3>
            {
                sidebarNavItems.map((item, i) => (
                    <Link to={item.path} key={i}>
                        <div key={i}
                            className={`sidebar__menu__item ${active === item.path ? "active" : ""} `}
                            onClick={() => setActive(item.path)}
                        >
                            <i className={`${item.icon}`} ></i>
                            <span>{item.display}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;
