const token = localStorage.getItem("jwt");

if (!token) {
  alert("Access denied.Please log in first.");
}
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
    // localStorage.removeItem("jwt");
  })
  .catch((error) => {
    console.log(error);
  });
