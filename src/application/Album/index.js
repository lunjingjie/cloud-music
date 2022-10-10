import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, TopInfoWrapper, Menu, SongList, SongItem } from './style';
import { CSSTransition } from 'react-transition-group';
import Header from '../../baseUI/header';
import { getCount, getName, isEmptyObject } from '../../api/utils';
import Scroll from '../../baseUI/scroll';
import style from '../../assets/global-style';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentAlbumById, changeEnterLoading } from './store/actionCreator';

const Album = (props) => {
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false);
  const [title, setTitle] = useState('歌单');
  const headerEl = useRef();

  const handleBack = () => {
    setShowStatus(false);
  }

  const { enterLoading, currentAlbum } = useSelector((state) => ({
    enterLoading: state.getIn(['album', 'enterLoading']),
    currentAlbum: isEmptyObject(state.getIn(['album', 'currentAlbum']).toJS()) ? {} : state.getIn(['album', 'currentAlbum']).toJS(),
  }));

  const dispatch = useDispatch();
  const id = props.match.params.id;
  
  // 初始化加载歌单信息
  useEffect(() => {
    dispatch(changeEnterLoading(true));
    dispatch(getCurrentAlbumById(id));
  }, [dispatch, id]);

  // 顶部跑马灯滑动处理
  const HEADER_HEIGHT = 45;
  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current;
    // 滑动距离大于顶部高度
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style['theme-color'];
      // percent肯定大于1
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = '';
      headerDom.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  }, [currentAlbum]);

  // 顶部封面
  const renderTopInfo = () => {
    return (
      <TopInfoWrapper background={currentAlbum.coverImgUrl}>
        {/* 背景虚化效果 */}
        <div className='background'>
          <div className='filter'></div>
        </div>
        <div className='img_wrapper'>
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt={currentAlbum.name} width='100%' height='100%'></img>
          <div className='play_count'>
            <i className="iconfont play">&#xe885;</i>
            <span>{getCount(currentAlbum.subscribedCount)}</span>
          </div>
        </div>
        <div className='title_info'>
          <div className='title'>{currentAlbum.name}</div>
          <div className='author_info'>
            <img src={currentAlbum.creator.avatarUrl} alt={currentAlbum.creator.nickname} width='100%' height='100%'></img>
            <span>{currentAlbum.creator.nickname}</span>
          </div>
        </div>
      </TopInfoWrapper>
    );
  }
  
  // 中间操作栏
  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    )
  }

  // 歌单列表
  const renderSongList = () => {
    return (
      <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>播放全部 <span className="sum">(共{currentAlbum.tracks.length}首)</span></span>
          </div>
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
          </div>
        </div>
        <SongItem>
          {
            currentAlbum.tracks.map((item, index) => {
              return (
                <li key={index}>
                  <span className="index">{index + 1}</span>
                  <div className="info">
                    <span>{item.name}</span>
                    <span>
                      {getName(item.ar)} - {item.al.name}
                    </span>
                  </div>
                </li>
              )
            })
          }
        </SongItem>
      </SongList>
    );
  }

  return (
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header ref={headerEl} isMarquee={isMarquee} title={title} handleClick={handleBack}></Header>
        {
          !isEmptyObject(currentAlbum) ?
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              { renderTopInfo() }
              { renderMenu() }
              { renderSongList() }
            </div>
          </Scroll> : null
        }
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);