import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { analyzeNewsWithAI } from "../utils/openRouter";
import { addToHistory } from "../redux/historySlice";
import { parseAIResponse } from "../utils/parseAIResponse";

function NewsInput() {
  const [headline, setHeadline] = useState("");
  const [article, setArticle] = useState("");
  const [showArticleInput, setShowArticleInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!headline.trim() && !article.trim()) return;

    const userInput = `${headline} \n\n${article}`;
    setLoading(true);
    try {
      const aiText = await analyzeNewsWithAI(userInput);
      console.log(aiText)
      const { result, confidence, explanation } = parseAIResponse(aiText);

      const historyItem = {
        id: uuidv4(),
        news: userInput.trim(),
        result,
        confidence,
        explanation,
        createdAt: new Date().toISOString(),
        feedback: { aiCorrect: null, userCorrection: "" },
      };
      dispatch(addToHistory(historyItem));
      setHeadline("");
      setArticle("");
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-4"
    >
      <textarea
        rows={3}
        placeholder="Paste news headline or short summary..."
        className="w-full md:w-[600px] p-4 rounded-xl bg-[#1a1a1d] text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder-gray-500"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
      />

      {showArticleInput && (
        <textarea
          rows={6}
          placeholder="Paste full article (optional)"
          className="w-full md:w-[600px] p-4 rounded-xl bg-[#1a1a1d] text-white border border-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none placeholder-gray-500"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        />
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setShowArticleInput(!showArticleInput)}
          className="text-sm text-purple-400 underline hover:text-purple-200"
        >
          {showArticleInput ? "Remove article" : "Add full article"}
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Analyzing..." : "Check Authenticity"}
        </button>
      </div>
    </form>
  );
}

export default NewsInput;
