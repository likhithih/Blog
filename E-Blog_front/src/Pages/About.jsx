import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Nav_bl from "../Components/Nav_bl";
import Footer from "../Components/Footer";

function About() {
  const [showMore, setShowMore] = useState(false);
  const [showMoreSecond, setShowMoreSecond] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleShowMoreSecond = () => {
    setShowMoreSecond(!showMoreSecond);
  };
  return (
    <>
      {isLoggedIn ? <Navbar /> : <Nav_bl />}
      <div className="pt-30 mb-20">
        <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mb-16">
          <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
            <img
              className="max-w-md w-full object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aWxsdXN0cmF0aW9ufGVufDB8fDB8fHww?q=80&w=451&h=451&auto=format&fit=crop"
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
              Welcome to Blogs website , a professional platform powered by a
              dedicated team of developers, designers, and tech innovators.
            </p>
            <p className="mt-4">
              We are passionate about sharing insights, tutorials, and the
              latest trends in software and web development. Our mission is to
              empower the developer community with content that is practical,
              reliable, and easy to understand.
            </p>
            <p className="mt-4">
              we believe in collaboration, innovation, and continuous learning.
              With years of industry experience, our team brings you
              high-quality articles, code examples, and resources designed to
              make your development journey smoother and more productive.
            </p>
            {showMoreSecond && (
              <>
                <p className="mt-4">
                  Our blog covers a wide range of topics including web
                  development frameworks like React and Node.js, best practices
                  for coding, UI/UX design principles, and emerging technologies
                  such as AI and blockchain. We aim to provide in-depth guides
                  that not only teach but also inspire creativity and
                  problem-solving skills.
                </p>
                <p className="mt-4">
                  Join thousands of developers who rely on our platform for
                  up-to-date information and community-driven discussions.
                  Whether you're a beginner or an expert, our content is
                  tailored to help you stay ahead in the fast-paced world of
                  technology.
                </p>
                <p className="mt-4">
                  We also host webinars, workshops, and interactive sessions to
                  foster a supportive learning environment. Our commitment to
                  quality and accessibility ensures that everyone can benefit
                  from our resources, regardless of their background or
                  experience level.
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
        </section>

        <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4">
          <div className="text-sm text-slate-600 max-w-lg">
            <h1 className="text-xl uppercase font-semibold text-slate-700">
              What we create?
            </h1>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
            <p className="mt-8">
              Welcome to the Technology and AI section of E-Blog, where
              innovation meets intelligence. Here, we explore the rapidly
              evolving world of Artificial Intelligence, Machine Learning, Data
              Science, Robotics, and emerging technologies shaping our future.
            </p>
            <p className="mt-4">
              At E-Blog, we believe technology isn’t just about machines — it’s
              about the minds that create them and the possibilities they
              unlock. Our mission is to simplify complex tech concepts and make
              them accessible for learners, developers, and curious readers
              alike.
            </p>
            <p className="mt-4">
              From AI breakthroughs and automation trends to coding tutorials,
              future tech predictions, and real-world applications, this section
              brings you insightful, research-driven, and up-to-date content
              that keeps you ahead in the digital era.
            </p>
            {showMore && (
              <>
                <p className="mt-4">
               Our articles are written to educate, inspire, and empower — helping you grasp advanced concepts with clarity. We believe every reader should not just consume technology, but understand and create with it.
                </p>
                <p className="mt-4">
                  Join thousands of developers who rely on our platform for
                  up-to-date information and community-driven discussions.
                  Whether you're a beginner or an expert, our content is
                  tailored to help you stay ahead in the fast-paced world of
                  technology.
                </p>
                <p className="mt-4">
                  We also host webinars, workshops, and interactive sessions to
                  foster a supportive learning environment. Our commitment to
                  quality and accessibility ensures that everyone can benefit
                  from our resources, regardless of their background or
                  experience level.
                </p>
              </>
            )}
            <button
              onClick={toggleShowMore}
              className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white"
            >
              <span>{showMore ? "Read less" : "Read more"}</span>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform ${
                  showMore ? "rotate-180" : ""
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
              src="https://images.unsplash.com/photo-1760532767946-7edb67eb415f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600"
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
