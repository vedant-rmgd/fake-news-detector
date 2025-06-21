import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { analyzeNewsWithAI } from "../utils/openRouter";
import { addToHistory } from "../redux/historySlice";
import { parseAIResponse } from "../utils/parseAIResponse";

function NewsInput({
  setIsTyping,
  setLoading,
  loading,
  onAgainNewsSearch,
  onSubmitComplete,
}) {
  const [headline, setHeadline] = useState("");
  const [article, setArticle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!headline.trim() || !article.trim()) return;
    const userInput = `${headline.trim()}\n\n${article.trim()}`;
    setLoading(true);
    setIsTyping(false);

    try {
      const aiText = await analyzeNewsWithAI(userInput);
      const { result, confidence, explanation } = parseAIResponse(aiText);

      const historyItem = {
        id: uuidv4(),
        news: userInput,
        result,
        confidence,
        explanation,
        createdAt: new Date().toISOString(),
        feedback: { aiCorrect: null, userCorrection: "" },
      };

      dispatch(addToHistory(historyItem));
      onSubmitComplete();
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
      className="w-full flex flex-col items-center gap-5 px-4 "
    >
      <textarea
        rows={3}
        required
        placeholder="Paste headline or summary..."
        className="w-full max-w-2xl p-4 rounded-xl bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 placeholder-gray-500 resize-none transition hide-scrollbar"
        value={headline}
        onChange={(e) => {
          setHeadline(e.target.value);
          setIsTyping(true);
        }}
      />

      <textarea
        rows={6}
        required
        placeholder="Paste full article (required)"
        className="w-full max-w-2xl p-4 rounded-xl bg-[#1f1f1f] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white/10 placeholder-gray-500 resize-none transition hide-scrollbar"
        value={article}
        onChange={(e) => {
          setArticle(e.target.value);
          setIsTyping(true);
        }}
      />

      <button
        type="submit"
        onClick={() => onAgainNewsSearch()}
        disabled={loading}
        className={`px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all shadow-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Analyzing..." : "Check Authenticity"}
      </button>
    </form>
  );
}

export default NewsInput;
