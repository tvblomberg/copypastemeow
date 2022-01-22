import ClipItemFactory from "../clipitem-factory";
import { v4 as guid } from "uuid";

describe("ClipItem Factory", () => {
    it("Create ClipItem should generate Id", () => {
        const expectedIdentityId = guid();
        const expectedValue = "SOME VALUE";

        const result = ClipItemFactory.create(
            expectedIdentityId,
            expectedValue
        );

        expect(result).toEqual({
            id: expect.any(String),
            identityId: expectedIdentityId,
            value: expectedValue,
        });
    });
});
