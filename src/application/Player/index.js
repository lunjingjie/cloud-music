import React, { useEffect } from 'react';
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

const Player = (props) => {
	let { fullScreen, playing } = props;
	const { toggleFullScreenDispatch, togglePlayingDispatch } = props;

	const currentSong = {
		al: { picUrl: 'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg' },
		name: '木偶人',
		ar: [{ name: '薛之谦' }]
	};

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  }

	return (
		<div>
			<MiniPlayer
				song={currentSong}
				fullScreen={fullScreen}
				percent={0.2}
        playing={playing}
        toggleFullScreen={toggleFullScreenDispatch}
        clickPlaying={clickPlaying}
			></MiniPlayer>
			<NormalPlayer
				song={currentSong}
				fullScreen={fullScreen}
				toggleFullScreen={toggleFullScreenDispatch}
			></NormalPlayer>
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
