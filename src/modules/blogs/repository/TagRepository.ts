import { Tag } from 'modules/blogs/domain/Tag';
import { injectable } from 'tsyringe';

@injectable()
export class TagRepositoryImpl{
	createTag(tag: Tag): Tag {
		throw new Error('Method not implemented.');
	}

}