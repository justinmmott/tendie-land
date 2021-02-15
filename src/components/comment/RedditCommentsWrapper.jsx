import React, { useState } from "react";

import RedditComment from "./RedditComment";

import "./../../css/comment/RedditCommentsWrapper.css";

const RedditCommentsWrapper = ({ topLevel, comments, snoo, onReply, analytics }) => {
  const [hideSticky, setHideSticky] = useState(false);

  const handleHideStickied = () => {
    if (analytics) analytics.logEvent("hideSticky");
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
                  analytics={analytics}
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
              analytics={analytics}
            ></RedditComment>
          ))}
    </div>
  );
};

export default React.memo(RedditCommentsWrapper);
