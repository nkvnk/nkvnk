import axios from "axios";

const creatIntent = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:4002/", data)
      .then(function (res) {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export default creatIntent;
