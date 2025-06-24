import NewsInput from "../components/NewsInput";
import ResultCard from "../components/ResultCard";
import HistorySidebar from "../components/HistorySidebar";
import { useSelector } from "react-redux";
import { useState } from "react";

function Home() {
  const history = useSelector((state) => state.history.history);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const latestNews = history[0];

  const shouldShowResult = !loading && !isTyping && showResult && latestNews;

  const handleNewNewsSubmit = () => {
    setShowResult(false);
  };

  const handleFeedbackComplete = () => {
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex flex-col sm:flex-row">
      <HistorySidebar />

      <div className="flex-1 sm:ml-72 px-4 sm:px-6 py-6">
        <main className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-semibold mb-4">
            Uncover fake news in seconds with
          </h1>
          <span className="text-2xl sm:text-4xl md:text-5xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-bold mb-6">
            TruthCheck AI
          </span>

          <NewsInput
            setIsTyping={setIsTyping}
            setLoading={setLoading}
            onAgainNewsSearch={() => handleNewNewsSubmit(false)}
            loading={loading}
            onSubmitComplete={() => setShowResult(true)}
          />

          {shouldShowResult && (
            <ResultCard
              resultData={latestNews}
              onFeedbackComplete={handleFeedbackComplete}
            />
          )}
        </main>
        <p className="text-xs text-gray-400 text-center mt-4 italic">
          ⚠️ AI may not always be correct. Please verify news from reliable
          sources.
        </p>
      </div>
    </div>
  );
}

export default Home;
