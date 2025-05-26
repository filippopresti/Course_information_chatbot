// // server/agent.js
// import { ChatAnthropic } from "@langchain/anthropic";
// import { createReactAgent } from "@langchain/langgraph/prebuilt";
// import { tool } from "@langchain/core/tools";
// import { z } from "zod";
// import { MemorySaver } from "@langchain/langgraph";

// // Just import the vector store (already seeded via your ingestion script)
// import { vectorStore } from "./embeddings.js";

// // This tool now only takes a `query` string and searches ALL pages
// export const retrieveCourse = tool(
//   async ({ query }) => {
//     // Top-3 most similar chunks across your entire course dataset
//     const results = await vectorStore.similaritySearch(query, 3);

//     return results
//       .map((doc) => `From ${doc.metadata.url}:\n${doc.pageContent}`)
//       .join("\n\n---\n\n");
//   },
//   {
//     name: "retrieveCourse",
//     description:
//       "Fetch the most relevant text snippets from all scraped ual Creative Computing Institute pages.",
//     schema: z.object({
//       query: z
//         .string()
//         .describe(
//           "Your question about courses, admissions, fees, or any ual Creative Computing Institute info"
//         ),
//     }),
//   }
// );

// export const llm = new ChatAnthropic({ modelName: "claude-3-7-sonnet-latest" });
// const memorySaver = new MemorySaver();

// export const agent = createReactAgent({
//   llm,
//   tools: [retrieveCourse],
//   checkpointer: memorySaver,
// });

import { ChatAnthropic } from "@langchain/anthropic";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { MemorySaver } from "@langchain/langgraph";

// import your pre-seeded vector store
import { vectorStore } from "./embeddings.js";

export const retrieveCourse = tool(
  async ({ query }) => {
    const results = await vectorStore.similaritySearch(query, 3);
    return results
      .map((doc) => `From ${doc.metadata.url}:\n${doc.pageContent}`)
      .join("\n\n---\n\n");
  },
  {
    name: "retrieveCourse",
    description:
      "Fetch the most relevant text snippets from all scraped UAL Creative Computing Institute (CCI) pages.",
    schema: z.object({
      query: z
        .string()
        .describe("Your question about CCI courses, admissions, fees, etc."),
    }),
  }
);

export const llm = new ChatAnthropic({
  modelName: "claude-3-7-sonnet-latest",
});

// optional: add a global “system” prefix to every turn
const memorySaver = new MemorySaver();
// export const agent = createReactAgent({
//   llm,
//   tools: [retrieveCourse],
//   checkpointer: memorySaver,
//   agentOptions: {
//     promptPrefix: `
// You are the University of the Arts London (UAL) Creative Computing Institute (CCI) assistant.
// – Always answer *only* from the provided snippets.
// – If the answer is not in the context, say “Sorry, I don’t have that information.”
// – Be concise, friendly, and professional.
//     `.trim(),
//   },
// });
export const agent = createReactAgent({
  llm,
  tools: [retrieveCourse],
  checkpointer: memorySaver,
  agentOptions: {
    promptPrefix: `
You are the UAL Creative Computing Institute (also known as CCI) assistant.
Answer *only* from the provided context snippets.
If the answer is not in the context, say “Sorry, I don’t have that information.”
Be concise, friendly, and professional.
    `.trim(),
  },
});
