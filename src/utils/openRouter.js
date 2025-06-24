const OPENROUTE_API_KEY = import.meta.env.VITE_OPENROUTE_API_KEY;
const OPENROUTE_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function analyzeNewsWithAI(userInput) {
  const messages = [
    {
      role: "system",
      content: `You're a fake news detection assistant. Respond strictly in this exact format only:
      Result: Fake / Real / Uncertain  
      Confidence: 0 - 100  
      Explanation: One short sentence — no markdown, no lists, no asterisks.Do NOT use bullet points, stars, or markdown symbols (*, #, etc).Your explanation should be direct.
      Make sure ALL fields are present. Do NOT skip Result, Confidence & Explaination. Always be concise.`,
    },
    {
      role: "user",
      content: `check this news for authenticity :\n\n${userInput}`,
    },
  ];

  const response = await fetch(OPENROUTE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTE_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://fake-news-detector-orcin.vercel.app/",
      "X-Title": "TruthCheck AI",
    },
    body: JSON.stringify({
      model: "google/gemma-2-9b-it:free",
      messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response from OpenRouter:", errorText);
    throw new Error("OpenRouter API request failed");
  }

  const data = await response.json();
  const aiText = data?.choices?.[0]?.message?.content || "";

  return aiText;
}
