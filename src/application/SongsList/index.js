import React from 'react';
import { useDispatch } from 'react-redux';
import { getCount, getName } from '../../api/utils';
import { changeCurrentIndex, changePlayList, changeSequecePlayList } from '../Player/store/actionCreator';
import { SongItem, SongList } from './style';

// 封装歌单列表
const SongsList = React.forwardRef((props, refs) => {
	const { collectCount, showCollect, songs } = props;
  const { musicAnimation } = props;

	const totalCount = songs.length;

  const dispatch = useDispatch();

	const collect = (count) => {
		return (
			<div className="add_list">
				<i className="iconfont">&#xe62d;</i>
				<span>收藏({getCount(count)})</span>
			</div>
		);
	};

  const changeSong = (e, index) => {
    dispatch(changePlayList(songs));
    dispatch(changeSequecePlayList(songs));
    dispatch(changeCurrentIndex(index));
    // 触发选择后的动画效果(回调函数)
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  }

	const songList = (list) => {
		return (
			<SongItem>
				{list.map((item, index) => {
					return (
						<li key={index} onClick={(e) => changeSong(e, index)}>
							<span className="index">{index + 1}</span>
							<div className="info">
								<span>{item.name}</span>
								<span>
									{item.ar ? getName(item.ar) : getName(item.artists)} -{' '}
									{item.al ? item.al.name : item.album.name}
								</span>
							</div>
						</li>
					);
				})}
			</SongItem>
		);
	};

	return (
		<SongList ref={refs} showBackground={props.showBackground}>
			<div className="first_line">
				<div className="play_all">
					<i className="iconfont">&#xe6e3;</i>
					<span>
						播放全部 <span className="sum">(共{totalCount}首)</span>
					</span>
				</div>
				{showCollect ? collect(collectCount) : null}
			</div>
			{songList(songs)}
		</SongList>
	);
});

export default React.memo(SongsList);
