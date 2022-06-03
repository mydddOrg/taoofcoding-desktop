import { Blog } from "modules/blogs/domain/Blog";
import { FileUtil } from "components/util/FileUtil";
import { FSDirUtil } from "components/util/FSDirUtil";
import { injectable } from "tsyringe";

@injectable()
export class BlogApplication {
  public fetchLastestBlogs(): Promise<Blog[]> {
    return Blog.fetchLastestBlogs();
  }

  public async fetchMoreBlogs(): Promise<Blog[]> {
    return Blog.fetchMoreBlogs();
  }

  public async fetchBlogContent(blog: Blog): Promise<string> {
    const blogFilePath = FSDirUtil.filePath(blog.slug);
    const exists = await FileUtil.accessFile(blogFilePath);
    if (!exists) {
      const content = await blog.fetchContent();
      await FileUtil.writeContentToFile(blogFilePath, content);
    }
    return (await FileUtil.contentOfFile(blogFilePath)).toString("utf-8");
  }
}
