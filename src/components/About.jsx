import "./../css/About.css";

const About = () => {
  return (
    <div className="about">
      <h4>About</h4>
      <h5>Motivation</h5>
      <p>
        I created Tendie Land for the purpose of reading the daily discussions
        on stock subreddits. These daily discussions update often and even with
        a auto-refresh extension, I found it annoying to have to watch the page
        refresh before I could see the comments.
      </p>
      <h5>Functionality</h5>
      <p>
        The main use case for Tendie Land is to turn any Reddit thread into a
        live chat. While Reddit does have live chats, their normal discussions
        are not able to do the same. Tendie Land also allows you to watch
        multiple(currently the max is 2 this should be increased in the future)
        threads at once. Additional functionality can be suggested through my{" "}
        <a
          href="https://www.patreon.com/jmott"
          target="_blank"
          rel="noreferrer"
        >
          Patreon
        </a>
        .
      </p>
      <h5>Limitations</h5>
      <p>
        The main limiting factor for Tendie Land is that the Reddit API has a
        limit on the number of requests you can make in a certain time period.
        Because of this, I can only refresh the comments so often. Also, you
        will only be able to see a subset of comments on the thread. The
        comments will be the same as if you had loaded a thread and never
        clicked "view more." This can be overcome but will require more calls to
        the API. I'm waiting till I get usage statistics before determining how
        much I can load. The list of known bugs is in a public post on my{" "}
        <a
          href="https://github.com/reddit-archive/reddit/wiki/API"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <h5>Security</h5>
      <p>
        Unfortunately, Reddit's API requires that I authenticate with a user to
        be able to make calls. So, I require people to log in. You can read more
        about it{" "}
        <a
          href="https://www.patreon.com/jmott"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        . All of the api calls are done client-side, aka in your browser. You
        can look at the networks tab in your browser's inspector to verify this.
        <br />
        <br />
        However, it ultimately comes down to if you trust me, a total stranger.
        Given that I'll explain my ethos and hopefully that'll give you enough
        peace of mind. I hate ads and what they do. They make a webpage look
        like shit and use your info to cater to you. So, I won't be showing ads
        ever or selling off anyone's info to make ads target them more
        accurately. Also, to store your info would cost money and I built this
        in a way that minimizes the cost to me, so fuck that. I don't care if I
        make money off of this, really I just want to go net 0. If people want
        to donate that's amazing, but I want it to be free for everybody since I
        think it is useful.
        <br />
        <br />
        Finally, saying all that you could also try it out on a throwaway. Just
        need a Reddit account to be able to call the API, so doesn't matter
        which one. But, the commenting feature will be using the account you
        signed in on.
      </p>
      <br />
      <p>Tendie land was created by Justin Mott</p>
    </div>
  );
};

export default About;
