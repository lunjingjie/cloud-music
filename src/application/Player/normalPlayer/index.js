import React, { useRef } from 'react';
import {
	NormalPlayerContainer,
	Bottom,
	Middle,
	Top,
	CDWrapper,
	Operators,
	ProgressWrapper
} from './style';
import { getName, prefixStyle } from '../../../api/utils';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import ProgressBar from '../../../baseUI/progress/progress-bar';

const NormalPlayer = (props) => {
	const { song, fullScreen } = props;
	const { toggleFullScreen } = props;

	const normalPlayerRef = useRef();
	const cdWrapperRef = useRef();

	const transform = prefixStyle('transform');

	// 计算偏移的辅助函数
	const _getPosAndScale = () => {
		const targetWidth = 40;
		const paddingLeft = 30;
		const paddingBottom = 30;
		const paddingTop = 80; // Middle组件top的值
		const width = window.innerWidth * 0.8;
		const scale = targetWidth / width;
		// mini图片相对于唱片的x偏移值，以唱片中心为原点。（唱片居于整个屏幕中心）
		const x = -(window.innerWidth / 2 - paddingLeft);
		const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
		return {
			x,
			y,
			scale
		};
	};

	// 启用帧动画
	const enter = () => {
		normalPlayerRef.current.style.display = 'block';
		// 获取miniPlayer图片中心相对于normalPlayer唱片中心的偏移
		const { x, y, scale } = _getPosAndScale();
		let animation = {
			0: {
				transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
			},
			60: {
				transform: `translate3d(0, 0, 0) scale(1.1)`
			},
			100: {
				transform: `translate3d(0, 0, 0) scale(1)`
			}
		};
		animations.registerAnimation({
			name: 'move',
			animation,
			presets: {
				duration: 400,
				easing: 'linear'
			}
		});
		animations.runAnimation(cdWrapperRef.current, 'move');
	};

	const afterEnter = () => {
		const cdWrapperDom = cdWrapperRef.current;
		animations.unregisterAnimation('move');
		cdWrapperDom.style.animation = '';
	};

	const leave = () => {
		if (!cdWrapperRef.current) {
			return;
		}
		const cdWrapperDom = cdWrapperRef.current;
		cdWrapperDom.style.transition = 'all 0.4s';
		const { x, y, scale } = _getPosAndScale();
		cdWrapperDom.style[transform] = `translate3d (${x} px, ${y} px, 0) scale (${scale})`;
	};

	const afterLeave = () => {
		if (!cdWrapperRef.current) return;
		const cdWrapperDom = cdWrapperRef.current;
		cdWrapperDom.style.transition = '';
		cdWrapperDom.style[transform] = '';
		// 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍
		// 不置为 none 现在全屏播放器页面还是存在
		normalPlayerRef.current.style.display = 'none';
	};

	return (
		<CSSTransition
			classNames="normal"
			in={fullScreen}
			timeout={400}
			mountOnEnter
			onEnter={enter}
			onEntered={afterEnter}
			onExit={leave}
			onExited={afterLeave}
		>
			<NormalPlayerContainer ref={normalPlayerRef}>
				<div className="background">
					<img
						src={song.al.picUrl + '?param=300x300'}
						width="100%"
						height="100%"
						alt="歌曲图片"
					/>
				</div>
				<div className="background layer"></div>
				<Top className="top">
					<div className="back" onClick={() => toggleFullScreen(false)}>
						<i className="iconfont icon-back">&#xe662;</i>
					</div>
					<h1 className="title">{song.name}</h1>
					<h1 className="subtitle">{getName(song.ar)}</h1>
				</Top>
				<Middle ref={cdWrapperRef}>
					<CDWrapper>
						<div className="cd">
							<img
								className="image play"
								src={song.al.picUrl + '?param=400x400'}
								alt=""
							/>
						</div>
					</CDWrapper>
				</Middle>
				<Bottom className="bottom">
					<ProgressWrapper>
            <span className='time time-l'>0:00</span>
            <div className='progress-bar-wrapper'>
              <ProgressBar percent={0.5}></ProgressBar>
            </div>
            <div className='time time-r'>4:17</div>
          </ProgressWrapper>
					<Operators>
						<div className="icon i-left">
							<i className="iconfont">&#xe625;</i>
						</div>
						<div className="icon i-left">
							<i className="iconfont">&#xe6e1;</i>
						</div>
						<div className="icon i-center">
							<i className="iconfont">&#xe723;</i>
						</div>
						<div className="icon i-right">
							<i className="iconfont">&#xe718;</i>
						</div>
						<div className="icon i-right">
							<i className="iconfont">&#xe640;</i>
						</div>
					</Operators>
				</Bottom>
			</NormalPlayerContainer>
		</CSSTransition>
	);
};

export default NormalPlayer;