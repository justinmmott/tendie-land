import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import snoowrap from "snoowrap";
import Loader from "react-loader-spinner";
import Cookies from "js-cookie";

import { clientId } from "../globals/globals";
import clientSecret from "../globals/secrets";
import RedditCommentsWrapper from "./RedditCommentsWrapper";
import FixRedditHTML from "./../FixRedditHTML";

import "./../css/RedditTwitchChat.css";

const RedditTwitchChat = forwardRef((props, ref) => {
  const [comments, setComments] = useState();
  const [post, setPost] = useState();
  const [postRef, setPostRef] = useState();
  const [replyRef, setReplyRef] = useState();
  const [vote, setVote] = useState(0);
  const [reply, setReply] = useState();
  const messagesBegin = useRef();
  const chatBox = useRef();
  const form = useRef();

  const r = new snoowrap({
    userAgent: "web:land.tendie.redditapp:v0.0.1 (by /u/Chocolate_uyu)",
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: Cookies.get("__session"),
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      postRef.refresh();
      getDiscussion(postRef);
    },
  }));

  // const [scroll, setScroll] = useState(false);

  const scrollToTop = () => {
    messagesBegin.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let isCancelled = false;
    if (comments) setComments();

    const wrapper = async () => {
      let sub = await r.getSubmission(props.threadId);
      setPostRef(sub);
      getDiscussion(sub);
    };

    if (!isCancelled) wrapper();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.threadId]);

  const getDiscussion = async (sub) => {
    sub = await sub.fetch();
    setPost(sub);
    let commentListing = commentFilter(sub.comments);
    setComments(await Promise.all(commentListing.map(commentMapper)));
    // if (scroll === false) setScroll(true);
    // comments = await comments.fetchMore({amount: 1000});
  };

  const commentMapper = async (x) => {
    return {
      author: (await x.author).name,
      author_flair_text: x.author_flair_text,
      body_html: x.body_html,
      can_gild: x.can_gild,
      created_utc: x.created_utc,
      distinguished: x.distinguished,
      downs: x.downs,
      gilded: x.gilded,
      gildings: x.gildings,
      replies:
        x.replies.length > 0
          ? await Promise.all(commentFilter(x.replies).map(commentMapper))
          : x.replies,
      score: x.score,
      id: x.id,
      is_submitter: x.is_submitter,
      parent_id: x.parent_id,
      permalink: x.permalink,
      ups: x.ups,
    };
  };

  const commentFilter = (c) => {
    return c.filter((x) => x.body !== "[removed]" && x.body !== "[deleted]");
  };

  const handleChange = () => {
    props.onDelete(props.threadId);
    props.onAdd(false);
  };

  const handleReply = (id) => {
    if (replyRef === id) {
      setReplyRef("");
    } else {
      setReplyRef(id);
      chatBox.current.focus();
    }
  };

  const upvote = () => {
    if (vote <= 0) {
      post.upvote();
      setVote(1);
    } else {
      unvote();
    }
  };

  const downvote = () => {
    if (vote >= 0) {
      post.downvote();
      setVote(-1);
    } else {
      unvote();
    }
  };

  const unvote = () => {
    post.unvote();
    setVote(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (replyRef) {
      r.getComment(replyRef).reply(reply);
    } else {
      // assume to thread
      post.reply(reply);
      setReply('');
    }
  };

  return comments ? (
    <div className="RedditTwitchChat-Wrapper">
      <div className="top-bar-wrapper">
        <div className="top-bar">
          <div className="rtc-trash" onClick={handleChange}>
            <i className="fas fa-trash-alt" />
          </div>
          <div className="Subreddit-name">{post.subreddit_name_prefixed}</div>
          <div className="rtc-plus" onClick={() => props.onAdd(true)}>
            <i className=" fas fa-plus" />
          </div>
        </div>
      </div>
      <div className="RedditTwitchChat">
        <div className="rtc-header">
          <div className="score-wrapper">
            <div className="score">
              <div
                className="comment-upvote"
                onClick={() => {
                  upvote();
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
              <div className="comment-score-num">{post.score}</div>
              <div
                className="comment-downvote"
                onClick={() => downvote()}
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
            </div>
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
            <div className="scroll-to-top" onClick={scrollToTop}>
              <i className="fas fa-arrow-up" />
            </div>
          </div>
          <RedditCommentsWrapper
            comments={comments}
            topLevel={true}
            onReply={handleReply}
            r={r}
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
                  ? `\n  You're replying to the comment with id ${replyRef}`
                  : "\n  You're commenting on the discussion thread"
              }
              value={reply}
              onChange={(event) => {
                setReply(event.target.value);
              }}
            />

            <button type="submit" className="send-wrapper">
              <i className="fas fa-paper-plane"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loader type="Oval" color="#69abed" className="loader" />
  );
});

export default RedditTwitchChat;
