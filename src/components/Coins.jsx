import React, { useState } from 'react'
import CoinItem from './CoinItem'
import './Coins.css'
import { Link } from 'react-router-dom'

const Coins = (props) => {
    const [currentPage, setCurrentPage] = useState(0)
    const coinsPerPage = 4

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    const displayCoins = props.coins.slice(
        currentPage * coinsPerPage,
        currentPage * coinsPerPage + coinsPerPage
    )

    const showPreviousButton = currentPage > 0
    const showNextButton = currentPage < Math.ceil(props.coins.length / coinsPerPage) - 1

    return (
        <div className='container'>
            <div>
                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p className="hide-mobile">Volume</p>
                    <p className="hide-mobile">Mkt Cap</p>
                </div>

                {displayCoins.map((coin) => {
                    return (
                        <Link to={`/coin/${coin.id}`} key={coin.id}>
                            <CoinItem coins={coin} />
                        </Link>
                    )
                })}
            </div>

            {/* Renderizar botones de paginación */}
            <div className='pagination'>
                {showPreviousButton && (
                    <button className="previous-page" onClick={handlePreviousPage}> Previous</button>
                )}
                        <span>{currentPage}</span>

                {showNextButton && (
                    <button className="next-page" onClick={handleNextPage}>Next </button>
                )}
            </div>
        </div>
    )
}

export default Coins