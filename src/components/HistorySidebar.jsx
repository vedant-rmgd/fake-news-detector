import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearHisory } from "../redux/historySlice";
import { useState } from "react";

function HistorySidebar() {
  const history = useSelector((state) => state.history.history);
  const dispatch = useDispatch();
  const [expandedId, setExpandedId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log(history);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (history.length === 0 && isCollapsed) return null;

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-72 h-screen"
      } overflow-y-auto bg-[#111111] border-r border-gray-800 fixed left-0 top-0 z-10 transition-all duration-300 ease-in-out block hide-scrollbar`}
    >
      {/* Header with toggle */}
      <div className="flex justify-between items-center p-3">
        {!isCollapsed && (
          <h2 className="text-base font-semibold text-white tracking-wide">
            History
          </h2>
        )}
        <button
          onClick={toggleSidebar}
          className="w-9 h-8 flex items-center justify-center rounded-lg bg-zinc-500 hover:bg-gray-400 transition"
        >
          <img
            src={isCollapsed ? "/sidebar (1).png" : "/sidebar.png"}
            alt="toggle"
            className="w-4 h-4 object-contain"
          />
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Clear All */}
          <div>
            <button
              onClick={() => dispatch(clearHisory())}
              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 font-medium"
            >
              <img src="/delete (2).png" alt="trashbin" className="w-4 h-4" />
              Clear
            </button>
          </div>

          {/* History List */}
          <div className="space-y-3">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#1a1a1a] py-2 px-3 rounded-lg border border-gray-700 hover:border-gray-600 transition"
              >
                <button
                  onClick={() => toggleExpand(entry.id)}
                  className="w-full text-left"
                >
                  <p className="font-medium text-sm text-white truncate">
                    {entry.news}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    {new Date(entry.createdAt).toLocaleTimeString()}
                  </p>
                </button>

                {expandedId === entry.id && (
                  <div className="mt-2 text-sm text-gray-400 space-y-1">
                    <p>
                      <strong>Result:</strong> {entry.result}
                    </p>
                    <p>
                      <strong>Confidence:</strong> {entry.confidence}%
                    </p>
                    <p>
                      <strong>Explanation:</strong> {entry.explanation}
                    </p>
                    {entry.feedback?.aiCorrect !== undefined && (
                      <p>
                        <strong>Feedback:</strong>{" "}
                        {entry.feedback.aiCorrect ? "✅ Correct" : "❌ Wrong"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HistorySidebar;
