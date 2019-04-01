function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.errorCode = status;
  throw error;
}

export function post(options, context) {
  return new Promise((resolve, reject) => {
    context.axios(options)
      .then(res => {
        checkStatus(res)
        if (res.data.data) {
          resolve(res.data.data);
        } else {
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
