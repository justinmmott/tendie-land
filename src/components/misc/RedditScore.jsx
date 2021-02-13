import "./../../css/misc/RedditScore.css";

const RedditScore = ({ post, setPost, flex, snooPostRef }) => {
  const upvote = async () => {
    const likes = post.likes;
    const score = post.score;
    if (!likes) {
      setPost({
        ...post,
        likes: true,
        score: likes === false ? score + 2 : score + 1,
      });
      await snooPostRef.upvote();
    } else {
      await unvote();
    }
  };

  const downvote = async () => {
    const likes = post.likes;
    const score = post.score;
    if (likes == null || likes) {
      setPost({
        ...post,
        likes: false,
        score: likes === true ? score - 2 : score - 1,
      });
      await snooPostRef.downvote();
    } else {
      await unvote();
    }
  };

  const unvote = async () => {
    const likes = post.likes;
    const score = post.score;
    setPost({
      ...post,
      likes: null,
      score: likes === false ? score + 1 : score - 1,
    });
    await snooPostRef.unvote();
  };

  const ScoreBar = () => {
    return (
      <>
        <div
          className="comment-upvote"
          onClick={async () => {
            await upvote();
          }}
          style={
            post.likes == null
              ? { color: "#EFEFF1" }
              : post.likes
              ? { color: "#FF4500" }
              : null
          }
        >
          <i className="fas fa-arrow-up" />
        </div>
        <div className="comment-score-num">{post.score}</div>
        <div
          className="comment-downvote"
          onClick={async () => await downvote()}
          style={
            post.likes == null
              ? { color: "#EFEFF1" }
              : !post.likes
              ? { color: "#7193FF" }
              : null
          }
        >
          <i className="fas fa-arrow-down" />
        </div>
      </>
    );
  };

  return (
    <>
      {flex === "column" ? (
        <div className="score">
          <ScoreBar />
        </div>
      ) : (
        <ScoreBar />
      )}
    </>
  );
};

export default RedditScore;
