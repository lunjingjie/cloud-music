import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.play > 0 ? '60px': 0};
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZs(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

export const ImageWrapper = styled.div`
  // 图片自适应高度，锁定比例
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url(${props => props.bgUrl});
  background-size: cover;
  z-index: 50;

  // 表面一层遮罩
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`

export const CollectButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background-color: ${style['theme-color']};
  width: 120px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  font-size: 0;
  margin-top: -55px;
  z-index: 50;

  .iconfont, .text {
    padding: 0 5px;
    color: ${style["font-color-light"]};
    font-size: ${style['font-size-m']};
  }
`

export const BgLayer = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	background: white;
	border-radius: 10px;
	z-index: 50;
`;

export const SongListWrapper = styled.div`
	position: absolute;
	z-index: 50;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	> div {
		position: absolute;
		left: 0;
		width: 100%;
		overflow: visible;
	}
`;
