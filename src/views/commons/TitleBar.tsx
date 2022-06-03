import { ModuleUtil } from "components/util/ModuleUtil";
import React from "react";
import { useHistory } from "react-router";
import "style/main.css";

export interface TitleBarProps {
  index?: boolean;
}
const TitleBar = (props: TitleBarProps) => {
  const history = useHistory();

  const close = () => {
    const remote = ModuleUtil.remote;
    const win = remote.getCurrentWindow();
    win.close();
  };

  const back = () => {
    history.go(-1);
  };

  return (
    <div className="drag text-center h-8 flex flex-row border-b-2 border-zinc-300 mb-2 items-center bg-white">
      <div className="w-1/4 flex flex-row">
        {(() => {
          if (props.index) {
            return (
              <div
                className="cursor-pointer w-6 h-6 ml-1 bg-cover bg-close "
                onClick={close}
              />
            );
          } else {
            return (
              <div
                className="cursor-pointer w-6 h-6 ml-1 bg-cover bg-back "
                onClick={back}
              />
            );
          }
        })()}
      </div>
      <span className="text-center flex-1">微言码道</span>
      <div className="w-1/4"></div>
    </div>
  );
};

export default TitleBar;
