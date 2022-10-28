import React, { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { getName, prefixStyle } from '../../../api/utils';
import { changeShowPlayList, changeCurrentIndex, deleteSong } from '../store/actionCreator';
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style';
import Scroll from '../../../baseUI/scroll';
import { playMode } from '../../../api/config';

function PlayList(props) {
	const {
		showPlayList,
		playList: immutablePlayList,
		currentSong: immutableCurrentSong,
		mode,
		currentIndex
	} = props;
	const { togglePlayListDispatch, changeCurrentIndex, deleteSongDispatch } = props;

	const playList = immutablePlayList.toJS();
	const currentSong = immutableCurrentSong.toJS();

	const [isShow, setIsShow] = useState();
	const playListWrapperRef = useRef();
	const listWrapperRef = useRef();

	const transform = prefixStyle('transform');

	// 列表准备进入屏幕时，一开始通过位移隐藏在底部
	const onEnterCB = useCallback(() => {
		setIsShow(true);
		listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)';
	}, [transform]);

	const onEnteringCB = useCallback(() => {
		listWrapperRef.current.style.transition = 'all 0.3s';
		listWrapperRef.current.style[transform] = 'translate3d(0, 0, 0)';
	}, [transform]);

	const onExitingCB = useCallback(() => {
		listWrapperRef.current.style.transition = 'all 0.3s';
		listWrapperRef.current.style[transform] = 'tranlate3d(0, 100%, 0)';
	}, [transform]);

	const onExitedCB = useCallback(() => {
		setIsShow(false);
		listWrapperRef.current.style[transform] = 'tranlate3d(0, 100%, 0)';
	}, [transform]);

	const getPlayMode = () => {
		let content, text;
		if (mode === playMode.sequence) {
			content = '&#xe625;';
			text = '顺序播放';
		} else if (mode === playMode.loop) {
			content = '&#xe653;';
			text = '单曲循环';
		} else {
			content = '&#xe61b;';
			text = '随机播放';
		}
		return (
			<div>
				<i
					className="iconfont"
					onClick={(e) => changeMode(e)}
					dangerouslySetInnerHTML={{ __html: content }}
				></i>
				<span className="text" onClick={(e) => changeMode(e)}>
					{text}
				</span>
			</div>
		);
	};

	const changeMode = () => {
		let newMode = (mode + 1) % 3;
	};

	const handleShowClear = () => {};

	const getCurrentIcon = (item) => {
		const isCurr = currentSong.id === item.id;
		const className = isCurr ? 'icon-play' : '';
		const content = isCurr ? '&#xe6e3;' : '';
		return (
			<i
				className={`current iconfont ${className}`}
				dangerouslySetInnerHTML={{ __html: content }}
			></i>
		);
	};

	const handleChangeCurrentIndex = (e, index) => {
		if (currentIndex === index) {
			return;
		}
		changeCurrentIndex(index);
		e.stopPropagation();
	};

	const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    deleteSongDispatch(song);
  };

	return (
		<CSSTransition
			in={showPlayList}
			timeout={300}
			classNames="list-fade"
			onEnter={onEnterCB}
			onEntering={onEnteringCB}
			onExiting={onExitingCB}
			onExited={onExitedCB}
		>
			<PlayListWrapper
				ref={playListWrapperRef}
				style={isShow ? { display: 'block' } : { display: 'none' }}
				onClick={() => togglePlayListDispatch(false)}
			>
				<div className="list_wrapper" ref={listWrapperRef}>
					<ListHeader>
						<h1 className="title">
							{getPlayMode()}
							<span className="iconfont clear" onClick={handleShowClear}>
								&#xe63d;
							</span>
						</h1>
					</ListHeader>
					<ScrollWrapper>
						<Scroll>
							<ListContent>
								{playList.map((item, index) => {
									return (
										<li
											className="item"
											key={item.id}
											onClick={(e) => handleChangeCurrentIndex(e, index)}
										>
											{getCurrentIcon(item)}
											<span className="text">
												{item.name} - {getName(item.ar)}
											</span>
											<span className="like">
												<i className="iconfont">&#xe601;</i>
											</span>
											<span
												className="delete"
												onClick={(e) => handleDeleteSong(e, item)}
											>
												<i className="iconfont">&#xe63d;</i>
											</span>
										</li>
									);
								})}
							</ListContent>
						</Scroll>
					</ScrollWrapper>
				</div>
			</PlayListWrapper>
		</CSSTransition>
	);
}

const mapStateToProps = (state) => ({
	showPlayList: state.getIn(['player', 'showPlayList']),
	playList: state.getIn(['player', 'playList']),
	currentSong: state.getIn(['player', 'currentSong']),
	mode: state.getIn(['player', 'mode']),
	currentIndex: state.getIn(['player', 'currentIndex'])
});

const mapDispatchToProps = (dispatch) => {
	return {
		togglePlayListDispatch(data) {
			dispatch(changeShowPlayList(data));
		},
		changeCurrentIndex(data) {
			dispatch(changeCurrentIndex(data));
		},
		deleteSongDispatch(data) {
			dispatch(deleteSong(data));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));
