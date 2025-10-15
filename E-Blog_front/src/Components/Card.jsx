import { useState, useEffect } from 'react';
import Footer from './Footer';

export default function Card() {
    const cards = [
        {
            img: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60",
            title: "Color Psychology in UI: How to Choose the Right Palette",
            category: "UI/UX design"
        },
        {
            img: "https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60",
            title: "Color Psychology in UI: How to Choose the Right Palette",
            category: "UI/UX design"
        },
        {
            img: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60",
            title: "Color Psychology in UI: How to Choose the Right Palette",
            category: "UI/UX design"
        },
        {
            img: "https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60",
            title: "Color Psychology in UI: How to Choose the Right Palette",
            category: "UI/UX design"
        },
         {
            img: "https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60",
            title: "Color Psychology in UI: How to Choose the Right Palette",
            category: "UI/UX design"
        },
         {
            img: "https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60",
            title: "Color Psychology in UI: How to Choose the Right Palette",
            category: "UI/UX design"
        },
    ];

    const duplicatedCards = [...cards, ...cards];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex === cards.length) {
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
            <h1 className="text-3xl font-semibold text-center mx-auto">Latest Blog</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
                Welcome to a space where ideas turn into stories and stories spark inspiration.
Here, we explore creativity, learning, and life sharing thoughts that motivate, educate, and connect people across different journeys.
            </p>

            <div className="pt-12 pb-20 h-96">
                <div className="carousel-container">
                    <div className="carousel-slider" style={{ transform: `translateX(-${currentIndex * 320}px)`, transition: transitionEnabled ? 'transform 0.5s ease' : 'none' }}>
                        {duplicatedCards.map((card, index) => (
                            <div key={index} className={`carousel-slide transition-all duration-500 ${(index - currentIndex) === 1 ? 'scale-110 translate-y-[-10px]' : 'scale-100'} hover:-translate-y-0.5`}>
                                <img className="rounded-xl" src={card.img} alt="" />
                                <h3 className="text-base text-slate-900 font-medium mt-3">{card.title}</h3>
                                <p className="text-xs text-indigo-600 font-medium mt-1">{card.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};
