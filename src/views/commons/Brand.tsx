import { ModuleUtil } from "components/util/ModuleUtil";
import React from "react";

const Brand = () => {
	const openTaoofCoding = () => {
        const shell = ModuleUtil.electron.shell;
        shell.openExternal("https://taoofcoding.tech")
    }

  return (
    <div className=" mx-4 bg-gray-200 h-auto flex flex-col rounded-lg">
      <div className="flex-1 w-full flex flex-row border-b-2 border-slate-300 ">
        <div className="bg-icon bg-cover w-16 h-16 rounded-full m-4"></div>

		<div className="flex-1 flex flex-col justify-center">
			<div className="text-[rgba(0,0,0,0.9)] text-lg font-medium">微言码道</div>
			<div className="text-[rgba(0,0,0,0.5)] text-sm font-normal">编程即思考</div>
			<div className="text-[rgba(0,0,0,0.5)] text-sm">97篇原创博客</div>
		</div>

      </div>
	
      <div className="h-6 m-2 text-[rgba(0,0,0,0.3)] text-sm cursor-pointer" onClick={openTaoofCoding}>
        https://taoofcoding.tech
      </div>
    </div>
  );
};

export default Brand;
