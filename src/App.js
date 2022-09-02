import React from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { IconStyle } from './assets/iconfont/iconfont';
import routes from './routes';
import { GlobalStyle } from './style';

function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {/* 读取第一层路由 */}
      { renderRoutes(routes) }
    </HashRouter>
  );
}

export default App;
