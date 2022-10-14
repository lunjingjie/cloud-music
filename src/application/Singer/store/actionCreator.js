import { fromJS } from "immutable";
import { getSingerInfoRequest } from "../../../api/request";
import { CHANGE_ARTIST, CHANGE_LOADING, CHANGE_SONGS_OF_ARTIST } from "./constants";

const changeArtist = (data) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data),
})

const changeSongsOfArtist = (data) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data),
})

export const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data,
})

export const getSingerDetail = (id) => {
  return async (dispatch) => {
    try {
      const data = await getSingerInfoRequest(id);
      dispatch(changeArtist(data.artist));
      dispatch(changeSongsOfArtist(data.hotSongs));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(changeLoading(false));
    }
  }
}