import React, { useEffect, useState } from "react";
import "./styles.css";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const response = await data.json();

    setData(response.products);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className="heading">Pagination</div>
      <div className="products">
        {data.slice(page * 10 - 10, page * 10).map((item) => (
          <div className="products-single" key={item.id}>
            <div>
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <div className="arrow">⬅️</div>
        {[...Array(data.length / 10)].map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: page === index + 1 ? "gray" : "white",
            }}
            className="page-number"
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </div>
        ))}
        <div className="arrow">➡️</div>
      </div>
    </div>
  );
};

export default Pagination;
