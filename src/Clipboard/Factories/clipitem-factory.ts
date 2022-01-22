import { IClipItem } from "../Models/clipitem";
import { v4 as guid, validate } from "uuid";

const isEmpty = (value: string) =>
    typeof value == "undefined" || value == null || value.trim() == "";

const throwIfTrue = (shouldThrow: boolean, message: string) => {
    if (shouldThrow) {
        throw message;
    }
};

const guards = {
    required: (value: string, message: string) =>
        throwIfTrue(isEmpty(value), message),
    validGuid: (id: string, message: string) =>
        throwIfTrue(!validate(id), message),
};

const create = (identityId: string, value: string): IClipItem => {
    guards.required(value, "Value is required to create ClipItem");
    guards.validGuid(identityId, "identityId is invalid");

    return {
        id: guid(),
        identityId,
        value,
    };
};

export default { create };
