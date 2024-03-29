import React, { useEffect, useState, useRef, useCallback } from "react";
import Loader from "react-loader-spinner";

import RedditCommentsWrapper from "./../comment/RedditCommentsWrapper";
import FixRedditHTML from "./../../scripts/FixRedditHTML";
import RedditScore from "./../misc/RedditScore";

import "./../../css/rtc/RedditTwitchChat.css";
import Tooltip from "./../misc/Tooltip";

const RedditTwitchChat = ({
  submission,
  comments,
  snoo,
  onDelete,
  onAdd,
  threadId,
  analytics,
}) => {
  const [replyRef, setReplyRef] = useState();
  const [reply, setReply] = useState("");
  const [post, setPost] = useState();
  const messagesBegin = useRef();
  const chatBox = useRef();
  const form = useRef();

  useEffect(() => {
    let cancelled = false;
    !cancelled && setPost(submission);

    return () => {
      cancelled = true;
    };
  }, [submission]);

  const scrollToTop = () => {
    if (analytics) analytics.logEvent("scrollToTop");
    messagesBegin.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReply = useCallback((commentor) => {
    if (analytics) analytics.logEvent("startReply");
    setReplyRef(commentor);
    chatBox.current.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const stopReply = () => {
    if (reply !== "") {
      // check if form was submitted
      if (replyRef) {
        if (analytics) analytics.logEvent("replyToComment");
        // reply to comment
        snoo.getComment(replyRef.id).reply(reply);
        setReply("");
      } else {
        // assume reply is to thread
        if (analytics) analytics.logEvent("replyToThread");
        post.reply(reply);
        setReply("");
      }
    }
    setReplyRef();
  };

  return post ? (
    <div className="RedditTwitchChat-Wrapper">
      <div className="top-bar-wrapper">
        <div className="top-bar">
          <Tooltip content="Delete Discussion" direction="bottom">
            <div className="rtc-trash" onClick={() => onDelete(threadId)}>
              <i className="fas fa-trash-alt" />
            </div>
          </Tooltip>
          <div className="Subreddit-name">{post.subreddit_name_prefixed}</div>
          <Tooltip content="Add new Discussion" direction="bottom">
            <div className="rtc-plus" onClick={() => onAdd(true)}>
              <i className=" fas fa-plus" />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="RedditTwitchChat">
        <div className="rtc-header">
          <div className="score-wrapper">
            <RedditScore
              className="RedditScore"
              flex="column"
              post={post}
              setPost={setPost}
              snooPostRef={post}
              analytics={analytics}
            />
          </div>
          <div className="post">
            <div className="post-name">{post.title}</div>
            {post.selftext_html == null ? (
              <div className="post-selftext">
                <img src={post.preview.images[0].source.url} alt={post.title}/>
              </div>
            ) : (
              <div
                className="post-selftext"
                dangerouslySetInnerHTML={{
                  __html: FixRedditHTML(post.selftext_html),
                }}
              />
            )}
          </div>
        </div>
        <div className="post-comments-wrapper" ref={messagesBegin}>
          <div className="s2t-wrapper">
            <Tooltip content="Go to top" direction="top">
              <div className="scroll-to-top" onClick={scrollToTop}>
                <i className="fas fa-arrow-up" />
              </div>
            </Tooltip>
          </div>
          <RedditCommentsWrapper
            comments={comments}
            topLevel={true}
            onReply={handleReply}
            snoo={snoo}
            analytics={analytics}
          />
        </div>
      </div>
      <div className="chat-box-wrapper">
        <div className="chat-box">
          <form
            className="chat-wrapper"
            onSubmit={handleSubmit}
            ref={form}
            action="#"
          >
            <textarea
              id={"ta"}
              ref={chatBox}
              placeholder={
                replyRef
                  ? `\n  You're replying to ${replyRef.name}'s comment`
                  : "\n  You're commenting on the discussion thread"
              }
              value={reply}
              onChange={(event) => {
                setReply(event.target.value);
              }}
              onBlur={stopReply}
            />
            <div className="send-wrapper">
              <button type="submit" className="send">
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loader type="Oval" color="#69abed" className="loader" />
  );
};

export default React.memo(RedditTwitchChat);
