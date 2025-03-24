import { $api } from "./api/api";

const fetchFilials=async () => {
    const { data }=await $api.get("filials/");
    return data;
};


export default fetchFilials;