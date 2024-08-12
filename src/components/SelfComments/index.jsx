import React, { useState } from "react";
import data from "./data";
import "./styles.css";

const Comment = ({
  data,
  onReplyClick,
  replyingTo,
  setComments,
  deleteComment,
}) => {
  const [reply, setReply] = useState("");

  const replyComment = (id) => {
    if (data.id === id) {
      const newReply = {
        id: new Date().getTime(),
        comment: reply,
        reply: [],
      };

      // Update the specific comment with the new reply
      const updateReplies = (comments) => {
        return comments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              reply: [...(comment.reply || []), newReply],
            };
          } else if (comment.reply?.length > 0) {
            return {
              ...comment,
              reply: updateReplies(comment.reply),
            };
          }
          return comment;
        });
      };

      setComments((prev) => updateReplies(prev));
      setReply(""); // Clear the input after replying
      onReplyClick(null); // Close the reply input after submitting
    }
  };

  return (
    <>
      <div className="single-comment-container">
        <div className="comment">{data.comment}</div>
        <button className="reply-button" onClick={() => onReplyClick(data.id)}>
          Add Reply
        </button>
        <button
          className="delete-button"
          onClick={() => deleteComment(data.id)}
        >
          Delete
        </button>
      </div>
      {replyingTo === data.id && (
        <>
          <input
            value={reply}
            className="reply-input"
            onChange={(e) => setReply(e.target.value)}
          />
          <button className="reply" onClick={() => replyComment(replyingTo)}>
            Reply
          </button>
        </>
      )}
    </>
  );
};

const CommentList = ({
  comments,
  onReplyClick,
  replyingTo,
  setComments,
  deleteComment,
}) => {
  return (
    <div>
      {comments.map((singleComment) => (
        <div key={singleComment.id}>
          <Comment
            data={singleComment}
            onReplyClick={onReplyClick}
            replyingTo={replyingTo}
            setComments={setComments}
            deleteComment={deleteComment}
          />
          {singleComment.reply?.length > 0 && (
            <div className="nested-comment">
              <CommentList
                comments={singleComment.reply}
                onReplyClick={onReplyClick}
                replyingTo={replyingTo}
                setComments={setComments}
                deleteComment={deleteComment}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SelfComments = () => {
  const [comments, setComments] = useState(data);
  const [value, setValue] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const addNewComment = () => {
    const newComment = {
      id: new Date().getTime(),
      comment: value,
      reply: [],
    };

    setComments((prev) => [...prev, newComment]);
    setValue("");
  };

  const handleReplyClick = (id) => {
    setReplyingTo((prev) => (prev === id ? null : id));
  };

  const deleteComment = (id) => {
    const removeComment = (comments) => {
      return comments
        .map((comment) => {
          if (comment.id === id) {
            return null; // Mark the comment for removal
          } else if (comment.reply?.length > 0) {
            return {
              ...comment,
              reply: removeComment(comment.reply),
            };
          }
          return comment;
        })
        .filter(Boolean); // Remove any `null` comments
    };

    setComments((prev) => removeComment(prev));
  };

  return (
    <div className="main-container">
      <div className="adding-input">
        <input
          className="input"
          placeholder="Add New Comment ..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="add-button" onClick={addNewComment}>
          Add Comment
        </button>
      </div>
      <CommentList
        comments={comments}
        onReplyClick={handleReplyClick}
        replyingTo={replyingTo}
        setComments={setComments}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default SelfComments;
