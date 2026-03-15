import { aiClient } from "../config/aiConfig.js";

export const getFiltersFromAI = async (description) => {
    const response = await aiClient.chat.completions.create({
        model: "llama-3.1-8b-instant",

        response_format: { type: "json_object" }, // important

        messages: [
            {
                role: "system",
                content: `
You are a movie filter generator.

Your job is to convert a natural language movie description into search filters.

Return ONLY valid JSON. Do NOT include explanations, text, or markdown.

Output format:
{
 "genres": [],
 "yearFrom": null,
 "yearTo": null,
 "rating": null,
 "language": "any"
}

Rules:
- genres must contain TMDB genre IDs only
- maximum 3 genres
- if no genre is mentioned return []
- rating must be between 1 and 10
- yearFrom and yearTo must be numbers or null
- language must be a 2-letter ISO code or "any"

TMDB Genre Mapping:
Action = 28
Adventure = 12
Animation = 16
Comedy = 35
Crime = 80
Documentary = 99
Drama = 18
Family = 10751
Fantasy = 14
History = 36
Horror = 27
Music = 10402
Mystery = 9648
Romance = 10749
Science Fiction = 878
TV Movie = 10770
Thriller = 53
War = 10752
Western = 37

Interpretation rules:
- "recent", "new", "modern" → yearFrom 2015
- "old", "classic" → yearTo 2000
- "90s" → yearFrom 1990, yearTo 1999
- "2000s" → yearFrom 2000, yearTo 2009
- "highly rated", "good rating" → rating 7
- "top rated", "very good" → rating 8

Language examples:
English → "en"
Hindi → "hi"
Korean → "ko"
Japanese → "ja"
Spanish → "es"

Return ONLY JSON.
`
            },
            {
                role: "user",
                content: description
            }
        ]
    });
    console.log(response.choices, 'response in ai service');

    return JSON.parse(response.choices[0].message.content);
};