import React from 'react';
import { Link } from 'react-router-dom';

const TopicHot = props => {

    const topics = props.topics ? props.topics.slice(0, 4) : null

    return <div className="topic-hot">
        {
            topics && topics.map((item, i) => (
                <div className="topic-hot__item"
                    key={i}
                    style={{ backgroundImage: `url(${item.thumbURL})` }}
                >
                    <Link to={`/topic/${item.key}`}></Link>
                </div>
            ))
        }
    </div>;
};

export default TopicHot;
