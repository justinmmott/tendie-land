import React, { useState } from "react";

import RedditComment from "./RedditComment";

import "./../css/RedditCommentsWrapper.css";

const RedditCommentsWrapper = (props) => {
  const [hideSticky, setHideSticky] = useState(false);

  const handleHideStickied = () => {
    setHideSticky(!hideSticky);
  };

  return (
    <div className="comments">
      {props.topLevel
        ? props.comments.map((comment, index) => (
            <div key={index} className="top-level-comment">
              {!(hideSticky && comment.stickied) && (
                <RedditComment
                  key={index}
                  comment={comment}
                  onReply={props.onReply}
                  r={props.r}
                  onHideStickied={handleHideStickied}
                />
              )}
            </div>
          ))
        : props.comments.map((comment, index) => (
            <RedditComment
              key={index}
              comment={comment}
              onReply={props.onReply}
              r={props.r}
            ></RedditComment>
          ))}
    </div>
  );
};

export default RedditCommentsWrapper;
