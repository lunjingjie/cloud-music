import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import Header from '../../baseUI/header';
import SongsList from '../SongsList';
import { Container, ImageWrapper, CollectButton, SongListWrapper, BgLayer } from './style';
import Scroll from '../../baseUI/scroll';

const Singer = (props) => {
  
  const [showStatus, setShowStatus] = useState(true);
  const songListWrapper = useRef();
  const imageWrapper = useRef();
  const layer = useRef();
  const songScroll = useRef();

  // 图片初始高度
  const initialHeight = useRef(0);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
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
  const handleScroll = (pos) => {
    console.log(pos);
  }

  const artist = {
    picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{name: "薛之谦"}],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{name: "薛之谦"}],
        al: {
          name: "薛之谦专辑"
        }
      },
    ],
  };

  return (
		<Transition
			in={showStatus}
			timeout={300}
			classNames="fly"
			appear={true}
			unmountOnExit
			onExited={() => props.history.goBack()}
		>
			<Container>
				<Header title={'头部'} handleClick={setShowStatusFlag}></Header>
				<ImageWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
					<div className="filter"></div>
				</ImageWrapper>
				<CollectButton>
					<i className="iconfont">&#xe62d;</i>
					<span className="text"> 收藏 </span>
				</CollectButton>
        <BgLayer ref={layer}></BgLayer>
				<SongListWrapper ref={songListWrapper}>
					<Scroll ref={songScroll} onScroll={handleScroll}>
						<SongsList showCollect={false} songs={artist.hotSongs}></SongsList>
					</Scroll>
				</SongListWrapper>
			</Container>
		</Transition>
  );
}

export default React.memo(Singer);