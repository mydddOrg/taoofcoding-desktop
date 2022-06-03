import { Blog } from './../domain/Blog';
import { Tag } from 'modules/blogs/domain/Tag';


export interface BlogApplication {
	fetchMoreBlogs():Promise<Blog[]>

	fetchLastestBlogs():Promise<Blog[]>

	fetchBlogContent(blog:Blog):Promise<string>
}