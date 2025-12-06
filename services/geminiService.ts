import { GoogleGenAI } from "@google/genai";
import { ServiceType } from "../types";

export const generateBeautyMakeover = async (base64Image: string, serviceType: ServiceType): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("کلید API یافت نشد. لطفاً process.env.API_KEY را تنظیم کنید.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // استخراج فرمت و دیتای تصویر از رشته Base64
    const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("فرمت تصویر نامعتبر است.");
    }
    const mimeType = matches[1];
    const data = matches[2];

    let prompt = "";
    
    // انتخاب پرامپت بر اساس سرویس انتخاب شده
    switch (serviceType) {
      case 'DENTAL':
        prompt = "Edit this photo to give the person a perfect Hollywood smile with bright white ceramic veneers. Ensure realistic teeth texture, professional lighting, and highly detailed lips and gums. Keep the original face identity, eyes, nose, and skin texture exactly as they are. Only modify the teeth.";
        break;
      case 'FILLER':
        prompt = "Edit this photo to apply aesthetic cheek fillers (volumetric augmentation) to the person. Define the cheekbones naturally and add youthful volume to the mid-face. The result should look like a professional aesthetic medical procedure. maintain the original eyes, nose, lips and overall face identity perfectly. Photorealistic result.";
        break;
      case 'LIFT':
        prompt = "Edit this photo to apply a temporal eyebrow lift (fox eye look) to the person. Lift the tails of the eyebrows upwards and slightly outwards for a rejuvenated, attractive look. Smooth the forehead slightly. Maintain the original eye color, nose, and mouth exactly. The result must be photorealistic.";
        break;
      default:
        prompt = "Enhance the beauty of this face while keeping it realistic.";
    }

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
            text: prompt
          }
        ]
      }
    });

    // استخراج تصویر تولید شده از پاسخ
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
    }

    throw new Error("تصویری توسط هوش مصنوعی تولید نشد.");

  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};