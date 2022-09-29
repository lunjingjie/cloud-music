import { PullDownRefresh } from 'better-scroll';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { categoryTypes, alphaTypes } from '../../api/config';
import Horizen from '../../baseUI/horizen-item';
import Scroll from '../../baseUI/scroll';
import { actionCreators } from './store';
import { changePageCount, changePullDownLoading, changePullUpLoading } from './store/actionCreator';
import { NavContainer, List, ListItem, ListContainer } from './style';

function Singers(props) {

  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');
  const { singerList, getHotSingerListDispatch, pageCount, pullUpLoading, pullDownLoading } = props;
  const { updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;

  const singerListJs = singerList ? singerList.toJS() : [];

  useEffect(() => {
    getHotSingerListDispatch();
  }, []);

  let handleUpdateCategory = (val) => {
    setCategory(val);
    updateDispatch(val, alpha);
  }

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category, val);
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '' && alpha === '', pageCount);
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }

  const renderSingerList = function() {
    return (
      <List>
        {
          singerListJs.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </div>
                <span className='name'>{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    );
  }

  return (
    <>
      <NavContainer>
        <Horizen list={categoryTypes}
                title={'分类（默认热门）：'}
                oldVal={category}
                handleClick={(val) => handleUpdateCategory(val)}
        ></Horizen>
        <Horizen list={alphaTypes}
                title={'首字母：'}
                oldVal={alpha}
                handleClick={(val) => handleUpdateAlpha(val)}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUpLoading={ pullUpLoading }
          pullDownLoading={ pullDownLoading }
          pullUp={ handlePullUp }
          pullDown= { handlePullDown }
        >
          { renderSingerList() }
        </Scroll>
      </ListContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
});

const mapDispatchToProps = (dispatch) => ({
  getHotSingerListDispatch() {
    dispatch(actionCreators.getHotSingerList());
  },
  updateDispatch(category, alpha) {
    dispatch(actionCreators.changePageCount(0));
    dispatch(actionCreators.changeEnterLoading(true));
    dispatch(actionCreators.getSingerList(category, alpha));
  },
  // 底部上拉，加载更多
  pullUpRefreshDispatch(category, alpha, hot, count) {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count + 1));
    if (hot) {
      dispatch(actionCreators.refreshMoreHotSingerList());
    } else {
      dispatch(actionCreators.refreshMoreSingerList(category, alpha));
    }
  },
  // 顶部下拉刷新，重新加载
  pullDownRefreshDispatch(category, alpha) {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (category === '' && alpha === '') {
      dispatch(actionCreators.getHotSingerList());
    } else {
      dispatch(actionCreators.getSingerList(category, alpha));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));