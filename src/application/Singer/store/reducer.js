import { fromJS } from "immutable";
import { CHANGE_ARTIST, CHANGE_LOADING, CHANGE_SONGS_OF_ARTIST } from "./constants";

const defaultState = fromJS({
  artist: {},
  songsOfArtist: [],
  loading: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_ARTIST: return state.set('artist', action.data);
    case CHANGE_SONGS_OF_ARTIST: return state.set('songsOfArtist', action.data);
    case CHANGE_LOADING: return state.set('loading', action.data);
    default: return state;
  }
}