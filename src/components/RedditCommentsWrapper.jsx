import RedditComment from "./RedditComment";

import "./../css/RedditCommentsWrapper.css";

const RedditCommentsWrapper = (props) => {
  return (
    <div className="comments">
      {props.topLevel
        ? props.comments.map((comment, index) => (
            <div key={index} className="top-level-comment">
              <RedditComment
                key={index}
                comment={comment}
                onReply={props.onReply}
                r={props.r}
              />
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
