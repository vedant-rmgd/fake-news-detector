import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFeedback } from "../redux/historySlice";

function ResultCard({ resultData, onFeedbackComplete }) {
  const dispatch = useDispatch();
  const { id, result, confidence, explanation, createdAt } = resultData;
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [aiCorrect, setAiCorrect] = useState(null);
  const [userCorrection, setUserCorrection] = useState("");

  const handleFeedback = (correct) => {
    setAiCorrect(correct);
    if (correct) {
      dispatch(
        updateFeedback({
          id,
          feedback: { aiCorrect: true, userCorrection: "" },
        })
      );
      setFeedbackGiven(true);
      onFeedbackComplete();
    }
  };

  const handleSubmitFeedback = () => {
    dispatch(
      updateFeedback({
        id,
        feedback: { aiCorrect: false, userCorrection: userCorrection.trim() },
      })
    );
    setFeedbackGiven(true);
    onFeedbackComplete();
  };

  return (
    <div className="bg-[#121212] text-white px-4 sm:px-8 py-8 rounded-xl shadow-md border border-neutral-700 w-full max-w-4xl mx-auto mt-8 font-sans">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">
          Fact Check
        </h2>
      </div>

      <div className="space-y-6">
        <div className="text-left">
          <p className="text-lg sm:text-xl font-medium">
            Result:{" "}
            <span
              className={`font-semibold ${
                result === "Fake"
                  ? "text-red-500"
                  : result === "Real"
                  ? "text-green-500"
                  : "text-yellow-400"
              }`}
            >
              {result}
            </span>
          </p>
        </div>

        <div className="text-left">
          <p className="text-lg sm:text-xl font-medium mb-2">Confidence: </p>
          <div className="flex items-center gap-4">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-300"
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-sm sm:text-md font-medium text-gray-400 whitespace-nowrap">
              {confidence}%
            </span>
          </div>
        </div>

        <div className="text-left">
          <p className="text-lg sm:text-xl font-medium mb-2">Explanation:</p>
          <div className="text-gray-300 leading-relaxed text-[15px] whitespace-pre-line">
            {explanation}
          </div>
        </div>
      </div>

      {!feedbackGiven && (
        <div className="mt-10 space-y-4 text-center">
          <p className="text-sm text-gray-400">Was the AI correct?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleFeedback(true)}
              className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-green-600/10 border border-gray-700 hover:border-green-500 text-sm text-white transition-all"
            >
              ✅ AI Got It Right
            </button>
            <button
              onClick={() => handleFeedback(false)}
              className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-red-600/10 border border-gray-700 hover:border-red-500 text-sm text-white transition-all"
            >
              ❌ AI Got It Wrong
            </button>
          </div>

          {aiCorrect === false && (
            <div className="text-left mt-4">
              <textarea
                className="w-full p-3 rounded-lg bg-neutral-900 text-white border border-gray-700 focus:outline-none focus:border-white transition"
                rows={3}
                placeholder="Optional: Write the correct information..."
                value={userCorrection}
                onChange={(e) => setUserCorrection(e.target.value)}
              />
              {userCorrection.trim() && (
                <button
                  onClick={handleSubmitFeedback}
                  className="mt-2 px-4 py-2 bg-white text-black rounded-full font-medium hover:shadow-md transition"
                >
                  Submit Feedback
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultCard;
