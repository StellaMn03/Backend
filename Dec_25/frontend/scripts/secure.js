const token = localStorage.getItem("jwt");
if (!token) {
  window.location.href = "index.html";
}
console.log("se urrrr");
fetch("http://localhost:8080/secure", {
  headers: { Authorization: `Bearer ${token}` },
})
  .then((response) => {
    if (response.ok) {
      console.log("ok");
      return response.text();
    } else {
      throw new Error("Unauthorized");
    }
  })
  .then((data) => {
    document.getElementById("secureContent").textContent = data;
  })
  .catch((error) => {
    console.log(error);
  });
