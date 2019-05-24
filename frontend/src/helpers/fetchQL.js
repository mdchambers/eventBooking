const fetchQl = (query, token) => {
  return fetch("http://localhost:8000/graphql", {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then(res => {
      // Catch errors from backend
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("failed");
      }
      // console.log('fetched');
      // console.log(res.json());
      return res.json();
    })
    .then( resData => {
      // console.log(resData);
      return resData;
    })
    .catch(err => {
      // Only local errors (i.e. network connectivity), not errors thrown by backend caught here
      console.log(err);
    });
};

export default fetchQl;
