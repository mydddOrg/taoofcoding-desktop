import { observable, action, makeAutoObservable } from 'mobx';
import { Blog } from 'modules/blogs/domain/Blog';
import { createContext } from 'react';
'use strict'

export class BlogStore {

	blog?:Blog

	public constructor() {
        makeAutoObservable(this)
    }

	selectBlog(blog:Blog){
		this.blog = blog
	}
}

export default createContext(new BlogStore());