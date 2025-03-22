import { $api } from "../api/api";

export const fetchStats = async (turn: string)=> {
    const { data } = await $api.get(`/statistics?turn=${turn}`);
    return data;
};
