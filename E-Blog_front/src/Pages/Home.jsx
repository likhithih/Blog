import Card from "../Components/Card";
import HeroSection from "../Components/HeroSection";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ReviewSection from "../Components/ReviewSection";
import { useTheme } from "../contexts/ThemeContext";

function Home() {
  const { darkMode } = useTheme();

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Multiple animated blobs */}
      <div className="absolute w-72 h-72 bg-blue-400 opacity-40 rounded-full animate-blob z-0 top-[-10%] left-[-10%]"></div>
      <div className="absolute w-80 h-80 bg-pink-400 opacity-40 rounded-full animate-blob z-0 top-[10%] right-[-10%] animation-delay-2000"></div>
      <div className="absolute w-60 h-60 bg-purple-400 opacity-40 rounded-full animate-blob z-0 top-[40%] left-[30%] animation-delay-4000"></div>
      <div className="absolute w-72 h-72 bg-yellow-300 opacity-30 rounded-full animate-blob z-0 bottom-[5%] left-[20%] animation-delay-6000"></div>
      <div className="absolute w-80 h-80 bg-green-300 opacity-30 rounded-full animate-blob z-0 bottom-[10%] right-[10%] animation-delay-8000"></div>
      <div className="absolute w-64 h-64 bg-indigo-300 opacity-30 rounded-full animate-blob z-0 top-[20%] left-[60%] animation-delay-10000"></div>

      {/* Page content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <Card />
        <ReviewSection />
        <Footer />
      </div>

      {/* Blob animations */}
      <style>
        {`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            25% { transform: translate(50px, -30px) scale(1.1); }
            50% { transform: translate(-40px, 20px) scale(0.9); }
            75% { transform: translate(30px, 40px) scale(1.05); }
            100% { transform: translate(0px, 0px) scale(1); }
          }

          .animate-blob {
            animation: blob 20s ease-in-out infinite;
          }

          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animation-delay-6000 { animation-delay: 6s; }
          .animation-delay-8000 { animation-delay: 8s; }
          .animation-delay-10000 { animation-delay: 10s; }
        `}
      </style>
    </div>
  );
}

export default Home;
