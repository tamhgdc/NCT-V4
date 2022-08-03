import { useState, useEffect } from 'react'

import { exploreArtists } from "nhaccuatui-api-full"


import HeaderArtists from './HeaderArtists'
import ArtistItem from './ArtistItem'
import Footer from "../Footer/Footer"

import { useDispatch } from 'react-redux'
import { loading } from '../../redux/reducers/songSlice'

const Artists = () => {
    const dispatch = useDispatch()

    const [items, setItems] = useState([])
    const [dataShow, setDataShow] = useState([])

    const [nation, setNation] = useState("hot")
    const [gender, setGender] = useState(1)
    const [currPage, setCurrPage] = useState(0)


    useEffect(() => {
        const getArtist = async () => {
            try {
                dispatch(loading(true))
                const res = await exploreArtists({
                    nation: nation,
                    gender: gender
                })
                if (res) {
                    setItems(res.artist)
                    setDataShow(res.artist.slice(0, 40))
                    dispatch(loading(false))
                }
            }
            catch (e) {
                console.log("error", e);
            }
        }
        getArtist()
        setCurrPage(0)
    }, [nation, gender])



    return (
        <div className="artist">
            <HeaderArtists setNation={setNation} setGender={setGender} />
            <div className="artists__list">
                {
                    dataShow && dataShow.length > 0 &&
                    dataShow.slice(0, 40).map((item, i) => (
                        <div className="col-4" key={i}>
                            <ArtistItem item={item} />
                        </div>
                    ))
                }
            </div>
            <Pagination items={items} setDataShow={setDataShow} currPage={currPage} setCurrPage={setCurrPage} />
            <Footer />
        </div>
    )
}

const Pagination = props => {

    const { items, currPage, setCurrPage } = props

    let pages = 1;
    let range = []

    if (items) {
        let page = Math.floor(props.items.length / 40)
        pages = props.items.length % 40 === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }


    const selectPage = page => {
        const start = 40 * page
        const end = 40 + start

        props.setDataShow(props.items.slice(start, end))

        setCurrPage(page)
    }


    return (
        <div className="pagination">
            {
                range && range.length > 0 &&
                range.map((item, i) => (
                    <div className={`pagination__item ${currPage === item ? 'active' : ''}`}
                        onClick={() => selectPage(item)}
                        key={i}
                    >
                        {item + 1}
                    </div>
                ))
            }
        </div>
    )
}

export default Artists