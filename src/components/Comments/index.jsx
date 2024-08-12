import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

const commentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];
    case "EDIT_COMMENT":
      return state.map((comment) =>
        comment.id === action.payload.id
          ? { ...comment, text: action.payload.text }
          : comment
      );
    case "DELETE_COMMENT":
      return state.filter((comment) => comment.id !== action.payload.id);
    case "TOGGLE_LIKE":
      return state.map((comment) =>
        comment.id === action.payload.id
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      );
    case "TOGGLE_DISLIKE":
      return state.map((comment) =>
        comment.id === action.payload.id
          ? { ...comment, dislikes: comment.dislikes + 1 }
          : comment
      );
    case "ADD_REPLY":
      return state.map((comment) =>
        comment.id === action.payload.id
          ? { ...comment, replies: [...comment.replies, action.payload.reply] }
          : comment
      );
    default:
      return state;
  }
};

const Comment = ({ comment, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(comment.text);
  const [replyText, setReplyText] = useState("");

  const handleEdit = () => {
    dispatch({
      type: "EDIT_COMMENT",
      payload: { id: comment.id, text: newText },
    });
    setIsEditing(false);
  };

  const handleReply = () => {
    const newReply = {
      id: uuidv4(),
      text: replyText,
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    dispatch({
      type: "ADD_REPLY",
      payload: { id: comment.id, reply: newReply },
    });
    setReplyText("");
  };

  return (
    <div style={{ marginLeft: comment.depth * 20 }}>
      {isEditing ? (
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <p>{comment.text}</p>
      )}
      <div>
        <button
          onClick={() =>
            dispatch({ type: "TOGGLE_LIKE", payload: { id: comment.id } })
          }
        >
          Like ({comment.likes})
        </button>
        <button
          onClick={() =>
            dispatch({ type: "TOGGLE_DISLIKE", payload: { id: comment.id } })
          }
        >
          Dislike ({comment.dislikes})
        </button>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && <button onClick={handleEdit}>Save</button>}
        <button
          onClick={() =>
            dispatch({ type: "DELETE_COMMENT", payload: { id: comment.id } })
          }
        >
          Delete
        </button>
      </div>
      <div>
        <textarea
          placeholder="Reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={handleReply}>Reply</button>
      </div>
      <div>
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
};

const Comments = () => {
  const [state, dispatch] = useReducer(commentReducer, initialState);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {
    const newComment = {
      id: uuidv4(),
      text: commentText,
      likes: 0,
      dislikes: 0,
      replies: [],
      depth: 0,
    };
    dispatch({ type: "ADD_COMMENT", payload: newComment });
    setCommentText("");
  };

  return (
    <div>
      <textarea
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={addComment}>Comment</button>
      <div>
        {state.map((comment) => (
          <Comment key={comment.id} comment={comment} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
