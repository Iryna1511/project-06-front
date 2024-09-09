import axios from "axios";

class AxiosLoader {

  constructor() {
    this.axiosLoader = axios.create({
      baseURL: "https://water-tracker-06.onrender.com",
    });
  }

  setAuthorizationHeader() {
    const token = localStorage.getItem("authToken");
    this.axiosLoader.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  async get(path, params) {
    this.setAuthorizationHeader();
    return await this.axiosLoader.get(path, params);
  }

  async post(path, params) {
    this.setAuthorizationHeader();
    return await this.axiosLoader.post(path, params);
  }

  async patch(path, params) {
    this.setAuthorizationHeader();
    return await this.axiosLoader.patch(path, params);
  }

  async delete(path, params) {
    this.setAuthorizationHeader();
    return await this.axiosLoader.delete(path, params);
  }

  async put(path, params) {
    this.setAuthorizationHeader();
    return await this.axiosLoader.put(path, params);
  }

}

export const axiosLoader = new AxiosLoader();
