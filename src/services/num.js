import axios from "axios";
const baseUrl = "/api/persons"; // ✅ Correct endpoint

const getAll = () => axios.get(baseUrl);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

const create = (newObject) => axios.post(baseUrl, newObject);

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);

export default { getAll, create, update, remove };
