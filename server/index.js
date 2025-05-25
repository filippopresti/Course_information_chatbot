// // server/index.js
import express from "express";
import cors from "cors";
import { agent } from "./agent.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/generate", async (req, res) => {
  try {
    const { query, thread_id } = req.body;

    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid `query` in request body." });
    }

    console.log("Query:", query, "thread_id:", thread_id);

    // Invoke a single-turn chat with your agent (only thread_id is configurable)
    const results = await agent.invoke(
      {
        messages: [{ role: "user", content: query }],
      },
      { configurable: { thread_id } }
    );

    const answer = results.messages.at(-1)?.content;
    console.log("Answer:", answer);

    res.json({ answer });
  } catch (err) {
    console.error("Error in /generate:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// server/index.js
// // server/index.js
// import express from "express";
// import cors from "cors";
// import { retrieveCourse, llm } from "./agent.js";

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors());

// app.get("/", (_req, res) => {
//   res.send("Hello World!");
// });

// app.post("/generate", async (req, res) => {
//   const { query, thread_id } = req.body;
//   if (!query) {
//     return res.status(400).json({ error: "Missing `query` in request body" });
//   }
//   console.log("User query:", query, "Thread ID:", thread_id);

//   try {
//     // 1) pull the top-k relevant chunks
//     const snippets = await retrieveCourse.call({ query });
//     console.log("Retrieved snippets:", snippets);

//     // 2) build a simple chat history with plain objects
//     const messages = [
//       {
//         role: "system",
//         content:
//           "You are a helpful assistant. Answer *only* from the provided context. " +
//           'If the answer is not in the context, reply: "Sorry, I don\'t have that information."',
//       },
//       { role: "system", content: snippets },
//       { role: "user", content: query },
//     ];

//     // 3) invoke your Anthropic model
//     const convo = await llm.invoke(
//       { messages },
//       { configurable: { thread_id } }
//     );

//     const answer = convo.messages.at(-1)?.content;
//     if (!answer) throw new Error("Agent returned no answer");

//     console.log("Final answer:", answer);
//     res.json({ answer });
//   } catch (err) {
//     console.error("Error in /generate:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// below working version
// server/agent.js
// server/index.js
// import express from "express";
// import cors from "cors";
// import { retrieveCourse, llm } from "./agent.js";

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cors());

// app.get("/", (_req, res) => {
//   res.send("Hello World!");
// });

// app.post("/generate", async (req, res) => {
//   const { query, thread_id } = req.body;
//   if (!query) {
//     return res.status(400).json({ error: "Missing `query` in request body" });
//   }
//   console.log("User query:", query, "Thread ID:", thread_id);

//   try {
//     // 1) pull the top‐k relevant chunks
//     const snippets = await retrieveCourse.call({ query });
//     console.log("Retrieved snippets:", snippets);

//     // 2) build your prompt
//     const messages = [
//       {
//         role: "system",
//         content:
//           "You are a helpful assistant. Answer *only* using the provided context. " +
//           'If the answer is not contained in the context, reply: "Sorry, I don\'t have that information."',
//       },
//       {
//         role: "assistant",
//         content: snippets,
//       },
//       {
//         role: "user",
//         content: query,
//       },
//     ];

//     // 3) call Anthropic and get back a simple string
//     const answer = await llm.call(messages, {
//       configurable: { thread_id },
//     });

//     console.log("Final answer:", answer);
//     console.log("HERE:", answer.messages.at(-1)?.content);
//     return res.json({ answer });
//   } catch (err) {
//     console.error("Error in /generate:", err);
//     return res.status(500).json({ error: err.message });
//   }
// });

// // ← don’t forget to actually start the server!
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
