import React, { useEffect, useRef } from 'react';
import {
	NormalPlayerContainer,
	Bottom,
	Middle,
	Top,
	CDWrapper,
	Operators,
	ProgressWrapper,
  LyricContainer,
  LyricWrapper,
} from './style';
import { formatPlayTime, getName, prefixStyle } from '../../../api/utils';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';
import ProgressBar from '../../../baseUI/progress/progress-bar';
import { playMode } from '../../../api/config';
import Scroll from '../../../baseUI/scroll';

const NormalPlayer = (props) => {
	const {
		song,
		fullScreen,
		playing,
		currentTime,
		duration,
		percent,
		mode,
		currentLineNum,
		currentPlayingLyric,
		currentLyric
	} = props;
	const { toggleFullScreen, clickPlaying, onProgressChange, handlePrev, handleNext, changeMode } =
		props;

	const normalPlayerRef = useRef();
	const cdWrapperRef = useRef();
	// 保存封面与歌词的切换状态
	const currentState = useRef('');
	const lyricScrollRef = useRef();
  // 保存每一行歌词的dom对象
  const lyricLineRefs = useRef({});

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

	const getPlayMode = () => {
		let content;
		if (mode === playMode.sequence) {
			content = '&#xe625;';
		} else if (mode === playMode.loop) {
			content = '&#xe653;';
		} else {
			content = '&#xe61b;';
		}
		return content;
	};

  const toggleCurrentState = () => {
    currentState.current !== 'lyric' ? currentState.current = 'lyric' : currentState.current = '';
  }

  useEffect(() => {
    if (!lyricScrollRef.current) {
      return;
    }
    let bScroll = lyricScrollRef.current.getBScroll();
    if (currentLineNum > 5) {
      let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

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
				<Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
					<CSSTransition
						timeout={400}
						classNames="fade"
						in={currentState.current !== 'lyric'}
					>
						<CDWrapper
							style={{
								visibility: currentState.current !== 'lyric' ? 'visible' : 'hidden'
							}}
						>
							<div className="cd">
								<img
									className={`image play ${playing ? '' : 'pause'}`}
									src={song.al.picUrl + '?param=400x400'}
									alt=""
								/>
							</div>
							<p className="playing_lyric">{currentPlayingLyric}</p>
						</CDWrapper>
					</CSSTransition>
					<CSSTransition
						timeout={400}
						classNames="fade"
						in={currentState.current === 'lyric'}
					>
						<LyricContainer>
							<Scroll ref={lyricScrollRef}>
								<LyricWrapper
									style={{
										visibility: currentState.current === 'lyric' ? 'visible' : 'hidden'
									}}
									className="lyric_wrapper"
								>
                  {
                    currentLyric ? currentLyric.lines.map((item, index) => {
                      lyricLineRefs.current[index] = React.createRef();
                      return (
                        <p className={`text ${currentLineNum === index ? "current" : ""}`}
                           key={item + index}
                           ref={lyricLineRefs.current[index]}>
                            {item.txt}
                        </p>
                      );
                    }) : <p className="text pure"> 纯音乐，请欣赏。</p>
                  }
                </LyricWrapper>
							</Scroll>
						</LyricContainer>
					</CSSTransition>
				</Middle>
				<Bottom className="bottom">
					<ProgressWrapper>
						<span className="time time-l">{formatPlayTime(currentTime)}</span>
						<div className="progress-bar-wrapper">
							<ProgressBar
								percent={percent}
								percentChange={onProgressChange}
							></ProgressBar>
						</div>
						<div className="time time-r">{formatPlayTime(duration)}</div>
					</ProgressWrapper>
					<Operators>
						<div className="icon i-left" onClick={changeMode}>
							<i
								className="iconfont"
								dangerouslySetInnerHTML={{ __html: getPlayMode() }}
							></i>
						</div>
						<div className="icon i-left" onClick={handlePrev}>
							<i className="iconfont">&#xe6e1;</i>
						</div>
						<div className="icon i-center" onClick={(e) => clickPlaying(e, !playing)}>
							<i
								className="iconfont"
								dangerouslySetInnerHTML={{
									__html: playing ? '&#xe723;' : '&#xe731;'
								}}
							></i>
						</div>
						<div className="icon i-right" onClick={handleNext}>
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
