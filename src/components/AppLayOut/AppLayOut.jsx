import { useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { css } from "@emotion/react";
import Router from '../../Routes/Router';
import Sidebar from '../Sidebar/Sidebar';
import Music from '../Musics/Music';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom"

import { useSelector } from 'react-redux';

const cssLoading = css`
    display: block;
    margin: 40vh auto;
    z-index: 1002;
`;
const AppLayOut = () => {

    const loading = useSelector(state => state.song.loading)

    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isShowMusic, setIsShowMusic] = useState(false)

    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className='container'>
                    <div className={`sidebar__container ${isShowMenu ? "active" : ""}`}>
                        <Sidebar setIsShowMenu={setIsShowMenu} />
                    </div>
                    <div className='content'>
                        <div className="content__bar">
                            <div className="content__bar__menu" onClick={() => setIsShowMenu(true)}>
                                <i className='bx bx-menu'></i>
                            </div>
                            <div className="content__bar__logo">
                                <Link to="/">
                                    <h2>tMusic</h2>
                                </Link>
                            </div>
                            <div className="content__bar__headphone" onClick={() => setIsShowMusic(true)}>
                                <i className='bx bx-headphone' ></i>
                            </div>
                        </div>
                        <div className="content__main">
                            <Router />
                        </div>
                    </div>
                    <div className={`music-container ${isShowMusic ? "active" : ""}`}>
                        <Music setIsShowMusic={setIsShowMusic} />
                    </div>
                </div>

                {
                    loading &&
                    <div className="loading">
                        <ClipLoader css={cssLoading} loading={true} size={150} color="#fff" />
                    </div>
                }
            </div>
        </BrowserRouter>
    );
};

export default AppLayOut;
