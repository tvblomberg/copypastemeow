import clipitemFactory from "../Factories/clipitem-factory";
import * as moment from "moment";
import { IClipItem } from "../Models/clipitem";

let mockRepo: IClipItem[] = [];

const getAsync = async (
    fromDt: Date,
    throughDate: Date,
    limit: number
): Promise<IClipItem[]> =>
    mockRepo
        .filter((x) =>
            moment(x.creationDate).isBetween(
                moment(fromDt),
                moment(throughDate),
                "days",
                "[]"
            )
        )
        .filter((x, index) => index < limit);

const getByIdAsync = async (id: string): Promise<IClipItem> =>
    mockRepo.find((x) => x.id == id);

const createAsync = async (
    identityId: string,
    value: string
): Promise<IClipItem> => {
    var item = clipitemFactory.create(identityId, value);

    mockRepo = [item, ...mockRepo];

    return item;
};

const removeAsync = async (id: string): Promise<void> => {
    mockRepo = mockRepo.filter((x) => x.id == id);
};

export default {
    getAllAsync: getAsync,
    getByIdAsync,
    createAsync,
    removeAsync,
};
