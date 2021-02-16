import { v4 as uuidv4 } from "uuid";

import { clientId, redirect_uri } from "../globals/globals";

import "./../css/RedditOAuth.css";

const scope = "identity,read,submit,vote";

let state = uuidv4();

function RedditOAuth() {
  function redditRedirect() {
    window.location.href =
      `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code` +
      `&state=${state}&redirect_uri=${redirect_uri}&duration=permanent&scope=${scope}`;
  }

  return (
    <div className="RedditOAuth">
      <div className="EOA">
        Check out the <a href="/about">about</a> page for more information about logging on.
      </div>
      <button onClick={redditRedirect}>Sign-in with Reddit</button>
    </div>
  );
}

export default RedditOAuth;
