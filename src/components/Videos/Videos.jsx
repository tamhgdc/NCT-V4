import { useState, useEffect } from 'react';

import { explore } from "nhaccuatui-api-full";
import { useDispatch } from 'react-redux';
import { loading } from '../../redux/reducers/songSlice';
import { VideoCard } from '../Home/VideoHot';
import Footer from '../Footer/Footer';
import HeaderVideos from './HeaderVideos';

const Videos = () => {

    const [videos, setVideos] = useState([]);
    const [param, setParam] = useState("moi-hot");

    const dispatch = useDispatch()

    useEffect(() => {
        const getVideos = async () => {
            try {
                dispatch(loading(true))
                const res = await explore({
                    type: "mv",
                    key: param,
                    page: 1,
                    pageSize: 36,
                })
                if (res) {
                    setVideos(res.data)
                    dispatch(loading(false))
                }
            }
            catch (e) {
                console.log("Error", e);
            }
        }
        getVideos()
        window.scrollTo(0, 0)
    }, [param]);


    return <div className="videos">
        <HeaderVideos setParam={setParam} />
        <div className="row">
            {
                videos && videos.length > 0 &&
                videos.map((item, i) => (
                    <div className="col-3" key={i}>
                        <VideoCard item={item} videoHot={false} />
                    </div>
                ))
            }
        </div>
        <Footer />
    </div>;
};

export default Videos;
