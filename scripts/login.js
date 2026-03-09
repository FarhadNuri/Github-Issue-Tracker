function signIn() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let errorMsg = document.getElementById("error-msg");

  if (username === "admin" && password === "admin123") {
    window.location.href = "dashboard.html";
  } else {
    errorMsg.classList.remove("hidden");
  }
}

document.getElementById("username").addEventListener("input", function () {
  document.getElementById("error-msg").classList.add("hidden");
});
document.getElementById("password").addEventListener("input", function () {
  document.getElementById("error-msg").classList.add("hidden");
});


document.getElementById("username").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    signIn();
  }
});
document.getElementById("password").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    signIn();
  }
});
