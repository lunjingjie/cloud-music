import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import { ScrollContainer, PullUpLoading, PullDownLoading } from "./style";
import Loading from "../loading";
import LoadingV2 from "../loading-v2";

/**
 * scroll 组件在业务中会被经常取到原生 DOM 对象，而函数式组件天生不具备被上层组件直接调用 ref 的条件，
 * 因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹
 */
const Scroll = forwardRef((props, ref) => {
  // 实例对象
  const [bScroll, setBScroll] = useState();
  // current指向初始化bs实例需要的DOM元素
  const scrollContainerRef = useRef();

  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;

  // 第二个参数为空数组，只渲染一次（render执行后）。return用于组件卸载时调用
  // 创建better-scroll
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
  }, []);

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 绑定scroll事件
  useEffect(() => {
    if (!bScroll || !onScroll) {
      return;
    }
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off(onScroll);
    }
  }, [bScroll, onScroll]);

  // 进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) {
      return;
    }
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [bScroll, pullUp]);

  // 进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) {
      return;
    }
    bScroll.on('touchEnd', (pos) => {
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [bScroll, pullDown]);

  // 暴露方法给上层组件调用
  useImperativeHandle(ref, () => ({
    // 给外界暴露refresh方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  const pullUpDisplayStyle = pullUpLoading ? { display: '' } : { display: 'none'};
  const pullDownDisplayStyle = pullDownLoading ? { display: '' } : { display: 'none'};

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 底部加载更多动画 */}
      <PullUpLoading style={ pullUpDisplayStyle }><Loading></Loading></PullUpLoading>
      {/* 顶部重新加载数据动画 */}
      <PullDownLoading style={ pullDownDisplayStyle }><LoadingV2></LoadingV2></PullDownLoading>
    </ScrollContainer>
  );
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
}

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
}

export default Scroll;