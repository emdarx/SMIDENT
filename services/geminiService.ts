import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmileMakeover = async (base64Image: string): Promise<string> => {
  try {
    // Strip header if present (e.g., "data:image/jpeg;base64,")
    const base64Data = base64Image.includes(',') 
      ? base64Image.split(',')[1] 
      : base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Data
            }
          },
          {
            text: "Edit this image. Keep the face, skin, lips, gums and lighting exactly as they are. DO NOT change the face structure. Only modify the teeth to look like high-end, bright white, perfectly shaped ceramic veneers (Hollywood smile). The teeth should look realistic but cosmetically perfect."
          }
        ]
      }
    });

    // Check for inline data (image) response with safe optional chaining
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    }
    
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};