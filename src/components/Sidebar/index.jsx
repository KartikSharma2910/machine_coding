import React, { useState } from "react";
import "./styles.css";

const Sidebar = ({ data }) => {
  const [expand, setExpand] = useState(false);

  if (data.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          🗂️ {data.name}
        </div>
        {expand && (
          <div className="inner-container">
            {data.items.map((item, index) => (
              <Sidebar data={item} key={index} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return <div className="file">🗒️{data.name}</div>;
  }
};

export default Sidebar;
