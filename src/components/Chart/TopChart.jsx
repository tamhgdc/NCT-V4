import React from 'react';
import { Link } from 'react-router-dom';

const TopChart = (props) => {

    const { item, week } = props

    const setWeek = props.setWeek ? props.setWeek : null


    const changeWeekRanking = (id) => {
        if (id === "minus") {
            setWeek(week - 1)
        } else if (id === "plus") {
            setWeek(week + 1 > 51 ? 51 : week + 1)
        }
    }

    return (
        <>
            {
                item &&
                <div className="top-chart">
                    <div className="top-chart__time">
                        <i className='bx bxs-chevron-left minus'
                            onClick={() => changeWeekRanking("minus")}
                        ></i>
                        <h2>{`Tuần ${week}`}</h2>
                        <i className='bx bxs-chevron-right plus'
                            onClick={() => changeWeekRanking("plus")}
                        ></i>
                    </div>
                    <div className="top-chart__main">
                        <div className="top-chart__main__img">
                            <img src={item.thumbnail} alt="" />
                            <span>Top 1</span>
                        </div>
                        <div className="top-chart__main__info">
                            <span className="top-chart__main__info__name">Bài hát: <span>{item.title}</span></span>
                            <div className="top-chart__main__info__art">
                                <div className="top-chart__main__info__art__img">
                                    {
                                        item.artists.map((item, i) => (
                                            <img src={item.imageUrl} key={i} />
                                        ))
                                    }
                                </div>
                                <div className="top-chart__main__info__art__name">
                                    {
                                        item.artists.map((item, i) => (
                                            <Link key={i} to={`/artist/${item.shortLink}`}>
                                                <span>{`${i > 0 ? ", " : ""}${item.name}`}</span>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="top-chart__main__info__chart">
                                <div className="top-chart__main__info__chart__last-week">
                                    <span>{item.position}</span>
                                    <p>TUẦN TRƯỚC</p>
                                </div>
                                <div className="top-chart__main__info__chart__top">
                                    <span>{item.highestPosition}</span>
                                    <p>CAO NHẤT</p>
                                </div>
                                <div className="top-chart__main__info__chart__total">
                                    <span>{item.totalWeekInRanked}</span>
                                    <p>TUẦN TRONG BXH</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default TopChart;
