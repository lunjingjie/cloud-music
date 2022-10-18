import React from 'react';
import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';

const MiniPlayer = (props) => {
	const { song, fullScreen } = props;
  const { toggleFullScreen } = props;

  const toggleFull = () => {
    toggleFullScreen(true);
  }

	return (
		<CSSTransition in={!fullScreen} timeout={400} classNames="mini">
			<MiniPlayerContainer>
				<div className="icon" onClick={() => toggleFull()}>
					<div className="img_wrapper">
						<img
							className="play"
							src={song.al.picUrl}
							width={40}
							height={40}
							alt={'img'}
						/>
					</div>
				</div>
				<div className="text">
					<h2 className="name">{song.name}</h2>
					<p className="desc">{getName(song.ar)}</p>
				</div>
				<div className="control">
					<i className="iconfont">&#xe650;</i>
				</div>
				<div className="control">
					<i className="iconfont">&#xe640;</i>
				</div>
			</MiniPlayerContainer>
		</CSSTransition>
	);
};

export default React.memo(MiniPlayer);
