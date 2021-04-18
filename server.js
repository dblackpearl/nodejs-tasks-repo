const http = require("http");
const { writeFile } = require("fs/promises");

http
  .get("http://jsonplaceholder.typicode.com/posts", (res) => {
    console.log("statusCode:", res.statusCode);
    console.log("headers:", res.headers["content-type"]);

    let rawData = "";
    res
      .on("data", (d) => {
        // process.stdout.write(d);
        rawData += d;
      })
      .on("end", () => {
        try {
          writeFile("./results/posts.json", rawData);
        } catch (err) {
          // When a request is aborted - err is an AbortError
          console.error(err);
        }
      });
  })
  .on("error", (e) => {
    console.error(e);
  });
