import { IClipItem } from "../Models/clipitem";
import { v4 as guid } from "uuid";

const create = (identityId: string, value: string): IClipItem => ({
    id: guid(),
    identityId,
    value,
});

export default { create };