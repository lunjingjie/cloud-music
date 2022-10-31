import React, { useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { findIndex, getName, prefixStyle, shuffle } from '../../../api/utils';
import {
	changeShowPlayList,
	changeCurrentIndex,
	deleteSong,
	changePlayList,
	changeSequecePlayList,
	changeCurrentSong,
	changePlayingState,
  changePlayMode
} from '../store/actionCreator';
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style';
import Scroll from '../../../baseUI/scroll';
import Confirm from '../../../baseUI/confirm';
import { playMode } from '../../../api/config';

function PlayList(props) {
	const {
		showPlayList,
		playList: immutablePlayList,
		currentSong: immutableCurrentSong,
		mode,
		currentIndex,
    sequencePlayList: immutableSequencePlayList
	} = props;
	const { togglePlayListDispatch, changeCurrentIndex, deleteSongDispatch, clearDispatch, changePlayListDispatch, changeModeDispatch } = props;

	const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
	const currentSong = immutableCurrentSong.toJS();

	const [isShow, setIsShow] = useState();
	const playListWrapperRef = useRef();
	const listWrapperRef = useRef();
	const confirmRef = useRef();

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
		if (newMode === 0) {
			// 顺序模式
			changePlayListDispatch(sequencePlayList);
			let index = findIndex(currentSong, sequencePlayList);
			changeCurrentIndex(index);
		} else if (newMode === 1) {
			// 单曲循环
			changePlayListDispatch(sequencePlayList);
		} else if (newMode === 2) {
			// 随机播放
			let newList = shuffle(sequencePlayList);
			let index = findIndex(currentSong, newList);
			changePlayListDispatch(newList);
			changeCurrentIndex(index);
		}
		changeModeDispatch(newMode);
	};

	const handleShowClear = (e) => {
		e.stopPropagation();
		confirmRef.current.show();
	};

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

	const handleConfirm = () => {
		clearDispatch();
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
							<span className="iconfont clear" onClick={(e) => handleShowClear(e)}>
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
				<Confirm ref={confirmRef} handleConfirm={handleConfirm}></Confirm>
			</PlayListWrapper>
		</CSSTransition>
	);
}

const mapStateToProps = (state) => ({
	showPlayList: state.getIn(['player', 'showPlayList']),
	playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
	currentSong: state.getIn(['player', 'currentSong']),
	mode: state.getIn(['player', 'mode']),
	currentIndex: state.getIn(['player', 'currentIndex'])
});

const mapDispatchToProps = (dispatch) => {
	return {
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    },
		togglePlayListDispatch(data) {
			dispatch(changeShowPlayList(data));
		},
		changeCurrentIndex(data) {
			dispatch(changeCurrentIndex(data));
		},
		deleteSongDispatch(data) {
			dispatch(deleteSong(data));
		},
    //修改当前的播放模式
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
		clearDispatch() {
			dispatch(changePlayList([]));
			dispatch(changeSequecePlayList([]));
			dispatch(changeCurrentIndex(-1));
			dispatch(changeShowPlayList(false));
			dispatch(changeCurrentSong({}));
			dispatch(changePlayingState(false));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));
