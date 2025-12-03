import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, you should handle API keys via a backend proxy to avoid exposure.
// However, for this frontend task demo using a build-time env var or similar is assumed context.
const apiKey = process.env.API_KEY || 'DEMO_KEY_DO_NOT_USE_IN_PROD'; 
const ai = new GoogleGenAI({ apiKey });

export interface AnalysisResult {
  eligible: boolean;
  score: number; // 0-100
  reasoning: string;
  recommendation: string;
}

export const checkEligibility = async (
  businessName: string,
  yearsInBusiness: string,
  industry: string,
  goal: string
): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
      // Mock response if no API key is present to prevent app crashing in demo mode
      console.warn("No API KEY found. Returning mock data.");
      return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
                eligible: true,
                score: 85,
                reasoning: "Based on your 3+ years in the fashion industry, you align perfectly with our target demographic.",
                recommendation: "You should apply immediately. Focus your application on your sustainable supply chain."
            });
          }, 2000);
      });
  }

  const prompt = `
    You are an expert business analyst for 'Compound Accelerator'. 
    
    Compound's Criteria:
    - Bootstrapped founders.
    - Consumer lifestyle brands (Fashion, Beauty, Wellness, Home, Food/Bev).
    - In business for at least 3 years.
    - Actively working on growth/scaling.
    - Physical products or DTC services.

    Analyze this applicant:
    - Name: ${businessName}
    - Years: ${yearsInBusiness}
    - Industry: ${industry}
    - Goal: ${goal}

    Return a JSON object analyzing if they are a good fit.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eligible: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER, description: "Fit score from 0 to 100" },
            reasoning: { type: Type.STRING },
            recommendation: { type: Type.STRING, description: "Specific advice for their application" }
          },
          required: ["eligible", "score", "reasoning", "recommendation"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini Analysis Failed", error);
    return {
      eligible: false,
      score: 0,
      reasoning: "We couldn't process your request at this time.",
      recommendation: "Please contact support manually."
    };
  }
};