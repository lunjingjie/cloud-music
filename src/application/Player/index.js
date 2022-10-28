import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import {
	changePlayingState,
	changeShowPlayList,
	changeCurrentIndex,
	changeCurrentSong,
	changePlayList,
	changePlayMode,
	changeFullScreen
} from './store/actionCreator';
// import { playList } from './mock';
import { findIndex, getSongUrl, isEmptyObject, shuffle } from '../../api/utils';
import Toast from '../../baseUI/Toast';
import PlayList from './playList';

const Player = (props) => {
	let {
		fullScreen,
		playing,
		currentIndex,
		currentSong: immutableCurrentSong,
		playList: immutablePlayList,
		mode,
		sequencePlayList: immutableSequencePlayList
	} = props;

	const currentSong = immutableCurrentSong.toJS();
	const playList = immutablePlayList.toJS();
	const sequencePlayList = immutableSequencePlayList.toJS();

	const {
		toggleFullScreenDispatch,
		togglePlayingDispatch,
    togglePlayListDispatch,
		changeCurrentIndexDispatch,
		changeCurrentDispatch,
		changePlayListDispatch,
		changeModeDispatch
	} = props;

	const [modeText, setModeText] = useState();

	const audioRef = useRef();
	const toastRef = useRef();

	// 目前播放时间
	const [currentTime, setCurrentTime] = useState(0);
	// 歌曲总时长
	const [duration, setDuration] = useState(0);
	// 歌曲播放进度
	let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
	// 记录之前的歌曲，比对是否与当前为同一首
	const [preSong, setPreSong] = useState({});

	const clickPlaying = (e, state) => {
		// 阻止事件传播，因为还有setFullScreen的事件
		e.stopPropagation();
		togglePlayingDispatch(state);
	};

	const onProgressChange = (curPercent) => {
		const newTime = curPercent * duration;
		setCurrentTime(newTime);
		audioRef.current.currentTime = newTime;
		// if (!playing) {
		//   togglePlayingDispatch(true);
		// }
	};

	const changeMode = () => {
		let newMode = (mode + 1) % 3;
		if (newMode === 0) {
			// 顺序模式
			changePlayListDispatch(sequencePlayList);
			let index = findIndex(currentSong, sequencePlayList);
			changeCurrentIndexDispatch(index);
			setModeText('顺序播放');
		} else if (newMode === 1) {
			// 单曲循环
			changePlayListDispatch(sequencePlayList);
			setModeText('单曲循环');
		} else if (newMode === 2) {
			// 随机播放
			let newList = shuffle(sequencePlayList);
			let index = findIndex(currentSong, newList);
			changePlayListDispatch(newList);
			changeCurrentIndexDispatch(index);
			setModeText('随机播放');
		}
		changeModeDispatch(newMode);
		toastRef.current.show();
	};

	// 切歌
	useEffect(() => {
		if (
			!playList.length ||
			currentIndex === -1 ||
			!playList[currentIndex] ||
			playList[currentIndex].id === preSong.id
		) {
			return;
		}
		let current = playList[currentIndex];
		changeCurrentDispatch(current);
		setPreSong(current);
		audioRef.current.src = getSongUrl(current.id);
		setTimeout(() => {
			audioRef.current.play().then(() => {
        togglePlayingDispatch(true);
        setCurrentTime(0);
        setDuration((current.dt / 1000) | 0);
      }).catch(e => {
        alert('歌曲不存在');
      });
		});
	}, [playList, currentIndex]);

	useEffect(() => {
		playing ? audioRef.current.play() : audioRef.current.pause();
	}, [playing]);

	const updateTime = (e) => {
		setCurrentTime(e.target.currentTime);
	};

	const handleLoop = () => {
		audioRef.current.currentTime = 0;
		togglePlayingDispatch(true);
		audioRef.current.play();
	};

	const handlePrev = () => {
		if (playList.length === 1) {
			handleLoop();
			return;
		}
		let index = currentIndex - 1;
		if (index < 0) {
			index = playList.length - 1;
		}
		if (!playing) {
			togglePlayingDispatch(true);
		}
		changeCurrentIndexDispatch(index);
	};

	const handleNext = () => {
		if (playing.length === 1) {
			handleLoop();
			return;
		}
		let index = currentIndex + 1;
		if (index === playList.length) {
			index = 0;
		}
		if (!playing) {
			togglePlayingDispatch(true);
		}
		changeCurrentIndexDispatch(index);
	};

	return (
		<div>
			{!isEmptyObject(currentSong) ? (
				<MiniPlayer
					song={currentSong}
					fullScreen={fullScreen}
					percent={percent}
					playing={playing}
					toggleFullScreen={toggleFullScreenDispatch}
					clickPlaying={clickPlaying}
          togglePlayList={togglePlayListDispatch}
				></MiniPlayer>
			) : null}
			{!isEmptyObject(currentSong) ? (
				<NormalPlayer
					song={currentSong}
					fullScreen={fullScreen}
					toggleFullScreen={toggleFullScreenDispatch}
					playing={playing}
					duration={duration}
					currentTime={currentTime}
					percent={percent}
					mode={mode}
					changeMode={changeMode}
					handlePrev={handlePrev}
					handleNext={handleNext}
					clickPlaying={clickPlaying}
					onProgressChange={onProgressChange}
				></NormalPlayer>
			) : null}
			<audio
				ref={audioRef}
				onTimeUpdate={updateTime}
			></audio>
			<Toast ref={toastRef} text={modeText}></Toast>
      <PlayList></PlayList>
		</div>
	);
};

const mapStateToProps = (state) => ({
	fullScreen: state.getIn(['player', 'fullScreen']),
	playing: state.getIn(['player', 'playing']),
	currentSong: state.getIn(['player', 'currentSong']),
	showPlayList: state.getIn(['player', 'showPlayList']),
	mode: state.getIn(['player', 'mode']),
	currentIndex: state.getIn(['player', 'currentIndex']),
	playList: state.getIn(['player', 'playList']),
	sequencePlayList: state.getIn(['player', 'sequencePlayList'])
});

const mapDispatchToProps = (dispatch) => {
	return {
		togglePlayingDispatch(data) {
			dispatch(changePlayingState(data));
		},
		toggleFullScreenDispatch(data) {
			dispatch(changeFullScreen(data));
		},
		togglePlayListDispatch(data) {
			dispatch(changeShowPlayList(data));
		},
		changeCurrentIndexDispatch(index) {
			dispatch(changeCurrentIndex(index));
		},
		changeCurrentDispatch(data) {
			dispatch(changeCurrentSong(data));
		},
		changeModeDispatch(data) {
			dispatch(changePlayMode(data));
		},
		changePlayListDispatch(data) {
			dispatch(changePlayList(data));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
