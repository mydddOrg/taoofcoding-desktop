import { observer } from "mobx-react-lite";
import { Blog } from "modules/blogs/domain/Blog";
import * as React from "react";
import { useHistory } from "react-router";
import BlogStore from "stores/BlogStore";
import BlogTag from "./BlogTag";

export interface BlogItemProps {
  blog: Blog;
}
const BlogItem = observer((props: BlogItemProps) => {
  const history = useHistory();

  const blogStore = React.useContext(BlogStore);

  const toBlog = () => {
    blogStore.selectBlog(props.blog);
    history.push("/blog");
  };

  return (
    <div className="flex flex-col m-4 p-2 border border-gray-200 rounded-xl justify-start">
      <div
        className="w-full flex-1 text-lg font-medium m-1.5 cursor-pointer opacity-70"
        onClick={toBlog}
      >
        {props.blog.title}
      </div>

      <div
        className="w-full flex-1 text-stone-500 font-base m-1.5 cursor-pointer text-ms opacity-70"
        onClick={toBlog}
      >
        {props.blog.brief}
      </div>

      <div className="flex-1 flex flex-row content-center items-center">
        {(() => {
          const tags: any[] = [];
          props.blog.tags.forEach((tag) => {
            tags.push(<BlogTag key={tag.name} name={tag.name} />);
          });
          return tags;
        })()}
        <span className="w-fit m-1.5 text-gray-400 text-sm">
          {props.blog.date}
        </span>
      </div>
    </div>
  );
});

export default BlogItem;
