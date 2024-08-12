import React, { useEffect, useState } from "react";

const YoutubeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const SEARCH_API =
    "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

  const fetchData = async () => {
    const data = await fetch(SEARCH_API + searchQuery);
    const response = await data.json();
    setSearchResult(response[1]);
  };

  console.log(searchResult, "---");

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="wrapper">
      <div>YoutubeSearch</div>
      <div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {searchResult.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeSearch;
