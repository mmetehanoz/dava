import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length]);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  const slide = slides[current];

  return (
    <div
      className="relative overflow-hidden rounded-none md:rounded-3xl mx-0 md:mx-6 mt-0 md:mt-4 shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`bg-gradient-to-br ${slide.bgColor} min-h-[320px] md:min-h-[400px] flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 w-full grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            {slide.badge && (
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                ✨ {slide.badge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ whiteSpace: 'pre-line' }}>
              {slide.title}
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-6 max-w-md leading-relaxed">
              {slide.description}
            </p>
            <Link
              to={slide.ctaLink}
              className="inline-flex items-center gap-2 bg-white text-emerald-800 font-bold px-6 py-3 rounded-2xl text-sm hover:bg-emerald-50 transition-all hover:shadow-lg active:scale-95"
            >
              {slide.cta} →
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center text-8xl backdrop-blur-sm">
              {slide.emoji}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
}
