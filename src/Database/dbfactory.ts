import * as PouchDB from 'pouchdb';
import * as memoryAdapter from 'pouchdb-adapter-memory';
import * as findAdapter from 'pouchdb-find';

PouchDB.plugin(memoryAdapter);
PouchDB.plugin(findAdapter);

export interface DbOptions {
    adapter?: string;
}

export const getDb = async (
    work: (db: PouchDB.Database) => Promise<any>,
    options: DbOptions = {},
): Promise<any> => {
    const db = await createInstance(options);
    const results = await work(db);
    return results;
};

const createInstance = async (
    options: DbOptions,
): Promise<PouchDB.Database> => {
    const dbName = 'meowmeow';
    const opts = Object.assign(
        {},
        {
            adapter: 'leveldb',
            auto_compaction: true,
            revs_limit: 1,
            location: 'default',
            androidDatabaseImplementation: 2,
        },
        options,
    );
    return new PouchDB(dbName, opts);
};

export default { getDb };