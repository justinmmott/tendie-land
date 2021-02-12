import React, { useState } from "react";

import RedditComment from "./RedditComment";

import "./../css/RedditCommentsWrapper.css";

const RedditCommentsWrapper = ({ topLevel, comments, snoo, onReply }) => {
  const [hideSticky, setHideSticky] = useState(false);

  const handleHideStickied = () => {
    setHideSticky(!hideSticky);
  };

  return (
    <div className="comments">
      {topLevel
        ? comments.map((comment, index) => (
            <div key={index} className="top-level-comment">
              {!(hideSticky && comment.stickied) && (
                <RedditComment
                  key={index}
                  commentState={comment}
                  onReply={onReply}
                  snoo={snoo}
                  onHideStickied={handleHideStickied}
                />
              )}
            </div>
          ))
        : comments.map((comment, index) => (
            <RedditComment
              key={index}
              commentState={comment}
              onReply={onReply}
              snoo={snoo}
            ></RedditComment>
          ))}
    </div>
  );
};

export default React.memo(RedditCommentsWrapper);
