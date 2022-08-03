import React from 'react';
import { Link } from 'react-router-dom';
import MusicCard from '../MusicCard/MusicCard';

const Top100 = (props) => {

    const top100 = props.top100 ? props.top100.slice(0, 4) : null

    return <div className="top-100">
        {
            top100 && top100.map((item, i) => (
                <div className="top-100__item" key={i}>
                    <Link to={`/top100/${item.key}`}>
                        <MusicCard item={item} isShowFull={true} />
                    </Link>
                </div>
            ))
        }
    </div>;
};

export default Top100;
