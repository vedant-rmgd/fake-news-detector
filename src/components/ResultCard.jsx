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
      // Directly submit feedback without asking for correction
      dispatch(
        updateFeedback({
          id,
          feedback: { aiCorrect: true, userCorrection: "" },
        })
      );
      setFeedbackGiven(true); // ✅ Hide form
      onFeedbackComplete()
    }
  };

  const handleSubmitFeedback = () => {
    dispatch(
      updateFeedback({
        id,
        feedback: { aiCorrect, userCorrection: userCorrection.trim() },
      })
    );
    setFeedbackGiven(true);
    onFeedbackComplete();
  };

  return (
    <div className="bg-[#1e1e2f] text-white p-6 rounded-2xl shadow-xl border border-purple-500/30 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">🧠 AI Analysis Result</h2>

      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">
          Result:{" "}
          <span
            className={`text-${
              result === "Fake" ? "red" : result === "Real" ? "green" : "yellow"
            }-400`}
          >
            {result}
          </span>
        </span>
        <span className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-2">
        <p className="text-sm mb-1 text-purple-300 font-semibold">
          Confidence:
        </p>
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-fuchsia-600"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <div className="text-sm leading-relaxed text-gray-200 mb-6">
        <strong className="text-purple-400">Explanation:</strong>
        <br />
        {explanation}
      </div>

      {/* Feedback Section */}
      {!feedbackGiven && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-300">
            Was the AI correct?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleFeedback(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              ✅ AI Got It Right
            </button>
            <button
              onClick={() => handleFeedback(false)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              ❌ AI Got It Wrong
            </button>
          </div>

          {/* Show correction input only if AI was marked wrong */}
          {aiCorrect === false && (
            <>
              <textarea
                placeholder="If you want, add your correction..."
                className="w-full p-2 rounded bg-gray-700 text-white border border-purple-500 focus:outline-none"
                rows={3}
                value={userCorrection}
                onChange={(e) => setUserCorrection(e.target.value)}
              />
              {userCorrection.trim() && (
                <button
                  onClick={handleSubmitFeedback}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                >
                  Submit Feedback
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultCard;
