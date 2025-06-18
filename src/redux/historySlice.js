import { createSlice } from "@reduxjs/toolkit";
import { saveToStorage, loadFromStorage } from "./localStorageUtils";

const initialState = {
  history: loadFromStorage() || [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
        state.history.unshift(action.payload)
        saveToStorage(state.history)
    },
    clearHistory: (state, action) => {
        state.history = []
        saveToStorage([])
    },
    updateFeedback: (state, action) => {
        const {id, feedback} = action.payload
        const item = state.history.find((h) => h.id === id)
        if(item) {
            item.feedback = feedback
            saveToStorage(state.history)
        }
    
  },
}});

export const {addToHistory, clearHistory, updateFeedback} = historySlice.actions
export default historySlice.reducer