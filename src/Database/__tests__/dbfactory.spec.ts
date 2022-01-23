import { getDb } from '../dbfactory';
const opts = { adapter: 'memory' };

describe('DbFactory ', () => {
    it('Database operation should persist', async () => {
        await getDb(async db => {
            const expectedRec = { _id: '1', test: "value" };
            await db.put(expectedRec);

            const { test } = await db.get('1');
            expect(test).toBe(expectedRec.test);
        }, opts);
    });
});