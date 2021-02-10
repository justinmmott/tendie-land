import { v4 as uuidv4 } from "uuid";

import { clientId, redirect_uri } from "../globals/globals";

const scope = "identity,edit,mysubreddits,read,report,save,submit,vote";

let state = uuidv4();

function RedditOAuth() {
  function redditRedirect() {
    window.location.href =
      `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code` +
      `&state=${state}&redirect_uri=${redirect_uri}&duration=permanent&scope=${scope}`;
  }

  return (
    <div className="RedditOAuth">
      <button onClick={redditRedirect}>Sign-in with Reddit</button>
    </div>
  );
}

export default RedditOAuth;
