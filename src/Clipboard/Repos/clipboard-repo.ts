import clipitemFactory from "../Factories/clipitem-factory";
import { IClipItem } from "../Models/clipitem";

let mockRepo: IClipItem[] = [];

const getAllAsync = async (): Promise<IClipItem[]> => mockRepo;

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
    getAllAsync,
    getByIdAsync,
    createAsync,
    removeAsync,
};
