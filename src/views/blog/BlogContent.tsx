import React, { useContext, useEffect, useState } from "react";
import Layout from "views/commons/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { observer } from "mobx-react-lite";
import { InstanceFactory } from "components/ioc/InstanceFactory";
import BlogStore from "stores/BlogStore";
import { BlogApplication } from "modules/blogs/application/BlogApplication";

const BlogContent = observer(() => {
  const [content, setContent] = useState("# loading");

  const blogStore = useContext(BlogStore);

  useEffect(() => {
    fetchContent();
  }, [blogStore.blog]);

  const blogApplication: BlogApplication = InstanceFactory.getInstance(BlogApplication);

  const fetchContent = async () => {
    if (blogStore.blog) {
      const content = await blogApplication.fetchBlogContent(blogStore.blog);
      setContent((prev) => content);
    }
  };

  return (
    <Layout index={false}>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-11/12	h-auto my-3 text-2xl text-cyan-600">
          {blogStore.blog?.title}
        </div>

        <article className="prose prose-slate max-w-none p-4">
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={content}
            remarkPlugins={[remarkGfm]}
          />
        </article>
      </div>
    </Layout>
  );
});

export default BlogContent;
