import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #fff;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;


export const TopInfoWrapper = styled.div`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
  height: 275px;

  .background {
    z-index: -1;
    background: url(${props => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }

  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;

    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
    }

    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }

    img {
      border-radius: 3px;
    }
  }

  .title_info {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-around;
    
    .title {
      color: ${style["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style["font-size-l"]};
      height: 65px;
    }

    .author_info {
      display: flex;
      flex-direction: row;
      flex: 1;
      height: 20px;
      line-height: 20px;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      span {
        line-height: 20px;
        font-size: ${style["font-size-m"]};
        color: ${style["font-color-desc-v2"]};
        padding-left: 5px;
      }
    }
  }
`

export const Menu = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;

  >div {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: ${style["font-size-s"]};
    color: ${style["font-color-light"]};
    font-weight: 500;
    line-height: 20px;
    z-index: 1000;
    .iconfont {
      font-size: 20px;
    }
  }
`

export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  background: ${style["highlight-background-color"]};

  .first_line {
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    border-bottom: 1px solid ${style["border-color"]};
    position: relative;

    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${style["font-color-desc"]};
      
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }

      .sum{
        font-size: ${style["font-size-s"]};
        color: ${style["font-color-desc-v2"]};
      }

      >span{
        vertical-align: top;
      }
    }

    .add_list,.isCollected {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      width: 130px;
      line-height: 34px;
      background: ${style["theme-color"]};
      color: ${style["font-color-light"]};
      font-size: 0;
      border-radius: 3px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span{
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected{
      display: flex;
      background: ${style["background-color"]};
      color: ${style["font-color-desc"]};
    }
  }
`

export const SongItem = styled.ul`
>li{
    display: flex;
    height: 60px;
    align-items: center;  
    .index{
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info{
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style["border-color"]};
      ${style.noWrap()}
      >span{
        ${style.noWrap()}
      }
      >span:first-child{
        color: ${style["font-color-desc"]};
      }
      >span:last-child{
        font-size: ${style["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`