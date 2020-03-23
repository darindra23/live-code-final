import Axios from "axios";
import Swal from "sweetalert2";

const axios = Axios.create({
  baseURL: "http://localhost:3000"
});

function errorHandler(error) {}
export { axios, errorHandler };
