import React, { useState, useEffect } from 'react';

import { explore } from "nhaccuatui-api-full";

import MusicCard from "../MusicCard/MusicCard"

import { Link } from 'react-router-dom';

import { loading } from '../../redux/reducers/songSlice';
import { useDispatch } from 'react-redux';

const ListSongs = props => {

    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);

    const dispatch = useDispatch()

    useEffect(() => {
        const getSongs = async () => {
            dispatch(loading(true))
            const result = await explore({
                type: props.type,
                key: props.param,
                page: page,
                pageSize: 36,
            });
            if (result && result.data) {
                setSongs(result.data)
                dispatch(loading(false))
            }
        }
        getSongs()
    }, [props.param, page, props.type]);

    return <div className="list-songs">
        <div className="row">
            {
                songs && songs.length > 0 ?
                    songs.map((item, i) => (
                        <Link to={props.type === "playlist" ? `/playlist/${item.key}` : `/song/${item.key}`} key={i} className="col-4">
                            <MusicCard item={item} isShowFull={true} to="/" />
                        </Link>
                    ))
                    :
                    <div className="notice">Trang này không có dữ liệu !</div>
            }
        </div>
        <Pagination setPage={setPage} param={props.param} type={props.type} />
    </div>;
};

const pages = ["1", "2", "3", "4", "5", "6", "7", "8"]

const Pagination = props => {

    const [curPage, setCurPage] = useState("1");

    useEffect(() => {
        props.setPage(Number(curPage))
    }, [curPage]);

    useEffect(() => {
        setCurPage("1")
    }, [props.param, props.type])

    return (
        <div className="pagination">
            {pages.map((item, i) => (
                <span className={`pagination__item ${curPage === item ? "active" : ""}`}
                    key={i}
                    onClick={() => setCurPage(item)}
                >
                    {item}
                </span>
            ))}
        </div>
    )
}

export default ListSongs;
