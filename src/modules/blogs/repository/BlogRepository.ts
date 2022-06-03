import { IBlog } from './../domain/Blog';
import { Repository } from "components/repository/impl/Repository";
import { Blog } from "../domain/Blog";
import { inject, injectable } from "tsyringe";

@injectable()
export class BlogRepository {
  private repository: Repository;

  constructor(@inject(Repository) repository: Repository) {
    this.repository = repository;
  }

  async batchSaveBlogs(blogs: Blog[]): Promise<boolean> {
    const sqls: string[] = [];
    const params: any[] = [];
    blogs.forEach((blog) => {
      const tags: string[] = [];
      blog.tags.forEach((tag) => {
        tags.push(tag.name);
      });
      sqls.push(
        "replace into blog_ (slug,title,brief,created,date,tagData) values ($slug,$title,$brief,$created,$date,$tagData)"
      );
      params.push({
        $slug: blog.slug,
        $title: blog.title,
        $brief: blog.brief,
        $created: blog.created,
        $date: blog.date,
        $tagData: tags.join(","),
      });

      blog.tags.forEach((tag) => {
        sqls.push("replace into tag_ (name) values ($name)");
        params.push({
          $name: tag,
        });
      });
    });
    return this.repository.executeBatchUpdate(sqls, params);
  }

  async fetchMaxBlogDate(): Promise<number> {
    const sql = "select max(created) as _created from blog_";
    const response = await this.repository.executeSingleQuery<IBlog>(sql);
    if (response._created == null) return 0;
    return response._created;
  }

  async fetchLatestBlogs(): Promise<Blog[]> {
    const sql = "select * from blog_ order by created desc";
    const results: IBlog[] = await this.repository.executeQuery<IBlog>(sql);

    const blogs: Blog[] = [];
    results.forEach((blog) => {
      const tags: string[] = blog.tagData.split(",");
      blog.tags = tags;
      blogs.push(new Blog(blog));
    });
    return blogs;
  }
}
