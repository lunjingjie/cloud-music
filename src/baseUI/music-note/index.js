import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { prefixStyle } from '../../api/utils';
import style from '../../assets/global-style';

const Container = styled.div`
	.icon_wrapper {
		position: fixed;
		z-index: 1000;
		margin-top: -10px;
		margin-left: -10px;
		color: ${style['theme-color']};
		font-size: 14px;
		display: none;
		transition: transform 1s cubic-bezier(0.6, -0.1, 0.86, 0.57);
		transform: translate3d(0, 0, 0);
		> div {
			transition: transform 1s;
		}
	}
`;

const MusicNote = forwardRef((props, ref) => {
	const iconsRef = useRef();
	const ICON_NUMBER = 3;

	const transform = prefixStyle('transform');

  const createNode = (txt) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    let temNode = document.createElement('div');
    temNode.innerHTML = template;
    return temNode.firstChild;
  }

  const startAnimation = ({x, y}) => {
    for (let i = 0; i < ICON_NUMBER; i += 1) {
      let domArray = [].slice.call(iconsRef.current.children);
      let item = domArray[i];
      if (!item.running) {
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.display = 'inline-block';

        setTimeout(() => {
          item.running = true;
          item.style.transform = 'translate3d(0, 750px, 0)';
          let icon = item.querySelector('div');
          icon.style.transform = 'translate3d(-40px, 0, 0)';
        }, 20);
        break;
      }
    }
  }

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i += 1) {
      let node = createNode(`<div class="iconfont">&#xe642;</div>`);
      iconsRef.current.appendChild(node);
    }
    console.log(iconsRef.current.children);
    // 类数组转换为数组
    let domArray = [].slice.call(iconsRef.current.children);
    domArray.forEach(item => {
      item.running = false;
      item.addEventListener('transitionend', function() {
        this.style.display = 'none';
        this.style.transform = 'translate3d(0, 0, 0)';
        this.running = false;
        let icon = this.querySelector('div');
        icon.style.transform = 'translate3d(0, 0, 0)';
      }, false);
    });
    // true为捕获，false为冒泡（默认false）
  }, []);

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

	return <Container ref={iconsRef}></Container>;
});

export default React.memo(MusicNote);
