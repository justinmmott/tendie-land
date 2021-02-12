import React, { useEffect, useState, useRef, createRef } from "react";
import matchAll from "match-all";
import ls from "local-storage";

import RTCWrapper from "./RTCWrapper";
import useInterval from "./hooks/Interval";
import AddRTC from "./AddRTC";

import "./../css/Home.css";

const Home = () => {
  const [threadIds, setThreadIds] = useState([]);
  const [add, setAdd] = useState(false);
  const index = useRef(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      setThreadIds(ls.get("threadIds") || []);
      first.current = false;
    }
    ls.set("threadIds", threadIds);
  }, [threadIds]);

  useInterval(() => {
    if (threadIds.length > 0) {
      if (index.current + 1 < threadIds.length) index.current++;
      else index.current = 0;
      threadIds[index.current].ref.current?.refresh();
    }
  }, 2000);

  const handleSubmitThread = (threadLink) => {
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

  const handleDelete = (threadId) => {
    setThreadIds(threadIds.filter((x) => x.id !== threadId));
  };

  const handleAdd = (b) => {
    setAdd(b);
  };

  return (
    <div className="Home">
      {threadIds.length > 0 ? (
        <div className="RTCWrappers">
          <>
            {threadIds.map((threadId, index) => (
              <RTCWrapper
                key={index}
                ref={threadId.ref}
                threadId={threadId.id}
                onDelete={handleDelete}
                onAdd={handleAdd}
              />
            ))}
            {add && threadIds.length < 2 ? (
              <AddRTC onSubmitThread={handleSubmitThread} />
            ) : null}
          </>
        </div>
      ) : (
        <AddRTC onSubmitThread={handleSubmitThread}/>
      )}
    </div>
  );
};

export default Home;
