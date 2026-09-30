document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  document.getElementById("result-name").textContent = name;
  document.getElementById("result-email").textContent = email;
  document.getElementById("result-message").textContent = message;

  document.getElementById("result").classList.remove("hidden");
});
