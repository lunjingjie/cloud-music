import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { SliderContainer } from '../../components/slider/style';

// SwiperCore.use([Pagination, Autoplay]);

function Slider(props) {
  const { bannerList } = props;
  // const [sliderSwiper, setSliderSwiper] = useState(null);

  // useEffect(() => {
  //   if (bannerList.length > 0 && !sliderSwiper) {
  //     let newSliderSwiper = new Swiper('slider-container', {
  //       loop: true,
  //       autoplay: {
  //         delay: 3000,
  //         disableOnInteraction: false,
  //       },
  //       pagination: {el:'.swiper-pagination'},
  //     });
  //     setSliderSwiper(newSliderSwiper);
  //   }
  // }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className='before'></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          <Swiper
            modules={[]}
            spaceBetween={10}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ el: '.swiper-pagination' }}
          >
            {
              bannerList.map (slider => {
                return (
                  <SwiperSlide key={slider.imageUrl}>
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </SwiperSlide>
                );
              })
            }
          </Swiper>
        </div>
        <div className="swiper-pagination"></div>
      </div> 
    </SliderContainer>
  );
}

export default React.memo(Slider);