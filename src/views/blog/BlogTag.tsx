import React from "react";

export interface BlogTagProps {
	name:string
}
const BlogTag = (props:BlogTagProps) => {
	return <div className="block rounded-lg m-2 p-1 border border-sky-600 text-xs text-sky-600">{props.name}</div>
}

export default BlogTag