import { $api } from "../api/api";

export const fetchBranchs=async (user_id: string) => {
    const { data }=await $api.get(`/filials/?user_id=${user_id}`);
    return data;
};
