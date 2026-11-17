// A stand-in for the Resend API during E2E tests. The app under test sends emails here
// (via RESEND_API_URL), and tests read them back with GET /emails.
// A message containing "[fail]" gets a 500 response, to exercise the error path.
import { createServer } from "node:http";

const emails: unknown[] = [];

createServer((req, res) => {
  let body = "";
  req.on("data", (chunk: Buffer) => (body += chunk.toString()));
  req.on("end", () => {
    res.setHeader("Content-Type", "application/json");
    if (req.method === "POST" && req.url === "/emails") {
      if (body.includes("[fail]")) {
        res
          .writeHead(500)
          .end(JSON.stringify({ message: "Simulated failure" }));
        return;
      }
      emails.push(JSON.parse(body));
      res.end(JSON.stringify({ id: `email_${emails.length}` }));
    } else if (req.method === "GET" && req.url === "/emails") {
      res.end(JSON.stringify(emails));
    } else {
      res.writeHead(404).end("{}");
    }
  });
}).listen(Number(process.env.PORT ?? 3199));
