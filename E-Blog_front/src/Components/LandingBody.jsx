import React, { useState } from "react";
import { motion } from "framer-motion";

const featuresSection1 = [
  {
    title: "Create Blog Posts",
    desc: "Write and publish blog posts effortlessly with rich text editor and media support.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-violet-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
    color: "violet",
  },
  {
    title: "Manage Content",
    desc: "Organize posts with categories and tags, edit or delete anytime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      </svg>
    ),
    color: "green",
  },
  {
    title: "SEO Optimized",
    desc: "Boost visibility with SEO-friendly URLs, metadata, and clean design.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-red-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    color: "red",
  },
];

const featuresSection2 = [
  {
    title: "Track Analytics",
    desc: "Monitor your readers’ engagement, views, and trends in real-time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-blue-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M9 17V9" />
        <path d="M15 17V5" />
      </svg>
    ),
    color: "blue",
  },
  {
    title: "Community Interaction",
    desc: "Enable comments, shares, and subscriptions to build an active community.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-purple-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: "purple",
  },
  {
    title: "Custom Reports",
    desc: "Export analytics and reports for better decision-making and growth.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-orange-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5 5 5-5" />
      </svg>
    ),
    color: "orange",
  },
];

const LandingBody = () => {
  const [showImage1, setShowImage1] = useState(true);
  const [showImage2, setShowImage2] = useState(true);

  return (
    <>
      <div className="landing-bg min-h-screen flex flex-col items-center justify-center gap-36 px-6 py-12 relative">

        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full justify-center relative">
          <motion.div
            className="relative w-[450px] md:w-[600px] h-[400px] md:h-[500px] cursor-pointer flex-shrink-0 rounded-3xl shadow-2xl overflow-hidden z-10"
            onClick={() => setShowImage1(!showImage1)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              key={showImage1 ? "img1" : "img2"}
              src={showImage1 ? "/bloger.jpg" : "/Blog creating Back Cover.jpg"}
              alt="Feature image"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="flex flex-col gap-8 md:gap-10 w-full md:w-[400px] z-20">
            {featuresSection1.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative p-4 md:p-6 flex items-start gap-4 rounded-2xl border border-transparent cursor-pointer overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.7, ease: "easeInOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="flex-shrink-0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <motion.div
                  className={`flex flex-col gap-1 p-4 rounded-xl w-full transition-all duration-300`}
                  whileHover={{ backgroundColor: `var(--tw-bg-${feature.color}-400)` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
                  <p className="text-sm text-black leading-relaxed">{feature.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full justify-center relative">
          <div className="flex flex-col gap-8 md:gap-10 w-full md:w-[400px] z-20">
            {featuresSection2.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative p-4 md:p-6 flex items-start gap-4 rounded-2xl border border-transparent cursor-pointer overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.7, ease: "easeInOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="flex-shrink-0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <motion.div
                  className={`flex flex-col gap-1 p-4 rounded-xl w-full transition-all duration-300`}
                  whileHover={{ backgroundColor: `var(--tw-bg-${feature.color}-400)` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
                  <p className="text-sm text-black leading-relaxed">{feature.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative w-[450px] md:w-[600px] h-[400px] md:h-[500px] cursor-pointer flex-shrink-0 rounded-3xl shadow-2xl overflow-hidden z-10"
            onClick={() => setShowImage2(!showImage2)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              key={showImage2 ? "img3" : "img4"}
              src={showImage2 ? "/Meta Verse back cover.jpg" : "/social.jpg"}
              alt="Feature image"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>
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
          opacity: 0.15;
          z-index: -1;
        }
      `}</style>
    </>
  );
};

export default LandingBody;
