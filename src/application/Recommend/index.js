import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import styled from 'styled-components';
import { actionCreators } from './store';
import { connect } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading';
import { renderRoutes } from 'react-router-config';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.play ? '60px' : 0};
  width: 100%;
`

function Recommend(props) {
  const { bannerList, recommendList, enterLoading, songsCount } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, [bannerList.size, recommendList.size, getBannerDataDispatch, getRecommendListDataDispatch]);

  const bannerListJs = bannerList ? bannerList.toJS() : [];
  const recommendListJs = recommendList ? recommendList.toJS() : []

  return (
    <Content play={songsCount}>
      <Scroll className='list' onScroll={forceCheck}>
        <div>
          <div className='before'></div>
          <Slider bannerList={bannerListJs}></Slider>
          <RecommendList recommendList={recommendListJs}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
      {/* 渲染路由 */}
      { renderRoutes(props.route.routes) }
    </Content>
  );
}

// 映射redux全局的state到props上
const mapStateToProps = (state) => ({
  // recommend为全局注册的reducer字段，bannerList为对应的reducer的state字段
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size,
})

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionCreators.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionCreators.getRecommendList());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));