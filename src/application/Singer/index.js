import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Header from '../../baseUI/header';
import SongsList from '../SongsList';
import { Container, ImageWrapper, CollectButton, SongListWrapper, BgLayer } from './style';
import Scroll from '../../baseUI/scroll';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoading, getSingerDetail } from './store/actionCreator';
import Loading from '../../baseUI/loading';

const Singer = (props) => {

  const { artist, songsOfArtist, loading } = useSelector((state) => ({
    artist: state.getIn(['singer', 'artist']).toJS(),
    songsOfArtist: state.getIn(['singer', 'songsOfArtist']).toJS(),
    loading: state.getIn(['singer', 'loading']),
  }));

  const dispatch = useDispatch();

  const [showStatus, setShowStatus] = useState(true);
  const songListWrapper = useRef();
  const imageWrapper = useRef();
  const layer = useRef();
  const songScroll = useRef();
  const collectButton = useRef();
  const header = useRef();

  // 图片初始高度
  const initialHeight = useRef(0);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;
  const HEADER_HEIGHT = 45;

  const id = props.match.params.id;

  useEffect(() => {
    dispatch(changeLoading(true));
    dispatch(getSingerDetail(id));
		let h = imageWrapper.current.offsetHeight;
		songListWrapper.current.style.top = `${h - OFFSET}px`;
		initialHeight.current = h;
		layer.current.style.top = `${h - OFFSET}px`;
		songScroll.current.refresh();
  }, []);

  const setShowStatusFlag = useCallback(() => {
    setShowStatus(false);
  });

  // 滚动操作
  const handleScroll = useCallback((pos) => {
    const newY = pos.y;
    const imgHeight = initialHeight.current;
    const layerDom = layer.current;
    const imageWrapperDom = imageWrapper.current;
    const collectButtonDom = collectButton.current;
    const headerDom = header.current;
    // minScrollY为负数
    const minScrollY = -imgHeight + OFFSET + HEADER_HEIGHT;
    const percent = Math.abs(newY / imgHeight);

    // 页面向下方向滚动,图片变大，按钮跟着移动
    if (newY > 0) {
      // 图片变大
      imageWrapperDom.style.transform = `scale(${1 + percent})`;
      // 白色遮罩移动
      layerDom.style.top = `${imgHeight + newY - OFFSET}px`;
      // 收藏按钮跟随移动
      collectButtonDom.style.transform = `translate3d(0, ${newY}px, 0)`;
    } else if (newY >= minScrollY) {
      // 遮罩移动，且优先级比图片高
      layerDom.style.top = `${imgHeight - OFFSET - Math.abs(newY)}px`;
      layerDom.style.zIndex = 1;
      imageWrapperDom.style.zIndex = -1;
      imageWrapperDom.style.height = 0;
      imageWrapperDom.style.paddingTop = '75%';
      // 按钮移动，透明度减小
      collectButtonDom.style.transform = `translate3d(0, ${newY}px, 0)`;
      collectButtonDom.style.opacity = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      layerDom.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDom.style.zIndex = 1;
      headerDom.style.zIndex = 100;
      // 设置图片高度与顶部一致，作为背景
      imageWrapperDom.style.height = `${HEADER_HEIGHT}px`;
      imageWrapperDom.style.paddingTop = 0;
      imageWrapperDom.style.zIndex = 99;
    }

  }, [])

  return (
		<CSSTransition
			in={showStatus}
			timeout={300}
			classNames="fly"
			appear={true}
			unmountOnExit
			onExited={() => props.history.goBack()}
		>
			<Container>
				<Header ref={header} title={'返回'} handleClick={setShowStatusFlag}></Header>
				<ImageWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
					<div className="filter"></div>
				</ImageWrapper>
				<CollectButton ref={collectButton}>
					<i className="iconfont">&#xe62d;</i>
					<span className="text"> 收藏 </span>
				</CollectButton>
				<BgLayer ref={layer}></BgLayer>
				<SongListWrapper ref={songListWrapper}>
					<Scroll ref={songScroll} onScroll={handleScroll}>
						<SongsList showCollect={false} songs={songsOfArtist}></SongsList>
					</Scroll>
				</SongListWrapper>
        {loading ? <Loading></Loading> : null}
			</Container>
		</CSSTransition>
  );
}

export default React.memo(Singer);