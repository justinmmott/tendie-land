import React, { useEffect, useState, useRef, createRef } from "react";
import matchAll from "match-all";
import ls from 'local-storage';

import RedditTwitchChat from "./RedditTwitchChat";
import useInterval from "./../Interval";

import "./../css/RTCWrapper.css";

const RTCWrapper = () => {
  const [threadIds, setThreadIds] = useState([]);
  const [add, setAdd] = useState(false);
  const index = useRef(0);
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      setThreadIds(ls.get('threadIds') || []);
      first.current = false;
    }
    ls.set('threadIds', threadIds);
  }, [threadIds])

  useInterval(() => {
    if (threadIds.length > 0) {
      if (index.current + 1 < threadIds.length) index.current++;
      else index.current = 0;
      threadIds[index.current].ref.current?.refresh();
    }
  }, 2000);

  const AddRTC = () => {
    const [link, setLink] = useState("");

    const submitThread = (threadLink) => {
      let urlRegex = /((https?:\/\/www\.)?(reddit\.com\/r\/\w*\/\w*\/)?(\w*)(\/\w*\/))?/g;
      let id = matchAll(threadLink, urlRegex).nextRaw();
      id = id.filter((x) => !x.includes("/"))[0];
      setThreadIds([
        ...threadIds,
        {
          id: id,
          ref: createRef(),
        },
      ]);
    };

    const defaultURL = "https://www.reddit.com/r/subreddit/l234s3/thread-name";

    const LinkForm = () => {
      return (
        <form className="link-input" onSubmit={() => submitThread(link)}>
          <div className="link-input-text">Paste Reddit Thread here</div>
          <div className="link-text-input">
            <input
              type="text"
              placeholder={defaultURL}
              value={link}
              onChange={(event) => {
                setLink(event.target.value);
              }}
              required
              autoFocus
            />
          </div>
          <div className="link-submit" tabIndex="-1">
            <input type="submit" />
          </div>
        </form>
      );
    };

    return (
      <div className="addRTC">
        <LinkForm></LinkForm>
      </div>
    );
  };

  const handleDelete = (threadId) => {
    setThreadIds(threadIds.filter((x) => x.id !== threadId));
  };

  const handleAdd = (b) => {
    setAdd(b);
  };

  return (
    <div className="RTCWrapper">
      {threadIds.length > 0 ? (
        <div className="RedditTwitchChats">
          <>
            {threadIds.map((threadId, index) => (
              <RedditTwitchChat
                ref={threadId.ref}
                key={index}
                threadId={threadId.id}
                onDelete={handleDelete}
                onAdd={handleAdd}
              />
            ))}
            {add && threadIds.length < 2 ? <AddRTC /> : null}
          </>
        </div>
      ) : (
        <AddRTC />
      )}
    </div>
  );
};

export default RTCWrapper;
