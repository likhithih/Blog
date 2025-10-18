import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Nav_bl from "../Components/Nav_bl";

function About({ status, toggle }) {
  const [showMoreFirst, setShowMoreFirst] = useState(false);
  const [showMoreSecond, setShowMoreSecond] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const toggleShowMoreFirst = () => setShowMoreFirst(!showMoreFirst);
  const toggleShowMoreSecond = () => setShowMoreSecond(!showMoreSecond);

  return (
    <>
      {isLoggedIn ? <Navbar /> : <Nav_bl />}
      <div className="pt-30 mb-20 mt-20">
        <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mb-16">
          <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
            <img
              className="max-w-md w-full object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&q=80&w=451&h=451"
              alt="developer community"
            />
            <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl">
              <div className="flex -space-x-4 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                  alt="user1"
                  className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[1]"
                />
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                  alt="user2"
                  className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                  alt="user3"
                  className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]"
                />
                <div className="flex items-center justify-center text-xs text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-[4]">
                  50+
                </div>
              </div>
              <p className="text-sm font-medium text-slate-800">
                Join our developer community
              </p>
            </div>
          </div>

          <div className="text-sm text-slate-600 max-w-lg">
            <h1 className="text-xl uppercase font-semibold text-slate-700">
              What we do?
            </h1>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>

            <p className="mt-8">
              Welcome to Blogs website — a professional platform powered by a
              dedicated team of developers, designers, and innovators.
            </p>
            <p className="mt-4">
              We are passionate about sharing tutorials, insights, and the
              latest trends in software and web development. Our mission is to
              empower the developer community with content that is practical,
              reliable, and easy to understand.
            </p>

            {showMoreFirst && (
              <>
                <p className="mt-4">
                  Our blog covers a wide range of topics including React,
                  Node.js, UI/UX design, and emerging technologies like AI and
                  blockchain.
                </p>
                <p className="mt-4">
                  Join thousands of developers who rely on our platform for
                  hands-on guides and community-driven discussions.
                </p>
              </>
            )}

            <button
              onClick={toggleShowMoreFirst}
              className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white"
            >
              <span>{showMoreFirst ? "Read less" : "Read more"}</span>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${
                  showMoreFirst ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                  fill="#fff"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* -------- Section 2: What We Create -------- */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
          <div className="text-sm text-slate-600 max-w-lg">
            <h1 className="text-xl uppercase font-semibold text-slate-700">
              What we create?
            </h1>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>

            <p className="mt-8">
              Welcome to the Technology and AI section of E-Blog — where
              innovation meets intelligence. We explore Artificial Intelligence,
              Machine Learning, and emerging technologies shaping the future.
            </p>
            <p className="mt-4">
              Technology isn’t just about machines — it’s about the creativity
              and imagination of the people behind it.
            </p>

            {showMoreSecond && (
              <>
                <p className="mt-4">
                  Our articles are written to educate, inspire, and empower.
                  Whether you’re a beginner or a pro, our guides help you master
                  complex concepts with ease.
                </p>
                <p className="mt-4">
                  We also host workshops and community sessions to build a
                  supportive learning environment.
                </p>
              </>
            )}

            <button
              onClick={toggleShowMoreSecond}
              className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white"
            >
              <span>{showMoreSecond ? "Read less" : "Read more"}</span>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${
                  showMoreSecond ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                  fill="#fff"
                />
              </svg>
            </button>
          </div>

          <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
            <img
              className="w-96 h-96 object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1760532767946-7edb67eb415f?auto=format&fit=crop&q=60&w=600"
              alt="developer community"
            />
          </div>
        </section>
      </div>
      {isLoggedIn ? <Footer /> : null}
    </>
  );
}

export default About;
