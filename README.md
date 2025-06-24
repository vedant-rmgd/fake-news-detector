# TruthCheck AI
TruthCheck AI is a simple and minimalistic web application that helps users detect fake news using AI. Just paste a news headline and its full article, and the app will analyze it to determine if the news is likely **Real** or **Fake**, along with a confidence score and explanation.

---

## 🚀 Features

- 🔎 **AI-Powered Analysis** of news articles  
- 📊 **Confidence Score** with visual bar  
- 🧠 **Explanation** from AI in readable format  
- ✅❌ **Feedback System** – users can tell if AI was right or wrong  
- 🕓 **History Sidebar** to revisit past analyses  
- 📱 **Responsive UI** for mobile and desktop  
- 🧼 Clean and distraction-free **Minimal UI**  

---

## ⚙️ Tech Stack

React - Frontend framework for building UI  
Tailwind CSS - Utility-first styling framework for UI  
Redux Toolkit - Global State Management  
Openrouter API - For querying LLMs to analyze the news  
Custom Parser - Parses AI response into structured format

---

## 🧪 How It Works

1. User inputs a **headline** and **article**.  
2. App sends this data to **OpenRouter (LLM)** via API.  
3. AI responds with a result (`Fake` or `Real`), confidence, and explanation.  
4. User can review the result and give feedback.  
5. All previous analyses are saved in the **history** sidebar.  

## 🧪 How to Run Locally

git clone https://github.com/vedant-rmgd/fake-news-detector  
cd Blog-app  
npm install  
npm run dev  

## 📜 License

This project is open-source and available under the MIT License.
