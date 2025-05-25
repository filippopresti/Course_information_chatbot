// server/embeddings.js
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { readFile } from "fs/promises";
import path from "path";

// 1) Configure your embeddings model
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

// 2) Initialize (or connect to) your Postgres-backed vector store
export const vectorStore = await PGVectorStore.initialize(embeddings, {
  postgresConnectionOptions: {
    connectionString: process.env.DB_URL,
  },
  tableName: "courses", // ← use a courses-specific table
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
  distanceStrategy: "cosine",
});

// 3) Load your scraped JSON and add it in chunks
export async function addCoursesToVectorStore() {
  // 3a) Read the file you wrote from scraper.js
  const filePath = path.resolve("data", "courses.json");
  const raw = await readFile(filePath, "utf-8");
  const records = /** @type {{url:string, scrapedAt:string, text:string}[]} */ (
    JSON.parse(raw)
  );

  // 3b) For each page, wrap it as a Document with metadata
  const docs = records.flatMap((rec) => {
    return new Document({
      pageContent: rec.text,
      metadata: {
        url: rec.url,
        scrapedAt: rec.scrapedAt,
      },
    });
  });

  // 3c) Split into chunks of ~1000 characters with 200‐char overlap
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunks = await splitter.splitDocuments(docs);

  // 3d) Persist into Postgres
  await vectorStore.addDocuments(chunks);

  console.log(`Indexed ${chunks.length} course-page chunks`);
}
