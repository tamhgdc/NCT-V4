import React, { useEffect, useState } from 'react';

import SlideHome from './SlideHome';
import TopicEventList from '../TopicEventList/TopicEventList';
import NewRelease from './NewRelease';
import ChartHome from './ChartHome';
import VideoHot from "./VideoHot"
import TopicHot from './TopicHot';
import Top100 from "./Top100";

import bgChartVN from "../../assets/images/bxh-viet-nam.jpg"
import bgChartUS from "../../assets/images/bxh-au-my.jpg"
import bgChartKO from "../../assets/images/bxh-han-quoc.jpg"

import _ from "lodash"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPlaylist, loading } from "../../redux/reducers/songSlice"
import { getHome } from 'nhaccuatui-api-full';
import Footer from '../Footer/Footer';



const Home = () => {

    const dispatch = useDispatch()

    const [topicEvents, setTopicEvents] = useState({});
    const [groupName, setGroupName] = useState({});
    const [videos, setVideos] = useState([]);
    const [topicHot, setTopicHot] = useState([]);
    const [top100, setTop100] = useState([]);

    useEffect(() => {
        const getPlayList = async () => {
            try {
                dispatch(loading(true))
                const response = await getHome();
                if (response) {
                    setTopicEvents({
                        event1: response.topicEvent[0].listPlaylist,
                        event2: response.topicEvent[1].listPlaylist,
                        event3: response.topicEvent[2].listPlaylist
                    })
                    setGroupName({
                        name1: response.topicEvent[0].groupName.slice(0, response.topicEvent[0].groupName.search("_")),
                        name2: response.topicEvent[1].groupName.slice(0, response.topicEvent[1].groupName.search("_")),
                        name3: response.topicEvent[2].groupName.slice(0, response.topicEvent[2].groupName.search("_"))
                    })
                    setVideos(response.video);
                    setTopicHot(response.topic);
                    setTop100(response.top100);

                    dispatch(addPlaylist(response.ranking.song))
                    dispatch(loading(false))
                }
            }
            catch (e) {
                console.log("Error", e)
            }

        }
        getPlayList()
    }, []);



    return <div className='home'>
        <SlideHome />
        <div className="home__list">
            <h2 className="home__list__title">{groupName.name1}</h2>
            <TopicEventList topicEvents={topicEvents.event1} />
            <h2 className="home__list__title">{groupName.name2}</h2>
            <TopicEventList topicEvents={topicEvents.event2} />
            <h2 className="home__list__title">{groupName.name3}</h2>
            <TopicEventList topicEvents={topicEvents.event3} />
        </div>
        <div className="home__release">
            <Link to="/"><h2 className="home__title">Mới phát hành</h2></Link>
            <NewRelease />
        </div>
        <div className="home__chart">
            <Link to="/"><h2 className="home__title">Bảng xếp hạng</h2></Link>
            <div className="home__chart__list">
                <div className="home__chart__list__item">
                    <ChartHome category="nhac-viet" title="Việt Nam" bg={bgChartVN} />
                </div>
                <div className="home__chart__list__item">
                    <ChartHome category="au-my" title="Âu Mỹ" bg={bgChartUS} />
                </div>
                <div className="home__chart__list__item">
                    <ChartHome category="nhac-han" title="Hàn Quốc" bg={bgChartKO} />
                </div>
            </div>
        </div>
        <div className="home__hot-video">
            <h2 className="home__title">Video Hot</h2>
            <VideoHot videos={videos} />
        </div>
        <div className="home__topic-hot">
            <h2 className="home__title">Chủ đề Hot</h2>
            <TopicHot topics={topicHot} />
        </div>
        <div className="home__top-100">
            <h2 className="home__title">Top 100</h2>
            <Top100 top100={top100} />
        </div>
        <div className="home__footer">
            <Footer />
        </div>
    </div>;
};

export default Home;
