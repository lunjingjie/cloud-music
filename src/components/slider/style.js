import styled from "styled-components";
import style from '../../assets/global-style';

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  margin: auto;
  .before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60%;
    background-color: ${style['theme-color']};
  }
  .swiper {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .swiper-pagination-bullet-active {
      background: ${style["theme-color"]};
    }
  }
`