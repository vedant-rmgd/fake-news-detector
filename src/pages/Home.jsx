import Header from "../components/Header";
import NewsInput from "../components/NewsInput";

function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-white px-4">
      <Header />

      <main className="flex flex-col items-center justify-center gap-6 mt-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          TruthCheck AI
        </h1>

        <p className="text-gray-400 text-lg md:text-xl">
          Detect fake news instantly with AI. Enter a headline or article and
          verify its authenticity.
        </p>

        <NewsInput/>

      </main>
    </div>
  );
}

export default Home;
