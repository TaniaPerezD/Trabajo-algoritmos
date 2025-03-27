import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { useVideoContext } from '../../context/VideoContext';
import SingleBanner from './SingleBanner';

import sliderImg1 from '../../assets/img/slider/thumb-5-1.jpg';
import sliderImg2 from '../../assets/img/slider/thumb-5-2.jpg';
import sliderImg3 from '../../assets/img/slider/thumb-5-3.jpg';

const BannerSlider = () => {
  const { swiperRef, isOpen, setOpen, videoId, startAutoplay, stopAutoplay } =
    useVideoContext();

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, [swiperRef]);

  const sliderOption = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    effect: 'fade',
  };

  return (
    <div className="swiper-container ed-slider-3-active">
      
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, EffectFade]}
        {...sliderOption}
        className="swiper-wrapper"
        onSlideChange={() => {
          stopAutoplay();
        }}
        onSlideChangeTransitionEnd={() => {
          startAutoplay();
        }}
      >
        <SwiperSlide className="swiper-slide">
          <SingleBanner sliderImage={sliderImg1} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <SingleBanner sliderImage={sliderImg2} />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <SingleBanner sliderImage={sliderImg3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
