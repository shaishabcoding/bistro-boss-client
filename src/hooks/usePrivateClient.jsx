/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const privateClient = axios.create({
  baseURL: "http://localhost:5000",
});

const usePrivateClient = () => {
  return privateClient;
};

export default usePrivateClient;
