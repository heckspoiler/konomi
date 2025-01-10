'use client';

import React, { useRef, useEffect } from 'react';
import { Player as LottiePlayer } from '@lottiefiles/react-lottie-player';

const ANIMATION_CONFIGS = {
  forward: { direction: 1, speed: 1 },
  reverse: { direction: -1, speed: 1 },
};

const playAnimation = (
  ref: any,
  {
    direction,
    speed,
  }: {
    direction: number;
    speed: number;
  }
) => {
  if (!ref) return;
  ref.setPlayerDirection(direction);
  ref.setPlayerSpeed(speed);
  ref.play();
};

export default function LogoContent({
  styles,
  data,
}: {
  styles: any;
  data: any;
}) {
  const lottieRef = useRef<any>(null);
  const SCROLL_THRESHOLD = 300;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!lottieRef.current) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > SCROLL_THRESHOLD) {
        playAnimation(lottieRef.current, ANIMATION_CONFIGS.forward);
      } else {
        playAnimation(lottieRef.current, ANIMATION_CONFIGS.reverse);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`${styles.logoContainer} cursor-pointer`}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToTop();
        }
      }}
    >
      <LottiePlayer
        ref={lottieRef}
        src="https://lottie.host/05f82d5c-fe00-4991-9fca-ae968ee75e32/a1UeNfFJ7U.json"
        autoplay={false}
        keepLastFrame={true}
      />
    </div>
  );
}
