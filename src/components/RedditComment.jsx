import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

import RedditCommentsWrapper from "./RedditCommentsWrapper";
import FixRedditHTML from "./../FixRedditHTML";
import Tooltip from "./Tooltip";

import "./../css/RedditComment.css";

const RedditComment = (props) => {
  const [vote, setVote] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShared(false);
    }, 1000);
  }, [shared]);

  const time = (t) => {
    let res = "";
    let m = Math.floor((Math.floor(Date.now() / 1000) - t) / 60);
    if (m > 59) m = Math.floor(m / 60);
    if (m === 0) res = "Now";
    else res = `${m}m`;
    return res;
  };

  const upvote = (id) => {
    if (vote <= 0) {
      props.r.getComment(id).upvote();
      setVote(1);
    } else {
      unvote(id);
    }
  };

  const downvote = (id) => {
    if (vote >= 0) {
      props.r.getComment(id).downvote();
      setVote(-1);
    } else {
      unvote(id);
    }
  };

  const unvote = (id) => {
    props.r.getComment(id).unvote();
    setVote(0);
  };

  return (
    <div className="comment-wrapper">
      <div className="comment-shadow">
        <div className="comment">
          <div className="comment-author">
            <div className="name-flair">
              <div className="comment-author-name">
                {props.comment.author} &nbsp;
              </div>
              <div className="comment-author-flair">
                {props.comment.author_flair_text ? <span>&nbsp;</span> : null}
                {
                  <>
                    {props.comment.author_flair_text}
                    <span>&nbsp;</span>
                  </>
                }
              </div>
            </div>
            <div className="comment-time">
              {time(props.comment.created_utc)}
            </div>
          </div>
          <div
            className="comment-body"
            dangerouslySetInnerHTML={{
              __html: FixRedditHTML(props.comment.body_html),
            }}
          />
          <div className="bottom-bar">
            <div
              className="comment-upvote"
              onClick={() => {
                upvote(props.comment.id);
              }}
              style={
                vote === 0
                  ? { color: "#EFEFF1" }
                  : vote === 1
                  ? { color: "#FF4500" }
                  : null
              }
            >
              <i className="fas fa-arrow-up" />
            </div>
            <div className="comment-score-num">{props.comment.score}</div>
            <div
              className="comment-downvote"
              onClick={() => downvote(props.comment.id)}
              style={
                vote === 0
                  ? { color: "#EFEFF1" }
                  : vote === -1
                  ? { color: "#7193FF" }
                  : null
              }
            >
              <i className="fas fa-arrow-down" />
            </div>
            <div
              className="reply"
              onClick={() =>
                props.onReply({
                  id: props.comment.id,
                  name: props.comment.author,
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
                  copy(`https://www.reddit.com${props.comment.permalink}`, {
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
              {props.comment.stickied && (
                <span
                  className="stickied"
                  title="Hide Stickied Comment"
                  onClick={props.onHideStickied}
                >
                  <i className="fas fa-thumbtack"></i>
                </span>
              )}
            </>
          </div>
          <div className="comment-replies">
            <RedditCommentsWrapper
              comments={props.comment.replies}
              onReply={props.onReply}
              r={props.r}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedditComment;
