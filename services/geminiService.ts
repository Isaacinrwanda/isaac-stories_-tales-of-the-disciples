
import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null;
let initializationError: Error | null = null;

try {
  // In a browser environment without a build step (like deploying to Google Sites),
  // `process.env.API_KEY` will be undefined. This check provides a clear error.
  if (typeof process === 'undefined' || typeof process.env === 'undefined' || !process.env.API_KEY) {
    throw new Error("Configuration Error: API_KEY is not set. The application cannot connect to the AI service. Please ensure the hosting environment provides the API_KEY.");
  }
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} catch (e) {
  initializationError = e instanceof Error ? e : new Error('An unknown initialization error occurred.');
  console.error("Fatal Error: Could not initialize Gemini Service.", initializationError);
  ai = null;
}

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
  if (initializationError || !ai) {
    throw new Error(`AI Service initialization failed: ${initializationError?.message}`);
  }

  const systemInstruction = `You are a master storyteller specializing in biblical narratives. Your task is to write an engaging, inspiring, and theologically sound story about the disciple specified in the prompt.

The story MUST be tailored for the specified audience:
- For "Youth", use simple, clear language, shorter sentences, and focus on action, courage, and clear moral lessons. Make it feel like an adventure.
- For "Young Adult", use more nuanced language, explore the disciple's emotional depth, internal struggles, and faith journey. Connect the story to timeless challenges of identity and purpose.
- For "Adult", you can use sophisticated language, delve into deeper theological concepts, and explore the complex historical, cultural, and personal contexts of the disciple's life and ministry.

The entire story, and nothing else, MUST be written in the requested language.

Do not include any preambles, introductions, titles, or postscripts like "Here is the story..." or "I hope you enjoyed this story." Just provide the story text directly.
The story should be well-structured, captivating, and historically plausible within the context of the Gospels and early Christian tradition.`;
  
  const prompt = `Write a story about the disciple ${discipleName}. The story should be for a "${audience}" audience and written in the ${language} language.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
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
