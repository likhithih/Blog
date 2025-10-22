import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Card() {
  const { darkMode } = useTheme();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:4000/blogs");
                const formattedBlogs = response.data.map((blog) => ({
                    id: blog._id,
                    image: blog.image,
                    title: blog.title,
                    category: blog.category
                }));
                setCards(formattedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const duplicatedCards = cards.length > 4 ? [...cards, ...cards] : cards;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    useEffect(() => {
        if (cards.length > 4) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [cards.length]);

    useEffect(() => {
        if (cards.length > 4 && currentIndex === cards.length) {
            setTransitionEnabled(false);
            setCurrentIndex(0);
            setTimeout(() => setTransitionEnabled(true), 0);
        }
    }, [currentIndex, cards.length]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .carousel-container {
                    overflow: hidden;
                    width: 100%;
                    max-width: 1248px;
                    margin: 0 auto;
                }

                .carousel-slider {
                    display: flex;
                    gap: 32px;
                }

                .carousel-slide {
                    flex-shrink: 0;
                    width: 288px;
                }
            `}</style>
            <h1 className={`text-3xl font-semibold text-center mx-auto ${darkMode ? 'text-white' : 'text-gray-900'}`}>Latest Blog</h1>
            <p className={`text-sm text-center mt-2 max-w-lg mx-auto ${darkMode ? 'text-gray-300' : 'text-slate-500'}`}>
                Welcome to a space where ideas turn into stories and stories spark inspiration.
                Here, we explore creativity, learning, and life sharing thoughts that motivate, educate, and connect people across different journeys.
            </p>

            <div className="pt-12 pb-20 h-96">
                <div className="carousel-container">
                    <div className="carousel-slider" style={{ transform: `translateX(-${currentIndex * 320}px)`, transition: transitionEnabled ? 'transform 0.5s ease' : 'none' }}>
                        {duplicatedCards.map((card, index) => (
                            <div key={index} className={`carousel-slide transition-all duration-500} hover:-translate-y-1.5 cursor-pointer`} onClick={() => navigate(`/blog/${card.id}`)}>
                                <img className="w-full h-48 object-cover rounded-xl" src={`http://localhost:4000/uploads/${card.image}`} alt="" />
                                <h3 className={`text-base font-medium mt-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{card.title}</h3>
                                <p className="text-xs text-indigo-600 font-medium mt-1">{card.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
