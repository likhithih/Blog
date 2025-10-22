import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ReviewSection() {
  const { darkMode } = useTheme();
    return (

        <>

            <section className="pb-12 mx-auto md:pb-20 max-w-7xl">
                <div className="py-4 text-center md:py-8">
                    <h4 className="text-base font-bold tracking-wide text-center uppercase text-teal-600">Reviews </h4>
                    <p className={`mt-2 tracking-tight text:xl md:text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>We have some fans.</p>
                </div>

                <div className="gap-8 space-y-8 md:columns-2 lg:columns-3">

                    <div className={`p-8 border shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex gap-4 items-start">
                            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/12.jpg" alt="user avatar" width="400" height="400" loading="lazy" />
                            <div className="flex-1 flex justify-between items-start">
                                <div>
                                    <h6 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Ravi Kumar</h6>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tech Enthusiast</p>
                                </div>
                                <a href="https://twitter.com/ravikumar/status/1234567890"
                                    className="text-blue-500 hover:text-blue-600 ml-4">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                        <p className={`mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>The articles on this blog are insightful and well-researched. They cover the latest in tech trends and provide practical advice. Highly recommend for anyone in the industry!</p>
                    </div>

                    <div className={`p-8 border shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex gap-4 items-start">
                            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/14.jpg" alt="user avatar" width="200" height="200" loading="lazy" />
                            <div className="flex-1 flex justify-between items-start">
                                <div>
                                    <h6 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Anjali Sharma</h6>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Marketing Professional</p>
                                </div>
                                <a href="https://www.instagram.com/p/1234567890" className="text-blue-500 hover:text-blue-600 ml-4">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                        <p className={`mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>I love the diverse topics! From digital marketing strategies to creative content ideas, this blog has it all. The writing is engaging and easy to follow.</p>
                    </div>

                    <div className={`p-8 border shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex gap-4 items-start">
                            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/18.jpg" alt="user avatar" width="200" height="200" loading="lazy" />
                            <div className="flex-1 flex justify-between items-start">
                                <div>
                                    <h6 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Vijay Singh</h6>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Software Developer</p>
                                </div>
                                <a href="https://www.facebook.com/vijaysingh/posts/1234567890"
                                    className="text-blue-500 hover:text-blue-600 ml-4">
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </div>
                        </div>
                        <p className={`mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>This blog is a game-changer for developers. The tutorials and code examples are spot-on, and they keep me updated on the latest frameworks and tools.</p>
                    </div>

                    <div className={`p-8 border shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex gap-4 items-start">
                            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/2.jpg" alt="user avatar" width="200" height="200" loading="lazy" />
                            <div className="flex-1 flex justify-between items-start">
                                <div>
                                    <h6 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Priya Patel</h6>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mobile Developer</p>
                                </div>
                                <a href="https://twitter.com/priyapatel/status/1234567890"
                                    className="text-blue-500 hover:text-blue-600 ml-4">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                        <p className={`mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>The navigation is super easy, and the content is well-organized. I always find something new and useful in every post. My go-to resource for tech insights.</p>
                    </div>

                    <div className={`p-8 border shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex gap-4 items-start">
                            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/men/62.jpg" alt="user avatar" width="200" height="200" loading="lazy" />
                            <div className="flex-1 flex justify-between items-start">
                                <div>
                                    <h6 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Arjun Mehta</h6>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manager</p>
                                </div>
                                <a href="https://www.instagram.com/p/1234567890" className="text-blue-500 hover:text-blue-600 ml-4">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                        <p className={`mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Great value for readers. The blog posts are high-quality and free, yet they provide immense value. It's significantly improved my knowledge in the field.</p>
                    </div>

                    <div className={`p-8 border shadow-2xl aspect-auto rounded-3xl shadow-gray-600/10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex gap-4 items-start">
                            <img className="w-12 h-12 rounded-full" src="https://randomuser.me/api/portraits/women/19.jpg" alt="user avatar" width="400" height="400" loading="lazy" />
                            <div className="flex-1 flex justify-between items-start">
                                <div>
                                    <h6 className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Sneha Rao</h6>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product Designer</p>
                                </div>
                                <a href="https://www.facebook.com/sneharao/posts/1234567890"
                                    className="text-blue-500 hover:text-blue-600 ml-4">
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </div>
                        </div>
                        <p className={`mt-8 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Absolutely love this blog. The design tips and industry trends are spot-on, and the community engagement makes it even better. My favorite online resource!</p>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ReviewSection;