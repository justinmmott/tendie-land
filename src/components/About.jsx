import "./../css/About.css";

const About = () => {
  return (
    <div className="about">
      <h4>About</h4>
      <h5>Motivation</h5>
      <p>
        I created Tendie Land for the purpose of reading the daily discussions
        on stock subreddits. These daily discussions update often and even with
        a auto-refresh extension I found it annoying to have to watch the page
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
        limit on the number of request you can make in a certain time period.
        Because of this I can only refresh the comments so often. Also, you will
        only be able to see a subset of comments on the thread. The comments
        will be the same as if you had loaded a thread and never clicked "view
        more." This can be overcome, but will require more calls to the API. I'm
        waiting till I get usage statistics before determining how much I can
        load. The list of known bugs is in a public post on my{" "}
        <a
          href="https://www.patreon.com/jmott"
          target="_blank"
          rel="noreferrer"
        >
          Patreon
        </a>
        .
      </p>
      <br />
      <p>Tendie land was created by Justin Mott</p>
    </div>
  );
};

export default About;
