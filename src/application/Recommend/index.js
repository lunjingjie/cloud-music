import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import style from '../../assets/global-style';
import styled from 'styled-components';
import { actionCreators } from './store';
import { connect } from 'react-redux';

export const Content = styled.div`
  position: fixed;
  top: 94px;
  bottom: 0;
  width: 100%;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    background: ${style["theme-color"]};
  }
`

function Recommend(props) {
  const { bannerList, recommendList } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    getBannerDataDispatch();
    getRecommendListDataDispatch();
  }, []);

  const bannerListJs = bannerList ? bannerList.toJS() : [];
  const recommendListJs = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll className='list'>
        <div>
          <div className='before'></div>
          <Slider bannerList={bannerListJs}></Slider>
          <RecommendList recommendList={recommendListJs}></RecommendList>
        </div>
      </Scroll>
    </Content>
  );
}

// 映射redux全局的state到props上
const mapStateToProps = (state) => ({
  // recommend为全局注册的reducer字段，bannerList为对应的reducer的state字段
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
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