import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

import RedditOAuth from "./RedditOAuth";
import Home from "./Home";
import About from "./About";
import bitcoin from "./../Bitcoin.svg.png";
import Tooltip from "./misc/Tooltip";

import "./../css/App.css";

const App = () => {
  const [shared, setShared] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setTimeout(() => {
      !cancelled && setShared(false);
    }, 1500);
    return () => {
      cancelled = true;
    };
  }, [shared]);

  function getURLPath() {
    const url = new URL(document.URL);
    return url.pathname;
  }

  return (
    <div className="App">
      <header className="App-header">
        {getURLPath() === "/login" ? (
          <RedditOAuth />
        ) : getURLPath() === "/about" ? (
          <About />
        ) : (
          <Home />
        )}
        <div className="donation">
          {getURLPath() !== "/about" ? (
            <a href="/about">About</a>
          ) : (
            <a href="/">Home</a>
          )}{" "}
          | Please consider supporting through{" "}
          <a
            href="https://www.patreon.com/jmott"
            target="_blank"
            rel="noreferrer"
          >
            Patreon
          </a>{" "}
          or with{"  "}
          <Tooltip
            content="Wallet address copied to clipboard"
            direction="top"
            shared={shared}
          >
            <img
              src={bitcoin}
              alt="bitcoin"
              height="15"
              onClick={() => {
                setShared(true);
                copy("36cvdB3Qbt4RcbtLmsVCLorYXbEaMyo6Xr");
              }}
            />
          </Tooltip>
        </div>
      </header>
    </div>
  );
};

export default App;
