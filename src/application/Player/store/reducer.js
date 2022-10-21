import { fromJS } from 'immutable';
import { playMode } from "../../../api/config";
import { SET_CURRENT_INDEX, SET_CURRENT_SONG, SET_FULL_SCREEN, SET_PLAYING_STATE, SET_PLAYLIST, SET_PLAY_MODE, SET_SEQUECE_PLAYLIST, SET_SHOW_PLAYLIST } from "./constants";

const defaultState = fromJS({
  fullScreen: true, // 是否为全屏
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_FULL_SCREEN: return state.set('fullScreen', action.data);
    case SET_PLAYING_STATE: return state.set('playing', action.data);
    case SET_SEQUECE_PLAYLIST: return state.set('sequencePlayList', action.data);
    case SET_PLAY_MODE: return state.set('mode', action.data);
    case SET_CURRENT_INDEX: return state.set('currentIndex', action.data);
    case SET_SHOW_PLAYLIST: return state.set('showPlayList', action.data);
    case SET_CURRENT_SONG: return state.set('currentSong', action.data);
    case SET_PLAYLIST: return state.set('playList', action.data);
    default: return state;
  }
}