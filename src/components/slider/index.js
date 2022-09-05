import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import "swiper/swiper.min.css";
import { SliderContainer } from '../../components/slider/style';

function Slider(props) {
  const { bannerList } = props;
  const [sliderSwiper, setSliderSwiper] = useState(null);

  useEffect(() => {
    if (bannerList.length > 0 && !sliderSwiper) {
      let newSliderSwiper = new Swiper('slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {el:'.swiper-pagination'},
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className='before'></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map (slider => {
              return (
                <div className="swiper-slide" key={slider.id}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div> 
    </SliderContainer>
  );
}

export default React.memo(Slider);