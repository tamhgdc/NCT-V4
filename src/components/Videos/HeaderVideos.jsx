import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

const menuHeaderVideos = [
    {
        key: "moi-hot",
        param: "videos",
        display: "Mới & Hot",
        type: "moi-hot"
    },
    {
        key: "am-nhac-viet-nam",
        param: "video-am-nhac-viet-nam",
        display: "Việt Nam",
        type: "nhac-viet"
    },
    {
        key: "am-nhac-au-my",
        param: "video-am-nhac-au-my",
        display: "Âu Mỹ",
        type: "nhac-au-my"
    },
    {
        key: "am-nhac-han-quoc",
        param: "video-am-nhac-han-quoc",
        display: "Châu Á",
        type: "nhac-chau-a"
    },
    {
        key: "am-nhac-karaoke",
        param: "video-am-nhac-karaoke",
        display: "Karaoke",
        type: "karaoke"
    },
    {
        key: "giai-tri-funny-clip",
        param: "video-giai-tri",
        display: "Khác",
        type: "khac"
    }
]

const nhacViet = [
    {
        key: "am-nhac-viet-nam-nhac-tre",
        param: "video-am-nhac-viet-nam-nhac-tre",
        display: "Nhạc Trẻ",
        type: "nhac-viet",
    },
    {
        key: "am-nhac-viet-nam-tru-tinh",
        param: "video-am-nhac-viet-nam-tru-tinh",
        display: "Trữ Tình",
        type: "nhac-viet",
    },
    {
        key: "am-nhac-viet-nam-cach-mang",
        param: "video-am-nhac-viet-nam-cach-mang",
        display: "Cách Mạng",
        type: "nhac-viet",
    },
    {
        key: "am-nhac-viet-nam-nhac-rap",
        param: "video-am-nhac-viet-nam-nhac-rap",
        display: "Rap Việt",
        type: "nhac-viet",
    },
    {
        key: "am-nhac-viet-nam-nhac-rock",
        param: "video-am-nhac-viet-nam-nhac-rock",
        display: "Rock Việt",
        type: "nhac-viet",
    },
]

const nhacAuMy = [
    {
        key: "am-nhac-au-my-pop",
        param: "video-am-nhac-au-my-pop",
        display: "Pop",
        type: "nhac-au-my",
    },
    {
        key: "am-nhac-au-my-rock",
        param: "video-am-nhac-au-my-rock",
        display: "Rock",
        type: "nhac-au-my",
    },
    {
        key: "am-nhac-au-my-dance",
        param: "video-am-nhac-au-my-dance",
        display: "Electronica/Dance",
        type: "nhac-au-my",
    },
    {
        key: "am-nhac-au-my-r-b-hip-hop-rap",
        param: "video-am-nhac-au-my-r-b-hip-hop-rap",
        display: "R&B/Hip Hop/Rap",
        type: "nhac-au-my",
    },
    {
        key: "am-nhac-au-my-blue-jazz",
        param: "video-am-nhac-au-my-blue-jazz",
        display: "Blues/Jazz",
        type: "nhac-au-my",
    },
    {
        key: "am-nhac-au-my-latin",
        param: "am-nhac-au-my-latin",
        display: "Latin",
        type: "nhac-au-my",
    }
]

const nhacChauA = [
    {
        key: "am-nhac-han-quoc",
        param: "video-am-nhac-han-quoc",
        display: "Nhạc Hàn",
        type: "nhac-chau-a",
    },
    {
        key: "am-nhac-nhac-hoa",
        param: "video-am-nhac-nhac-hoa",
        display: "Nhạc Hoa",
        type: "nhac-chau-a",
    },
    {
        key: "am-nhac-nhac-nhat",
        param: "video-am-nhac-nhac-nhat",
        display: "Nhạc Nhật",
        type: "nhac-chau-a",
    },
    {
        key: "am-nhac-nhac-thai",
        param: "video-am-nhac-nhac-thai",
        display: "Nhạc Thái",
        type: "nhac-chau-a",
    },
]

