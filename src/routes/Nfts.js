import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Nfts.css";
import { Link } from "react-router-dom";

function Nfts() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  {
    /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/nfts/list?per_page=${itemsPerPage}&page=${currentPage}`
        );
        const info = response.data;
        console.log(info)
        const totalPages = Math.ceil(response.headers["total"] / itemsPerPage);
        setData(info);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);*/
  }

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

  useEffect(() => {
    const infoNft = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/nfts/list?per_page=${itemsPerPage}&page=${currentPage}`
        );
        const data = await response.json();
        const totalPages = Math.ceil(response.headers["total"] / itemsPerPage);
        setTotalPages(totalPages);
        const detailsDataArray = await Promise.all(
          data.map(async (nft) => {
            const nftId = nft.id;
            const detailsResponse = await fetch(
              `https://api.coingecko.com/api/v3/nfts/${nftId}`
            );
            const detailsData = await detailsResponse.json();
            // console.log(`INFO UTIL`+``+detailsData)

            const formattedData = {
              id: detailsData.id,
              name: detailsData.name,
              description: detailsData.description,
              image_url: detailsData.image.small || "",
              native_currency: detailsData.native_currency,
              // Agregar las propiedades que necesites
            };
            return formattedData;
          })
        );
        setData(detailsDataArray);
        console.log(detailsDataArray);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      }
    };

    infoNft();
  }, [currentPage, itemsPerPage]);

  //------------------------------------------------------------------------------------------------------------

  return (
    <>
      <h1>NFTs</h1>

      <table className="container-table">
        <thead className="table-thead">
          <tr>
            <th className="table-th">Symbol</th>
            <th className="table-th">Name</th>
            <th className="table-th">Native Currency</th>
            <th className="table-th">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                {item.image_url && <img src={item.image_url} alt={item.name} />}
              </td>
              <td className="table-th">{item.name}</td>
              <td className="table-th">{item.native_currency}</td>
              <td className="table-th">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </>
  );
}

export default Nfts;
