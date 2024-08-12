import React, { useState } from "react";
import "./styles.css";

const Comment = ({ data, handleClick }) => {
  const { name, comment } = data;
  return (
    <div className="comment-container" onClick={handleClick}>
      <div className="name">{name}</div>
      <div className="comment">{comment}</div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  const [showNested, setShowNested] = useState(false);
  return (
    <div>
      {comments.map((com, index) => (
        <div key={index}>
          <Comment data={com} handleClick={() => setShowNested(!showNested)} />
          {showNested && (
            <div className="nested">
              {com.items && <CommentList comments={com?.items} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const NestedComments = ({ data }) => {
  return <CommentList comments={data} />;
};

export default NestedComments;
