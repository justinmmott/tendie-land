import React, { useEffect, useState, useRef } from "react";
import Loader from "react-loader-spinner";

import RedditCommentsWrapper from "./RedditCommentsWrapper";
import FixRedditHTML from "../scripts/FixRedditHTML";
import RedditScore from "./RedditScore";

import "./../css/RedditTwitchChat.css";
import Tooltip from "./Tooltip";

const RedditTwitchChat = ({
  submission,
  comments,
  snoo,
  onDelete,
  onAdd,
  threadId,
}) => {
  const [replyRef, setReplyRef] = useState();
  const [reply, setReply] = useState();
  const [post, setPost] = useState();
  const messagesBegin = useRef();
  const chatBox = useRef();
  const form = useRef();

  useEffect(() => {
    setPost(submission);
  }, [submission]);

  const scrollToTop = () => {
    messagesBegin.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReply = (commentor) => {
    if (replyRef && replyRef.id === commentor.id) {
      setReplyRef("");
    } else {
      setReplyRef(commentor);
      chatBox.current.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (replyRef) {
      snoo.getComment(replyRef.id).reply(reply);
      setReply("");
    } else {
      // assume to thread
      post.reply(reply);
      setReply("");
    }
  };

  const handleChange = () => {
    onDelete(threadId);
    onAdd(false);
  };

  const stopReply = () => {
    setReplyRef();
  };

  return post ? (
    <div className="RedditTwitchChat-Wrapper">
      <div className="top-bar-wrapper">
        <div className="top-bar">
          <Tooltip content="Delete Discussion" direction="bottom">
            <div className="rtc-trash" onClick={handleChange}>
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
            />
          </div>
          <div className="post">
            <div className="post-name">{post.title}</div>
            <div
              className="post-selftext"
              dangerouslySetInnerHTML={{
                __html: FixRedditHTML(post.selftext_html),
              }}
            />
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

            <button type="submit" className="send-wrapper">
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loader type="Oval" color="#69abed" className="loader" />
  );
};

export default React.memo(RedditTwitchChat);
