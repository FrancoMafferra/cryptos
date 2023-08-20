import React, { useState, useEffect, useRef } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [coinData, setCoinData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
                const data = await response.json();
                setCoinData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCoinData();
    }, []);

    const handleSearch = () => {
        const coin = coinData.find(
            coin =>
                coin.id.toLowerCase() === searchTerm.toLowerCase() ||
                coin.symbol.toLowerCase() === searchTerm.toLowerCase() ||
                coin.name.toLowerCase() === searchTerm.toLowerCase()
        );

        if (coin) {
            // Redirigir al usuario a la página correspondiente
            window.location.href = `/coin/${coin.id}`;
        } else {
            // Mostrar un mensaje de error si el término no coincide con ninguna moneda
            alert('Moneda no encontrada');
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchTerm(inputValue);

        const results = coinData.filter(
            coin =>
                coin.id.toLowerCase().includes(inputValue) ||
                coin.symbol.toLowerCase().includes(inputValue) ||
                coin.name.toLowerCase().includes(inputValue)
        );

        setSearchResults(results);
    };

    const handleAutocomplete = (coinName) => {
        setSearchTerm(coinName);
        setSearchResults([]);
    };

    const searchResultsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar una moneda"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Buscar</button>

            {searchResults.length > 0 && (
                <ul ref={searchResultsRef} style={{ position: 'absolute', zIndex: 1 }}>
                    {searchResults.map(coin => (
                        <li key={coin.id} onClick={() => handleAutocomplete(coin.name)}>{coin.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;