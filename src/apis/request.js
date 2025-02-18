import axios from "axios";

const inst = axios.create();

inst.interceptors.response.use((resp) => resp.data);

const COMMON_URL = `http://192.168.1.102:3000/api`;

export const apiGet = (opts) => {
  return inst({
    method: "get",
    ...opts,
    url: `${COMMON_URL}/${opts.path || ""}`,
  });
};
