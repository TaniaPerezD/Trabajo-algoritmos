import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SectionTitle from '../../components/SectionTitle';
import SingleTestimonial from '../../components/Testimonial';

import testimonialBG from '../../assets/img/testimonial/fondo2.jpg';

const Testimonial = () => {
  const sliderOption = {
    speed: 1500,
    loop: true,
    slidesPerView: '3',
    spaceBetween: 50,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <div
      className="it-testimonial-area ed-testimonial-ptb fix p-relative"
      style={{ backgroundImage: `url(${testimonialBG})` }}
    >
      <div className="container">
        <div className="it-testimonial-title-wrap mb-90">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <SectionTitle
                itemClass="it-testimonial-title-box text-center"
                subTitle="CLASIFICACIóN"
                title="Clasificación de los algoritmos de ordenamiento"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ed-testimonial-wrapper">
              <div className="swiper-container">
                <Swiper
                  modules={[Autoplay]}
                  {...sliderOption}
                  className="swiper-wrapper ed-testimonial-active"
                >
                  <SwiperSlide className="swiper-slide">
                    <SingleTestimonial
                      description={`“Lorem ipsum dolor sit amet, elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                          Orci nulla pellentesque dignissim enim. Amet
                          consectetur adipiscing”`}
                      authorName="SELECTION SORT"
                      designation=" "
                    />
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <SingleTestimonial
                      description={`En la ordenación por inserción, compara el elemento key con los elementos anteriores. Si los elementos anteriores son mayores que el elemento key, mueve el elemento anterior a la siguiente posición.
                      Comienza desde el índice 1 hasta el tamaño del arreglo de entrada.`}
                      authorName="INSERTION SORT"
                      designation=" "
                    />
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <SingleTestimonial
                      description={`“Lorem ipsum dolor sit amet, elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                          Orci nulla pellentesque dignissim enim. Amet
                          consectetur adipiscing”`}
                      authorName="SHELLSORT"
                      designation=" "
                    />
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <SingleTestimonial
                      description={`Merge Sort es un algoritmo Divide y vencerás. Divide el arreglo de entrada en dos mitades, se llama a sí mismo para las dos mitades y luego fusiona las dos mitades ordenadas. La mayor parte del algoritmo tiene dos matrices ordenadas, y tenemos que fusionarlas en un único arreglo ordenado.`}
                      authorName="MERGESORT"
                      designation=" "
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonial;
