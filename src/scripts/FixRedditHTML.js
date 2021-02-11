const FixRedditHTML = (body) => {
  let addBRbeforeP = /^<p>/gm;
  body = body.replace(addBRbeforeP, () => "<br/><p>");
  let addBrbeforeEndP = /<\/?p>\n\n/gm;
  body = body.replace(addBrbeforeEndP, () => "<br/></p>");
  let previewImage = /((<a href=)("https:\/\/preview.redd.it\/[\w.?=&;]*?")(>))(.*?)(<\/a>)/gm;
  body = body.replace(
    previewImage,
      "<div style=\"text-align: center\";>\n$1 \n" +
      "<img src=$3 style=\"object-fit: cover;width: 100%;\"/>" +
      "\n$6\n<p>$5</p></div>"
  );
  let openNewTab = /(<a href=".*?")/gm;
  body = body.replace(openNewTab, "$1 target=\"_blank\"");
  let messages = /(<a href=")(\/.*?")/gm;
  body = body.replace(messages, "$1https://www.reddit.com$2");
  return body;
};

export default FixRedditHTML;
