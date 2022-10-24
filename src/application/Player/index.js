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
import { playList } from './mock';
import { getSongUrl } from '../../api/utils';

const Player = (props) => {
	let { fullScreen, playing, currentIndex } = props;
	const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentDispatch } = props;
  const audioRef = useRef();

  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  // 歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

	const currentSong = {
		al: { picUrl: 'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg' },
		name: '木偶人',
		ar: [{ name: '薛之谦' }]
	};

  const clickPlaying = (e, state) => {
    // 阻止事件传播，因为还有setFullScreen的事件
    e.stopPropagation();
    togglePlayingDispatch(state);
  }

  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  }

  useEffect(() => {
    if (!currentSong) {
      return;
    }
    changeCurrentIndexDispatch(0);
    let current = playList[0];
    changeCurrentDispatch(current);
    audioRef.current.src = getSongUrl(current.id);
    // setTimeout(() => {
    //   audioRef.current.play();
    // });
    // togglePlayingDispatch(true);
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
  }, []);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  }

	return (
		<div>
			<MiniPlayer
				song={currentSong}
				fullScreen={fullScreen}
				percent={percent}
        playing={playing}
        toggleFullScreen={toggleFullScreenDispatch}
        clickPlaying={clickPlaying}
			></MiniPlayer>
			<NormalPlayer
				song={currentSong}
				fullScreen={fullScreen}
				toggleFullScreen={toggleFullScreenDispatch}
        playing={playing}
        duration={duration}
        currentTime={currentTime}
        percent={percent}
        clickPlaying={clickPlaying}
        onProgressChange={onProgressChange}
			></NormalPlayer>
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
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