const karaoke = [
    {
        key: "am-nhac-karaoke-nhac-tre",
        param: "video-am-nhac-karaoke-nhac-tre",
        display: "Nhạc Trẻ",
        type: "karaoke",
    },
    {
        key: "am-nhac-karaoke-tru-tinh",
        param: "video-am-nhac-karaoke-tru-tinh",
        display: "Trữ Tình",
        type: "karaoke",
    },
    {
        key: "am-nhac-karaoke-remix-viet",
        param: "video-am-nhac-karaoke-remix-viet",
        display: "Remix Việt",
        type: "karaoke",
    },
    {
        key: "am-nhac-karaoke-thieu-nhi",
        param: "video-am-nhac-karaoke-thieu-nhi",
        display: "Thiếu Nhi",
        type: "karaoke",
    }
]

const nhacKhac = [
    {
        key: "giai-tri-funny-clip",
        param: "video-giai-tri-funny-clip",
        display: "Clip Vui",
        type: "khac",
    },
    {
        key: "giai-tri-hai-kich",
        param: "video-giai-tri-hai-kich",
        display: "Hài Kịch",
        type: "khac",
    },
    {
        key: "giai-tri-khac",
        param: "video-giai-tri-khac",
        display: "Giải trí khác",
        type: "khac",
    },
    {
        key: "giai-tri-phim-viet-nam",
        param: "video-giai-tri-phim-viet-nam",
        display: "Phim Việt Nam",
        type: "khac",
    }
]

const HeaderVideos = (props) => {

    const [activeItem, setActiveItem] = useState(menuHeaderVideos[0]);
    const [headerSubs, setHeaderSubs] = useState([]);


    const handleActiveItem = (item) => {
        setActiveItem(item)
        props.setParam(item.key)
    }

    useEffect(() => {
        switch (activeItem.type) {
            case "nhac-viet":
                setHeaderSubs(nhacViet);
                break;
            case "nhac-au-my":
                setHeaderSubs(nhacAuMy);
                break;
            case "nhac-chau-a":
                setHeaderSubs(nhacChauA);
                break;
            case "karaoke":
                setHeaderSubs(karaoke);
                break;
            case "khac":
                setHeaderSubs(nhacKhac);
                break;
            default:
                setHeaderSubs([])
        }
    }, [activeItem]);


    return <div className="header-videos">
        <div className="header-videos__main">
            {
                menuHeaderVideos.map((item, i) => (
                    <div className={`header-videos__main__item 
                    ${activeItem.type === item.type ? "active" : ""}`}
                        key={i}
                        onClick={() => handleActiveItem(item)}
                    >
                        <Link to={`/discover/video/${item.param}`}>{item.display}</Link>
                    </div>
                ))
            }
        </div>
        <div className="header-videos__sub">
            <HeaderVideoSubs type={activeItem.type} menu={headerSubs} setParam={props.setParam} />
        </div>
    </div>;
};

const HeaderVideoSubs = props => {

    const { menu } = props

    const [activeItem, setActiveItem] = useState(menu[0]);

    useEffect(() => {
        setActiveItem(menu[0])
    }, [menu]);


    const handleActiveItem = (item) => {
        setActiveItem(item)
        props.setParam(item.key)
    }

    return (
        <div className="header-videos__sub__menu">
            {
                menu && menu.length > 0 ?
                    menu.map((item, i) => (
                        <div className={`header-videos__sub__menu__item 
                        ${activeItem && activeItem.param === item.param ? "active" : ""}`}
                            key={i}
                            onClick={() => handleActiveItem(item)}
                        >
                            <Link to={`/discover/video/${item.param}`}>{item.display}</Link>
                        </div>
                    ))
                    :
                    <span>Mới & Hot</span>
            }
        </div>
    )
}

export default HeaderVideos;
