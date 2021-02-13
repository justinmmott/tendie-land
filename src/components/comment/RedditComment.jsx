import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

import RedditCommentsWrapper from "./RedditCommentsWrapper";
import FixRedditHTML from "./../../scripts/FixRedditHTML";
import Tooltip from "./../misc/Tooltip";
import RedditScore from "./../misc/RedditScore";

import "./../../css/comment/RedditComment.css";

const RedditComment = ({ commentState, onReply, snoo, onHideStickied }) => {
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState();

  useEffect(() => {
    let cancelled = false;
    !cancelled && setComment(commentState);
    return () => {
      cancelled = true;
    };
  }, [commentState]);

  useEffect(() => {
    let cancelled = false;
    setTimeout(() => {
      !cancelled && setShared(false);
    }, 1000);
    return () => {
      cancelled = true;
    };
  }, [shared]);

  const time = (t) => {
    let res = "";
    let m = Math.floor((Math.floor(Date.now() / 1000) - t) / 60);
    if (m > 59) m = Math.floor(m / 60);
    if (m === 0) res = "Now";
    else res = `${m}m`;
    return res;
  };

  return (
    <div className="comment-wrapper">
      <div className="comment-shadow">
        {comment && (
          <div
            className="comment"
            style={
              comment.stickied
                ? { gridTemplateColumns: "auto 18vh 2fr" }
                : { gridTemplateColumns: "auto 16vh 2fr" }
            }
          >
            <div className="comment-author">
              <div className="name-flair">
                <div className="comment-author-name">
                  {comment.author} &nbsp;
                </div>
                <div className="comment-author-flair">
                  {comment.author_flair_text ? <span>&nbsp;</span> : null}
                  {
                    <>
                      {comment.author_flair_text}
                      <span>&nbsp;</span>
                    </>
                  }
                </div>
              </div>
              <div className="comment-time">{time(comment.created_utc)}</div>
            </div>
            <div
              className="comment-body"
              dangerouslySetInnerHTML={{
                __html: FixRedditHTML(comment.body_html),
              }}
            />
            <div className="bottom-bar">
              <RedditScore
                post={comment}
                setPost={setComment}
                snooPostRef={snoo.getComment(comment.id)}
              />
              <div
                className="reply"
                onClick={() =>
                  onReply({
                    id: comment.id,
                    name: comment.author,
                  })
                }
              >
                Reply
              </div>
              <Tooltip
                content="Copied to Clipboard"
                direction="down"
                shared={shared}
              >
                <div
                  className="share"
                  onClick={() => {
                    setShared(true);
                    copy(`https://www.reddit.com${comment.permalink}`, {
                      message: "Copied link to clipboard",
                    });
                  }}
                  data-tip
                  data-for="copiedTip"
                >
                  Share
                </div>
              </Tooltip>
              <>
                {comment.stickied && (
                  <span
                    className="stickied"
                    title="Hide Stickied Comment"
                    onClick={onHideStickied}
                  >
                    <i className="fas fa-thumbtack"></i>
                  </span>
                )}
              </>
            </div>
            <div className="comment-replies">
              <RedditCommentsWrapper
                comments={comment.replies}
                onReply={onReply}
                snoo={snoo}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RedditComment);
