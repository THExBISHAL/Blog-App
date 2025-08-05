function About() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928DAB] px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-10 sm:p-12 text-center max-w-md">
        <h1 className="text-white text-3xl sm:text-4xl font-bold mb-6">
          Explore My Work
        </h1>
        <a
          href="https://portfolio-frontend-yqgy.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="w-full backdrop-blur-sm text-slate-950 font-semibold text-lg sm:text-xl py-3 rounded-xl hover:scale-105 cursor-pointer transition-all duration-300 shadow-md hover:shadow-2xl hover:text-slate-800">
            Visit Portfolio
          </button>
        </a>
      </div>
    </div>
  );
}

export default About;
