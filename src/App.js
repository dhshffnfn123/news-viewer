import React from "react";
import { Route } from 'react-router-dom';
import NewsPage from "./pages/NewsPage";

const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
  // /:category 뒤에 물음표는 선택적이라는 뜻(있을수도 있고 없을수도 있다)이다.
};

export default App;