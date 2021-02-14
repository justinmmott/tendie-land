import { v4 as uuidv4 } from "uuid";

import { clientId, redirect_uri } from "../globals/globals";

import "./../css/RedditOAuth.css";

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
      <div className="EOA">
        I need you to sign in with Reddit to give Tendie Land the ability to be
        able to grab Reddit comments (Reddit's API limits calls to it on a per
        user basis). I'm also asking for permission to be able to proxy request
        through your account. Ex: upvoting, posting, etc. I will not be using it
        for any other purposes. <br /> <b>TLDR: Your Reddit account is safe.</b>
      </div>
      <button onClick={redditRedirect}>Sign-in with Reddit</button>
    </div>
  );
}

export default RedditOAuth;
