import axios from "axios";

const instance = axios.create({
	baseURL: "http://192.46.210.31:8000/api/",
});

export default instance;
