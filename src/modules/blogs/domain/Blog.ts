import { InstanceFactory } from "components/ioc/InstanceFactory";
import { Tag } from "modules/blogs/domain/Tag";
import { BlogNet } from "../net/BlogNet";
import { BlogRepository } from "../repository/BlogRepository";

export interface IBlog {
  slug: string;

  title: string;

  brief: string;

  _created: number;

  date: string;

  tags: string[];

  tagData: string;
}

export class Blog {
  slug: string;

  title: string;

  brief: string;

  created: number;

  date: string;

  tags: Tag[];

  constructor(blog?: IBlog) {
    if (blog) {
      this.slug = blog?.slug;
      this.title = blog?.title;
      this.brief = blog?.brief;
      this.created = blog?._created;
      this.date = blog?.date;
      const tags: Tag[] = [];
      blog.tags.forEach((tag) => tags.push(new Tag(tag)));
      this.tags = tags;
    }
  }

  private static blogNet: BlogNet;

  private static getBlogNet(): BlogNet {
    if (!this.blogNet) {
      this.blogNet = InstanceFactory.getInstance(BlogNet);
    }
    return this.blogNet;
  }

  private static blogRepository: BlogRepository;

  private static getBlogRepository(): BlogRepository {
    if (!this.blogRepository) {
      this.blogRepository = InstanceFactory.getInstance(BlogRepository);
    }
    return this.blogRepository;
  }

  /**
   * 获取更多博客
   * @returns 返回博客列表
   */
  public static async fetchMoreBlogs(): Promise<Blog[]> {
    const last = await Blog.getBlogRepository().fetchMaxBlogDate();
    const blogs = await Blog.getBlogNet().fetchMoreBlogs(last);
    await Blog.getBlogRepository().batchSaveBlogs(blogs);
    return blogs;
  }

  public static async fetchLastestBlogs(): Promise<Blog[]> {
    return Blog.getBlogRepository().fetchLatestBlogs();
  }

  public fetchContent(): Promise<string> {
    return Blog.getBlogNet().fetchBlogContent(this.slug);
  }
}
