import React, { useState, useEffect } from 'react';

import { getChart } from "nhaccuatui-api-full";

import HeaderChart from './HeaderChart';
import TopChart from './TopChart';
import MusicChart from './MusicChart';
import Footer from "../Footer/Footer";

import { useDispatch } from 'react-redux';
import { loading } from '../../redux/reducers/songSlice';

import { useParams } from 'react-router-dom';

const Chart = () => {

    const [raking, setRaking] = useState([]);
    const { params } = useParams()
    const [category, setCategory] = useState(params);
    const [week, setWeek] = useState(51)

    const dispatch = useDispatch()

    useEffect(() => {

        const getCharts = async () => {
            try {
                dispatch(loading(true))
                const response = await getChart({
                    category: category,
                    time: {
                        week: week,
                        year: 2021
                    },
                })
                if (response) {
                    setRaking(response.ranking.song)
                    dispatch(loading(false))
                }

            }
            catch (e) {
                console.log("error", e)
            }
        }
        getCharts()
        window.scrollTo(0, 0)
    }, [category, week]);

    useEffect(() => {
        setWeek(51)
    }, [category])


    return <div className="chart">
        <HeaderChart setCategory={setCategory} params={params} />
        <TopChart item={raking[0]} week={week} setWeek={setWeek} />
        <div className="chart__music" style={{ marginTop: "2rem" }}>
            {
                raking && raking.length > 0 &&
                raking.map((item, index) => (
                    <div key={index}>
                        <MusicChart item={item} index={index + 1} />
                    </div>
                ))
            }
        </div>
        <Footer />
    </div>;
};

export default Chart;
