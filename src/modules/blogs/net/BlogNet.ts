import { BaseRequest } from "components/http/impl/BaseRequest";
import { inject } from "tsyringe";
import Config from "components/Config";
import { Blog, IBlog } from "../domain/Blog";
import { injectable } from "tsyringe";

@injectable()
export class BlogNet {
  private request: BaseRequest;

  constructor(@inject(BaseRequest) baseRequest: BaseRequest) {
    this.request = baseRequest;
  }

  public async fetchMoreBlogs(last: number): Promise<Blog[]> {
    const fetchUrl =
      Config.getInstance().api +
      "/api/collections/get/blogs?token=" +
      Config.getInstance().accessToken;
    const parmas = {
      filter: {
        published: true,
        _created: {
          $gt: last,
        },
      },
      fields: {
        slug: 1,
        title: 1,
        date: 1,
        brief: 1,
        _created: 1,
        tags: 1,
      },
    };

    const response = await this.request.requestForPost(fetchUrl, parmas);
    if (response.resultSuccess()) {
      const entries: IBlog[] = response.data.entries;
      const blogs: Blog[] = [];
      entries.forEach((entry) => {
        blogs.push(new Blog(entry));
      });
      return blogs;
    } else {
      return [];
    }
  }

  public async fetchBlogContent(slug: string): Promise<string> {
    const fetchUrl =
      Config.getInstance().api +
      "/api/collections/get/blogs?token=" +
      Config.getInstance().accessToken;
    const parmas = {
      filter: {
        slug: slug,
      },
      fields: {
        content: 1,
      },
    };

    const response = await this.request.requestForPost(fetchUrl, parmas);
    if (response.resultSuccess()) {
      const entries: any[] = response.data.entries;
      return entries[0].content;
    } else {
      return "";
    }
  }
}
