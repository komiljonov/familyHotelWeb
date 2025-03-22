import { $api } from "../api/api";

export const fetchTurns = async ()=> {
    const { data } = await $api.get("/turns");
    return data;
};
