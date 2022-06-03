import { BlogTable } from './../../modules/blogs/tables/BlogTable';
import { TagTable } from './../../modules/blogs/tables/TagTable';
import { ITable } from './ITable';
import { inject, singleton } from 'tsyringe';
import { Repository } from './impl/Repository';

@singleton()
export class BaseRepository {

    private static DB_NAME = 'taoofcoding.data';

    private static DB_VERSION = 1;

    private repository: Repository;

    private tables: ITable[] = [];
    

    public constructor(@inject(Repository) repository: Repository) {
        this.tables.push(TagTable.getInstance());
        this.tables.push(BlogTable.getInstance());
        this.repository = repository;
    }

    public async initRepository(): Promise<boolean> {

        this.repository.prepare(BaseRepository.DB_NAME, this.tables, BaseRepository.DB_VERSION);
        const initResult: boolean = await this.repository.init();
        return initResult;
    }

    public close() {
        if (this.repository) {
            this.repository.close();
            this.repository = null;
        }
    }

}

export default BaseRepository;