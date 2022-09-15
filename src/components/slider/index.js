import React, { useEffect, useState } from 'react';
import Swiper from 'swiper/swiper-bundle.esm';
import "swiper/swiper-bundle.min.css";
import { SliderContainer } from '../../components/slider/style';

// SwiperCore.use([Pagination, Autoplay]);

function Slider(props) {
  const { bannerList } = props;
  const [sliderSwiper, setSliderSwiper] = useState(null);

  useEffect(() => {
    if (bannerList.length > 0 && !sliderSwiper) {
      let newSliderSwiper = new Swiper('.swiper', {
        autoplay: true,
        loop: true,
        pagination: {el:'.swiper-pagination'},
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className='before'></div>
      <div className="swiper">
        <div className="swiper-wrapper">
            {
              bannerList.map(slider => {
                return (
                  <div className="swiper-slide" key={slider.imageUrl}>
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
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