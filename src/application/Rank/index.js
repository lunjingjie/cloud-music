import React, { useEffect } from 'react';
import Scroll from '../../baseUI/scroll';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoading, getRankList } from './store/actionCreator';
import { Container, List, ListItem, SongList } from './style';
import { renderRoutes } from 'react-router-config';

function Rank(props) {
  const { rankList, loading } = useSelector((state) => ({
    rankList: state.getIn(['rank', 'rankList']).toJS(),
    loading: state.getIn(['rank', 'loading']),
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLoading(true));
    dispatch(getRankList());
  }, [dispatch]);

  let officeList = rankList.filter((item) => item.tracks.length > 0);
  let globalList = rankList.filter((item) => item.tracks.length === 0);

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`);
  }

  // 渲染官方榜歌手列表
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  // 渲染排行列表
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgUrl} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className='img_wrapper'>
                  <img src={item.coverImgUrl} alt=""/>
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                { renderSongList(item.tracks) }
              </ListItem>
            );
          })
        }
      </List>
    );
  }

  // 主页面UI
  let displayStyle = loading ? { display: 'none' } : { display: '' };
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className='offical' style={ displayStyle }>官方榜</h1>
          { renderRankList(officeList) }
          <h1 className='global' style={ displayStyle }>全球榜</h1>
          { renderRankList(globalList, true) }
        </div>
      </Scroll>
      {
        renderRoutes(props.route.routes)
      }
    </Container>
  );
}

export default React.memo(Rank);