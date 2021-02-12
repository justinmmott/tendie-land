import RedditOAuth from "./RedditOAuth";
import Home from "./Home";

import "./../css/App.css";

const App = () => {
  function getURLPath() {
    const url = new URL(document.URL);
    return url.pathname;
  }

  return (
    <div className="App">
      <header className="App-header">
        {getURLPath() === "/login" ? <RedditOAuth /> : <Home />}
      </header>
    </div>
  );
};

export default App;
