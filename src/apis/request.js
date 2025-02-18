import axios from "axios";

const inst = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
});

inst.interceptors.response.use((resp) => resp.data);

const COMMON_URL = `http://192.168.1.102:3000/api`;

export const apiGet = (opts) => {
  return inst({
    method: "get",
    ...opts,
    url: `${COMMON_URL}/${opts.path || ""}`,
  });
};
