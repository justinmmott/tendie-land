import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import snoowrap from "snoowrap";
import Cookies from "js-cookie";
import { clientId } from "../../globals/globals";
import RedditTwitchChat from "./../rtc/RedditTwitchChat";
import Loader from "react-loader-spinner";

const RTCWrapper = forwardRef(
  ({ threadId, onDelete, onAdd, analytics }, ref) => {
    const [comments, setComments] = useState();
    const [submission, setSubmission] = useState();
    const [snoo, setSnoo] = useState();
    const [submissionRef, setSubmissionRef] = useState();

    useImperativeHandle(ref, () => ({
      refresh() {
        if (analytics) analytics.logEvent("refresh");
        submissionRef.refresh();
        getSubmission(submissionRef);
      },
    }));

    useEffect(() => {
      let cancelled = false;

      const wrapper = async () => {
        const tempSnoo = new snoowrap({
          userAgent: "app:land.tendie.redditapp:v0.0.3 (by /u/Chocolate_uyu)",
          clientId: clientId,
          clientSecret: "",
          refreshToken: Cookies.get("__session"),
        });
        setSnoo(tempSnoo);
        let sub = await tempSnoo.getSubmission(threadId);
        setSubmissionRef(sub);
        await getSubmission(sub);
      };

      if (!cancelled) wrapper();

      return () => {
        cancelled = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threadId]);

    const getSubmission = async (sub) => {
      try {
        sub = await sub.fetch();
      } catch (err) {
        if (analytics) analytics.logEvent("sessionExpired");
        Cookies.remove("__session");
        alert("Session ended log-in again");
        window.location.href = "https://tendie.land";
      }
      setSubmission(sub);
      let commentListing = commentFilter(sub.comments);
      setComments(await Promise.all(commentListing.map(commentMapper)));
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
        id: x.id,
        is_submitter: x.is_submitter,
        likes: x.likes,
        replies:
          x.replies.length > 0
            ? await Promise.all(commentFilter(x.replies).map(commentMapper))
            : x.replies,
        score: x.score,
        stickied: x.stickied,
        parent_id: x.parent_id,
        permalink: x.permalink,
        ups: x.ups,
      };
    };

    const commentFilter = (c) => {
      return c.filter((x) => x.body !== "[removed]" && x.body !== "[deleted]");
    };

    return comments && submission ? (
      <RedditTwitchChat
        submission={submission}
        comments={comments}
        snoo={snoo}
        onDelete={onDelete}
        onAdd={onAdd}
        threadId={threadId}
        analytics={analytics}
      />
    ) : (
      <Loader type="Oval" color="#69abed" className="loader" />
    );
  }
);

export default RTCWrapper;
