const FixRedditHTML = (body) => {
  let r = /^<p>/gm;
  body = body.replace(r, () => "<br/><p>");
  r = /<\/?p>\n\n/gm;
  body = body.replace(r, () => "<br/></p>");
  return body;
};

export default FixRedditHTML;