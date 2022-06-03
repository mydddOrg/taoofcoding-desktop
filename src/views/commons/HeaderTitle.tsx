import React from "react";

export interface HeaderTitleProps {
  title?: string;
  subTitle?: string;
  firstLetter?: string;
}

const HeaderTitle = (props: HeaderTitleProps) => {
  return (
    <div className="h-auto relative">
      <div className=" absolute top-0 left-0 bottom-0 w-full h-20 flex flex-col">
        <div className=" text-4xl z-50 ">{props.title}</div>
        <div className="text-lg	opacity-50 z-50">{props.subTitle}</div>
      </div>

      <div className=" absolute top-[-40px] left-[-20px] select-none text-7xl text-zinc-200 z-0">
        {props.firstLetter}
      </div>
    </div>
  );
};

export default HeaderTitle;
