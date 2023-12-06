function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
const init = async (uid) => {
  const randomId = localStorage.getItem("id");
  if (randomId) {
    const rawResponse = await fetch("https://api.banglamartecommerce.com.bd/auth/visitor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ randomId: randomId, uid: uid }),
    });
    const data = await rawResponse.json();
    return data?.data
  } else {
    const randomId = makeid(50);
    localStorage.setItem("id", randomId);
    const rawResponse = await fetch("https://api.banglamartecommerce.com.bd/auth/visitor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ randomId: randomId, uid: uid }),
    });
    const data = await rawResponse.json();
    return data?.data
  }
};
export default init;
