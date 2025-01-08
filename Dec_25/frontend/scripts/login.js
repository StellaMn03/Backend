document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      alert("Login successful");
      window.open("http://127.0.0.1:5500/frontend/secure.html", "_blank");
    } else {
      const errMes = await response.text();
      alert(errMes);
    }
  });
