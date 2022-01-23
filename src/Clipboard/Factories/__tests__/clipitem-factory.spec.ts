import ClipItemFactory from "../clipitem-factory";
import { v4 as guid } from "uuid";

describe("ClipItem Factory: Create Clip Item", () => {
    it("Valid arguments should create ClipItem", () => {
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
            creationDate: expect.any(Date)
        });
    });

    it("Empty value should return error", () => {
        const expectedIdentityId = guid();
        const expectedValue = "    ";

        expect(() => ClipItemFactory.create(
            expectedIdentityId,
            expectedValue
        )).toThrow();
    });


    it("Undefined value should return error", () => {
        const expectedIdentityId = guid();

        expect(() => ClipItemFactory.create(
            expectedIdentityId,
            undefined
        )).toThrow();
    });

    it("Invalid id should return error", () => {
        const expectedIdentityId = "BAD";
        const expectedValue = "value";

        expect(() => ClipItemFactory.create(
            expectedIdentityId,
            expectedValue
        )).toThrow();
    });
});
