import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Nfts.css";

function Nfts() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/nfts/list?per_page=${itemsPerPage}&page=${currentPage}`
        );
        const info = response.data;
        const totalPages = Math.ceil(response.headers["total"] / itemsPerPage);
        setData(info);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage - 1 < 1 ? 1 : prevPage - 1;
      return newPage;
    });
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1 > totalPages ? totalPages : prevPage + 1;
      return newPage;
    });
  };

  //-------------------------------------------------------------------------------------------------------------

  const infoNft = async () => {
    try {
    const response = await fetch(`https://api.coingecko.com/api/v3/nfts/list?per_page=${itemsPerPage}&page=${currentPage}`);
    const data = await response.json();
    const detailsDataArray = await Promise.all(data.map(async (nft) => {
    const nftId = nft.id;
    const detailsResponse = await fetch(`https://api.coingecko.com/api/v3/nfts/${nftId}`);
    const detailsData = await detailsResponse.json();
    
    for (let key in detailsData) {
    console.log(key + ':', detailsData[key]);
    }
    
    return detailsData;
    }));
    
    return detailsDataArray;
    } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
    return null;
    }
    }
    
    infoNft();

  return (
    <>
      <h1>NFTs</h1>

      <div className="pagination">
        <button
          className="btn-p"
          disabled={currentPage === 1}
          onClick={handleClickPrevious}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          className="btn-p"
          disabled={currentPage === totalPages}
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Symbol: {item.symbol}</p>
            <p>Contract Address: {item.contract_address}</p>
            <p className="li-nfts">
              Asset Platform ID: {item.asset_platform_id}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Nfts;
