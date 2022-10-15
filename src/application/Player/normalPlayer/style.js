import styled, { keyframes } from "styled-components";
import style from "../../../assets/global-style";

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const NormalPlayerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${style["background-color"]};
  z-index: 150;
  width: 100%;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: ${style['font-color-desc']};
      opacity: 0.3;
      filter: none;
    }
  }
`

export const Top = styled.div`
  position: relative;
  margin-bottom: 25px;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${style['font-color-desc']};
      font-weight: bold;
      transform: rotate(90deg);
    }
  }
  .title {
    // 预防歌曲名太长，在70%宽度内展示，不遮挡左右其他元素展示
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: ${style['font-size-l']};
    color: ${style['font-color-desc']}
    ${style.noWrap}
  }
  .subtitle {
    line-height: 20px;
    text-align: center;
  }
`

export const Middle = styled.div``

export const Bottom = styled.div``

export const Operators = styled.div``

export const CDWrapper = styled.div``