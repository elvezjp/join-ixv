/**
 * @file src/components/ImageSlider.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月14日
 * @version 0.0.1
 * @description スライダーのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';

// スライダーのデータ型
interface SlideData {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
}

// スライダーのプロパティ型
interface ImageSliderProps {
  slides: SlideData[];
}

/**
 * スライダーのコンポーネント。
 * @param slides - スライダーのデータ。
 * @returns スライダーのコンポーネント。
 */
export default function ImageSlider({ slides }: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  let autoplayInterval: NodeJS.Timeout;

  // スライドを移動する関数
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // 次のスライドへ
  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  // 前のスライドへ
  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  // 自動再生の開始
  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  };

  // 自動再生の停止
  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-xl">
      <div id="slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                className="w-full h-full object-cover"
                width={600}
                height={400}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-xl font-semibold">{slide.title}</h3>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                stopAutoplay();
                startAutoplay();
              }}
              className={`indicator w-2 h-2 rounded-full bg-white ${
                index !== currentSlide ? 'opacity-50' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}