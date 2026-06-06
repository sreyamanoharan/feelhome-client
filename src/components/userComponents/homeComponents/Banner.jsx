import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { FiChevronLeft, FiChevronRight, FiMapPin, FiArrowRight } from 'react-icons/fi';

const SLIDE_DURATION = 5000;

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/banners').then(res => {
      setBanners(res.data.banners);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (banners.length < 2) return;
    setProgress(0);
    const step = 100 / (SLIDE_DURATION / 50);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goTo((activeIndex + 1) % banners.length);
          return 0;
        }
        return prev + step;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [activeIndex, banners]);

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex(index);
    setProgress(0);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const prev = () => goTo((activeIndex - 1 + banners.length) % banners.length);
  const next = () => goTo((activeIndex + 1) % banners.length);

  if (banners.length === 0) return null;

  const banner = banners[activeIndex];

  return (
    <section className="bg-gray-50 py-10 px-4 md:px-10 lg:px-20">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Main card ── */}
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border border-gray-100 min-h-[480px]">

          {/* ── LEFT: Text panel ── */}
          <div className="bg-blue-900 flex flex-col justify-between p-8 md:p-12 lg:w-[42%] flex-shrink-0">

            {/* Top: eyebrow + heading + desc */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <FiMapPin className="text-blue-300 text-sm" />
                <span className="text-blue-300 text-xs font-semibold uppercase tracking-widest">
                  Featured Destination
                </span>
              </div>

              <h2
                key={`h-${activeIndex}`}
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 animate-fade-in-up"
                style={{ fontFamily: '"Caveat", serif', opacity: 0, animationFillMode: 'forwards' }}
              >
                {banner.mainHeading}
              </h2>

              <p
                key={`d-${activeIndex}`}
                className="text-blue-100/80 text-sm md:text-base leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards' }}
              >
                {banner.description}
              </p>
            </div>

            {/* Middle: CTAs */}
            <div
              key={`cta-${activeIndex}`}
              className="flex flex-wrap gap-3 mt-8 animate-fade-in-up"
              style={{ animationDelay: '180ms', opacity: 0, animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => navigate('/allProperties')}
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm hover:scale-[1.02]"
              >
                Explore Properties <FiArrowRight />
              </button>
              <button
                onClick={() => navigate('/host/hostHome')}
                className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 text-sm"
              >
                Start Hosting
              </button>
            </div>

            {/* Bottom: navigation controls */}
            <div className="flex items-center justify-between mt-10">
              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`relative h-1 rounded-full overflow-hidden transition-all duration-300 ${
                      i === activeIndex ? 'w-10 bg-white/30' : 'w-4 bg-white/20 hover:bg-white/40'
                    }`}
                  >
                    {i === activeIndex && (
                      <span
                        className="absolute left-0 top-0 h-full bg-white rounded-full"
                        style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Image carousel ── */}
          <div className="relative flex-1 min-h-[320px] lg:min-h-0 overflow-hidden">
            {banners.map((b, i) => (
              <img
                key={b._id}
                src={b.bannerImage}
                alt={b.mainHeading}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            {/* Slide counter badge */}
            <div className="absolute top-4 right-4 z-10 bg-black/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {String(activeIndex + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}
            </div>

            {/* Thumbnail strip — bottom of image */}
            {banners.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {banners.map((b, i) => (
                  <button
                    key={b._id}
                    onClick={() => goTo(i)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      i === activeIndex
                        ? 'border-white shadow-lg scale-105'
                        : 'border-white/30 opacity-60 hover:opacity-90 hover:border-white/70'
                    }`}
                  >
                    <img src={b.bannerImage} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Banner;
