// export function parseAIResponse(text) {
//   const resultMatch = text.match(/Result:\s*(.*)/i);
//   const confidenceMatch = text.match(/Confidence:\s*(\d+)/i);
//   const explanationMatch = text.match(/Explanation:\s*([\s\S]*)/i);

//   return {
//     result: resultMatch?.[1]?.trim() || "Uncertain",
//     confidence: parseInt(confidenceMatch?.[1]) || 0,
//     explanation: explanationMatch?.[1]?.trim() || "No explanation provided."
//   };
// }

export function parseAIResponse(aiText) {
  // Ensure aiText is a string
  if (typeof aiText !== "string") {
    console.error("AI response is not a string:", aiText);
    return { result: "Uncertain", confidence: 0, explanation: "" };
  }

  // Regular expressions for extracting details
  const resultMatch = aiText.match(/Result:\s*(Fake|Real|Uncertain)/);
  const confidenceMatch = aiText.match(/Confidence:\s*(\d+)/);
  const explanationMatch = aiText.match(/Explanation:\s*(.*)/);

  // const result = resultMatch ? resultMatch[1] : "Uncertain";
  // const confidence = confidenceMatch ? parseInt(confidenceMatch[1], 10) : 0;
  // const explanation = explanationMatch ? explanationMatch[1] : "";

  const parsed = {
    result : resultMatch ? resultMatch[1] : "Uncertain",
    confidence : confidenceMatch ? parseInt(confidenceMatch[1], 10) : 0,
    explanation : explanationMatch ? explanationMatch[1] : "",

  }

  console.log("Parsed AI response object:", parsed);

  // return {
  //   result,
  //   confidence,
  //   explanation,
  // };

  return parsed
}
