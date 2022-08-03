import React, { useState, useEffect } from 'react';

import { getHome } from "nhaccuatui-api-full"

import MusicCard from "../MusicCard/MusicCard"

import { Link } from "react-router-dom"

import _ from "lodash"

const NewRelease = () => {

    const [items, setItems] = useState([]);
    const [newReleaseMain, setNewReleaseMain] = useState({});
    const [dayRelease, setDayRelease] = useState({ day: "", month: "", year: "" });

    useEffect(() => {
        const getHomeSong = async () => {
            const response = await getHome(1)
            setItems(response.newRelease.song)
            setNewReleaseMain(response.newRelease.song[0])
        }
        getHomeSong()
    }, []);

    useEffect(() => {
        const date = new Date(!_.isEmpty(newReleaseMain) ? newReleaseMain.dateRelease : null)
        setDayRelease({
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear()
        })

    }, [newReleaseMain]);

    const hanldeMouseOver = (item) => {
        setNewReleaseMain(item)
    }
    return (
        <div className='new-release'>
            <div className="new-release__main">
                {
                    newReleaseMain && !_.isEmpty(newReleaseMain) &&
                    <>
                        <div className="new-release__main__img">
                            <Link to={`/song/${newReleaseMain.key}`}><img src={newReleaseMain.thumbnail} alt="" /></Link>
                        </div>
                        <div className="new-release__main__info">
                            <h3 className="new-release__main__info__title">{newReleaseMain.title}</h3>
                            <div className="new-release__main__info__artist">
                                <img src={newReleaseMain.artists[0].imageUrl} alt="" />
                                <Link to={`/artist/${newReleaseMain.artists[0].shortLink}`}>
                                    <h3>{newReleaseMain.artists[0].name}</h3>
                                </Link>
                            </div>
                            <p className="new-release__main__info__date">
                                Ngày phát hành: <span>{`${dayRelease.day}/${dayRelease.month}/${dayRelease.year}`}</span>
                            </p>
                        </div>
                    </>
                }
            </div>
            <div className="new-release__items">
                {
                    items && !_.isEmpty(items) &&
                    items.map((item, index) => (
                        <div className="new-release__items__item" key={index}
                            onMouseOver={() => hanldeMouseOver(item)}
                        >
                            <Link to={`/song/${item.key}`}>
                                <MusicCard item={item} to="/" isShowFull={false} />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default NewRelease;
