import axios from "axios";
export const request = (api, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: api,
      method: "POST",
      data: params,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((successData) => {
        if (successData) {
          resolve(successData);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
