import { GoogleGenAI } from "@google/genai";

export const generateSmileMakeover = async (base64Image: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API Key یافت نشد. لطفاً process.env.API_KEY را تنظیم کنید.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // استخراج فرمت و دیتای تصویر از رشته Base64
    const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("فرمت تصویر نامعتبر است.");
    }
    const mimeType = matches[1];
    const data = matches[2];

    // ارسال درخواست به مدل ویرایش تصویر جمینای
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: data
            }
          },
          {
            text: "Edit this photo to give the person a perfect Hollywood smile with bright white ceramic veneers. Ensure realistic skin texture, professional lighting, and highly detailed lips and gums. The result should be photorealistic and maintain the original face identity."
          }
        ]
      }
    });

    // استخراج تصویر تولید شده از پاسخ
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            // مدل معمولاً تصویر را به صورت inlineData برمی‌گرداند
            if (part.inlineData && part.inlineData.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }

    throw new Error("تصویری توسط هوش مصنوعی تولید نشد.");

  } catch (error) {
    console.error("Gemini Service Error:", error);
    // بازگرداندن خطای خوانا برای کاربر
    throw error;
  }
};