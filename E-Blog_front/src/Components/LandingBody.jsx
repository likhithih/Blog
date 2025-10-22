import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from '../contexts/ThemeContext';

const featuresSection1 = [
  {
    title: "Create Blog Posts",
    desc: "Write and publish blog posts effortlessly with rich text editor and media support. Customize your posts with images, videos, and formatting to make your content engaging and visually appealing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-violet-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
    color: "rgba(139,92,246,0.15)",
  },
  {
    title: "Manage Content",
    desc: "Organize posts with categories and tags, edit or delete anytime. Keep your blog organized and easily searchable, ensuring readers find the content they love.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      </svg>
    ),
    color: "rgba(34,197,94,0.15)",
  },
  {
    title: "SEO Optimized",
    desc: "Boost visibility with SEO-friendly URLs, metadata, and clean design. Improve search engine rankings and attract more organic traffic to your blog effortlessly.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-red-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    color: "rgba(239,68,68,0.15)",
  },
];

const featuresSection2 = [
  {
    title: "Track Analytics",
    desc: "Monitor your readers’ engagement, views, and trends in real-time. Understand which posts resonate the most and make data-driven decisions for future content.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-blue-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M9 17V9" />
        <path d="M15 17V5" />
      </svg>
    ),
    color: "rgba(59,130,246,0.15)",
  },
  {
    title: "Community Interaction",
    desc: "Enable comments, shares, and subscriptions to build an active community. Engage with your readers, answer questions, and foster meaningful discussions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-purple-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: "rgba(139,92,246,0.15)",
  },
  {
    title: "Custom Reports",
    desc: "Export analytics and reports for better decision-making and growth. Track your blog’s progress over time and measure the success of your strategies.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-orange-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
      </svg>
    ),
    color: "rgba(249,115,22,0.15)",
  },
];

const LandingBody = () => {
  const { darkMode } = useTheme();
  const imagesSection1 = ["/bloger.jpg", "/Blog creating Back Cover.jpg"];
  const imagesSection2 = ["/Meta Verse back cover.jpg", "/social.jpg"];

  const [currentImage1, setCurrentImage1] = useState(0);
  const [currentImage2, setCurrentImage2] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => setCurrentImage1((prev) => (prev + 1) % imagesSection1.length), 3000);
    const interval2 = setInterval(() => setCurrentImage2((prev) => (prev + 1) % imagesSection2.length), 3000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const renderFeature = (feature, idx) => (
    <motion.div
      key={idx}
      className={`relative p-5 md:p-6 flex items-start gap-5 rounded-3xl border ${
        darkMode
          ? 'border-gray-700 bg-gray-800 shadow-lg'
          : 'border-gray-100 bg-white shadow-md'
      } cursor-pointer overflow-hidden group transition-all duration-300`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.04 }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl z-0"
        style={{ backgroundColor: feature.color }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="flex-shrink-0 z-10">{feature.icon}</div>
      <motion.div className="flex flex-col gap-1 p-3 rounded-xl w-full z-10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
        <h3 className={`text-lg md:text-xl font-semibold ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>{feature.title}</h3>
        <p className={`text-sm md:text-base leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>{feature.desc}</p>
      </motion.div>
    </motion.div>
  );

  const renderImage = (src) => (
    <motion.div className={`relative w-[450px] md:w-[600px] h-[400px] md:h-[500px] flex-shrink-0 rounded-3xl shadow-2xl overflow-hidden z-10 ${src.includes('bloger.jpg') ? 'bg-white' : ''}`} whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
      <motion.img key={src} src={src} alt="Feature image" className={`absolute top-0 left-0 w-full h-full rounded-3xl z-10 ${src.includes('bloger.jpg') ? 'object-contain' : 'object-cover'}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeInOut" }} />
    </motion.div>
  );

  return (
    <>
      <div className="landing-bg min-h-screen flex flex-col items-center justify-center gap-16 px-6 py-12 pt-36 relative">
        {/* Animated Welcome Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Welcome to Our Blog Website
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl italic ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            "Sharing ideas, inspiring minds, and creating a community through words."
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-28 w-full justify-center">
          {renderImage(imagesSection1[currentImage1])}
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[400px]">{featuresSection1.map(renderFeature)}</div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-28 w-full justify-center">
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[400px]">{featuresSection2.map(renderFeature)}</div>
          {renderImage(imagesSection2[currentImage2])}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .landing-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/Write Back Cover.jpg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          opacity: ${darkMode ? '0.08' : '0.12'};
          z-index: -1;
        }
      `}</style>
    </>
  );
};

export default LandingBody;
