import React from 'react'

import { Link } from 'react-router-dom'

const ArtistItem = (props) => {

    const { item } = props


    return (
        <>
            {
                item && <div className="artist-item">
                    <Link to={`/artist/${item.shortLink}`}>
                        <img src={item.imageUrl} alt="" />
                        <p>{item.name}</p>
                    </Link>
                </div>
            }
        </>
    )
}

export default ArtistItem