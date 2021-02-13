import { useState } from "react";

import "./../../css/rtc/AddRTC.css";

const AddRTC = ({ onSubmitThread }) => {
  const [link, setLink] = useState("");

  const defaultURL = "https://www.reddit.com/r/subreddit/l234s3/thread-name";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitThread(link);
  };

  const LinkForm = () => {
    return (
      <form className="link-input" onSubmit={handleSubmit}>
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
    <div className="addRTC-wrapper">
      <div className="addRTC">
        <LinkForm></LinkForm>
      </div>
    </div>
  );
};

export default AddRTC;
