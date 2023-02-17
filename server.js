import * as dotenv from "dotenv"; // allows the usage of the variables in the .env file
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI, // Provide credentials to OpenAI SDK
});

const openai = new OpenAIApi(configuration); // Initialize SDK

import express from "express";
import cors from "cors"; // cross origin resrouce sharing

const app = express();
app.use(cors());
app.use(express.json()); // Let's API that we want to use JSON format

// First Endpoint
app.post("/dream", async (req, res) => {
  const prompt = req.body.prompt; // the prompt entered by user

  const aiResponse = await openai.createImage({
    // pass the user's prompt to OpenAI, which returns a single image with the specified dimensions
    prompt,
    n: 1,
    size: "1024x1024",
  });

  const image = aiResponse.data.data[0].url; // Repsonse object from request, that contains the image URL
  res.send({ image }); // send the image URL back to the client
});

app.listen(8080, () => console.log("Make are on http://localhost:8080/dream")); // Launch server, on a specified port
