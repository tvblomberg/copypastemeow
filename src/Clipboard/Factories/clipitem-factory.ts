import { IClipItem } from "../Models/clipitem";
import { v4 as guid, parse } from "uuid";

const isEmpty = (value: string) =>
    typeof value == "undefined" || value == null || value.trim() == "";

const guards = {
    required: (value: string, message: string) => {
        if (isEmpty(value)) {
            throw message;
        }
    },
    validGuid: (id: string, message: string) => {
        try {
            parse(id);
        } catch (err) {
            throw message;
        }
    },
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
