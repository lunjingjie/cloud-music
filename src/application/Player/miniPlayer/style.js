import styled, { keyframes } from "styled-components";
import style from "../../../assets/global-style";

const rotate = keyframes`
  0%{
    transform: rotate (0);
  }
  100%{
    transform: rotate (360deg);
  }
`

export const MiniPlayerContainer = styled.div`
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 60px;
	display: flex;
	background-color: ${style['highlight-background-color']};
	flex: 1;
	align-items: center;
	z-index: 1000;
	.icon {
		flex: 0 0 40px;
		width: 40px;
		height: 40px;
		padding: 0 10px 0 20px;
		.img_wrapper {
			width: 100%;
			height: 100%;
			img {
				border-radius: 50%;
				&.play {
					animation: ${rotate} 10s infinite;
					&.pause {
						animation-play-state: paused;
					}
				}
			}
		}
	}
	.text {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		line-height: 20px;
		overflow: hidden;
		.name {
			margin-bottom: 2px;
			font-size: ${style['font-size-m']};
			color: ${style['font-color-desc']};
			${style.noWrap()}
		}
		.desc {
			font-size: ${style['font-size-s']};
			color: ${style['font-color-desc-v2']};
			${style.noWrap()}
		}
	}
	.control {
		flex: 0 0 30px;
		padding: 0 10px;

		.iconfont,
		.icon-playlist {
			font-size: 30px;
			color: ${style['theme-color']};
		}
		.icon-mini {
			font-size: 16px;
			position: absolute;
			left: 8px;
			top: 8px;
			&.icon-play {
				left: 9px;
			}
		}
	}
`;