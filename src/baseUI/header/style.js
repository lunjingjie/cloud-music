import styled from "styled-components";
import style from "../../assets/global-style";

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 0 5px 10px 5px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  display: flex;
  color: #fff;
  z-index: 1000;
  font-size: ${style['font-size-l']};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1 {
    font-size: ${style["font-size-l"]};
    font-weight: 700;
  }
`