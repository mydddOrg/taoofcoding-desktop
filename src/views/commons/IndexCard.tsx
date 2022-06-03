import React from "react";
import HeaderTitle from "./HeaderTitle";

export interface IndexCardProps {
  title: string;
  subTitle: string;
  firstLetter?: string;
  children?: any;
  isLast?: boolean;
}

const IndexCard = (props: IndexCardProps) => {
  return (
    <div className="pt-10 pb-10 w-full h-28 bg-white rounded-lg flex flex-col flex-wrap align-middle">
      <div className="ml-[50px] mr-[50px] flex flex-col">
        <HeaderTitle
          title={props.title}
          subTitle={props.subTitle}
          firstLetter={props.firstLetter}
        />
        {props.children}
      </div>
    </div>
  );
};

export default IndexCard;
