import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

import RedditCommentsWrapper from "./RedditCommentsWrapper";
import FixRedditHTML from "../scripts/FixRedditHTML";
import Tooltip from "./Tooltip";

import "./../css/RedditComment.css";

const RedditComment = (props) => {
  const [shared, setShared] = useState(false);
  const [comment, setComment] = useState();

  useEffect(() => {
    setComment(props.comment);
  }, [props.comment]);

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
  const upvote = () => {
    const post = props.r.getComment(comment.id);
    const likes = comment.likes;
    const score = comment.score;
    if (!likes) {
      setComment({
        ...comment,
        likes: true,
        score: likes === false ? score + 2 : score + 1,
      });
      post.upvote();
    } else {
      unvote();
    }
  };

  const downvote = () => {
    const post = props.r.getComment(comment.id);
    const likes = comment.likes;
    const score = comment.score;
    if (likes == null || likes) {
      setComment({
        ...comment,
        likes: false,
        score: likes === true ? score - 2 : score - 1,
      });
      post.downvote();
    } else {
      unvote();
    }
  };

  const unvote = () => {
    const post = props.r.getComment(comment.id);
    const likes = comment.likes;
    const score = comment.score;
    setComment({
      ...comment,
      likes: null,
      score: likes === true ? score - 1 : score + 1,
    });
    post.unvote();
  };

  return (
    <div className="comment-wrapper">
      <div className="comment-shadow">
        {comment && (
          <div className="comment">
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
              <div
                className="comment-upvote"
                onClick={() => {
                  upvote();
                }}
                style={
                  comment.likes == null
                    ? { color: "#EFEFF1" }
                    : comment.likes
                    ? { color: "#FF4500" }
                    : null
                }
              >
                <i className="fas fa-arrow-up" />
              </div>
              <div className="comment-score-num">{comment.score}</div>
              <div
                className="comment-downvote"
                onClick={() => downvote()}
                style={
                  comment.likes == null
                    ? { color: "#EFEFF1" }
                    : !comment.likes
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
                    onClick={props.onHideStickied}
                  >
                    <i className="fas fa-thumbtack"></i>
                  </span>
                )}
              </>
            </div>
            <div className="comment-replies">
              <RedditCommentsWrapper
                comments={comment.replies}
                onReply={props.onReply}
                r={props.r}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedditComment;
