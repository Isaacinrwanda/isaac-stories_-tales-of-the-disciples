
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a story about a disciple for a specific audience and in a specific language.
 * @param discipleName The name of the disciple.
 * @param language The target language for the story.
 * @param audience The target audience (e.g., "Youth", "Adult").
 * @returns A promise that resolves to the generated story text.
 */
export async function generateStory(
  discipleName: string,
  language: string,
  audience: string
): Promise<string> {
  const prompt = `
    You are a master storyteller specializing in biblical narratives. Your task is to write an engaging, inspiring, and theologically sound story about the disciple ${discipleName}.

    The story MUST be tailored for a "${audience}" audience.
    - For "Youth", use simple, clear language, shorter sentences, and focus on action, courage, and clear moral lessons. Make it feel like an adventure.
    - For "Young Adult", use more nuanced language, explore the disciple's emotional depth, internal struggles, and faith journey. Connect the story to timeless challenges of identity and purpose.
    - For "Adult", you can use sophisticated language, delve into deeper theological concepts, and explore the complex historical, cultural, and personal contexts of the disciple's life and ministry.

    The entire story, and nothing else, MUST be written in the ${language} language.

    Do not include any preambles, introductions, titles, or postscripts like "Here is the story..." or "I hope you enjoyed this story." Just provide the story text directly.
    The story should be well-structured, captivating, and historically plausible within the context of the Gospels and early Christian tradition.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
      },
    });

    if (!response.text) {
        throw new Error("The API returned an empty response.");
    }

    return response.text;
  } catch (error) {
    console.error("Error generating story from Gemini API:", error);
    throw new Error("Failed to communicate with the storytelling AI. Please try again later.");
  }
}
