import { fromJS } from "immutable";
import { getAlbumDetailRequest } from "../../../api/request";
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from "./constants";

const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
})

export const getCurrentAlbumById = (id) => {
  return async (dispatch) => {
    try {
      const data = await getAlbumDetailRequest(id);
      dispatch(changeCurrentAlbum(data.playlist));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(changeEnterLoading(false));
    }
  }
}