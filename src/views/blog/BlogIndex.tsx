import { InstanceFactory } from "components/ioc/InstanceFactory";
import { BlogApplication } from "modules/blogs/application/BlogApplication";
import { Blog } from "modules/blogs/domain/Blog";
import React, { useEffect, useState } from "react";
import IndexCard from "views/commons/IndexCard";
import BlogItem from "./BlogItem";

const BlogIndex = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const blogApplication: BlogApplication = InstanceFactory.getInstance(BlogApplication);

  useEffect(() => {
    fetchMoreBlogs();
  }, []);

  const fetchMoreBlogs = async () => {
    await blogApplication.fetchMoreBlogs();
    const blogs = await blogApplication.fetchLastestBlogs()
    setBlogs((prev) => blogs);
  };

  return (
    <div className="flex flex-col">
      <IndexCard
        title="微言码道"
        subTitle="编程即思考"
        firstLetter="taoofcoding"
      ></IndexCard>

      <div className="flex-1 flex-col">
        {(() => {
          const items: any[] = [];
          blogs.forEach((blog) => {
            items.push(<BlogItem key={blog.slug} blog={blog} />);
          });
          return items;
        })()}
      </div>
    </div>
  );
};

export default BlogIndex;
