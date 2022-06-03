import "reflect-metadata";

import React, { useContext } from "react";
import * as ReactDOM from "react-dom";

import "style/common.css";
import "style/main.css";

import { HashRouter, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { InstanceFactory } from "components/ioc/InstanceFactory";
import { observer } from "mobx-react-lite";
import I18Store from "stores/I18Store";
import Main from "views/Main";
import BlogContent from "views/blog/BlogContent";
import { FSDirUtil } from "components/util/FSDirUtil";
import BaseRepository from "components/repository/BaseRepository";

const baseRepository = InstanceFactory.getInstance(BaseRepository)
baseRepository.initRepository()
//初始化容器
const init = async () => {
  await FSDirUtil.createDirs()
};

init()

const App = observer((props?: any) => {
  const i18nStore = useContext(I18Store);

  return (
    <IntlProvider locale={i18nStore.locale} messages={i18nStore.language}>
      <HashRouter>
        <div className="full_div">
          <Route path="/" exact component={Main} />
          <Route path="/blog" component={BlogContent} />
        </div>
      </HashRouter>
    </IntlProvider>
  );
});

ReactDOM.render(<App />, document.getElementById("app"));
