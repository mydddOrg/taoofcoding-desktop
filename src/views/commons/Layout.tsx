import React from "react";
import CopyRight from "./CopyRight";
import TitleBar from "./TitleBar";
export interface LayoutProps {
	index?:boolean,
	children:any
}
const Layout = (props: LayoutProps) => {
  return (
    <div className="drag relative h-full w-full ">
      <div className="sticky top-0 left-0 right-0 h-8 bg-white">
        <TitleBar index={props.index} />
      </div>
      <div className="flex flex-col top-8 bottom-8 left-0 right-0">
        {props?.children}
      </div>
      <div className="sticky bottom-0 left-0 right-0 h-8 bg-white">
        <CopyRight />
      </div>
    </div>
  );
};

export default Layout
