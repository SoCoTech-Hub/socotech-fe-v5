import publicapi from "@/api/publicapi";

const resetPassword = async ({ code, password }) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    publicapi
      .post(`/auth/reset-password`, {
        code: code,
        password: password,
        passwordConfirmation: password,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default resetPassword;
