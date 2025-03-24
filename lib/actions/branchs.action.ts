import { $api } from "../api/api";

export const fetchBranchs=async () => {
    const { data }=await $api.get(`/filials/`);
    return data;
};
