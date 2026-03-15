import { aiClient } from "../config/aiConfig.js";

export const getFiltersFromAI = async (description) => {
    const response = await aiClient.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
            {
                role: "system",
                content: `
Convert a movie description into filters.

Return JSON:
{
 "genres": [],
 "yearFrom": null,
 "yearTo": null,
 "rating": null,
 "language": "any"
}
`,
            },
            {
                role: "user",
                content: description,
            },
        ],
    });

    return JSON.parse(response.choices[0].message.content);
};