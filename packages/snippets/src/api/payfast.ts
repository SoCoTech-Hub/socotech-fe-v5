import axios from "axios";

const pfHost = "https://api.payfast.co.za";

const payfastApi = axios.create({
  baseURL: pfHost,
});

export default payfastApi;
