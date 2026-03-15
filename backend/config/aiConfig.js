import Groq from "groq-sdk";

export const aiClient = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});