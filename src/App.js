import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { IconStyle } from './assets/iconfont/iconfont';
import routes from './routes';
import store from './store';
import { GlobalStyle } from './style';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {/* 读取第一层路由 */}
        { renderRoutes(routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
