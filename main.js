import "./style.css";

const form = document.querySelector("form"); // Grab the form from the DOM

form.addEventListener("submit", async (e) => {
  // Add an eventListener for the button with a callback to access the data in the textbox
  e.preventDefault(); // When a form is submitted it refreshs the page, this prevents that from happening
  showSpinner();
  const data = new FormData(form);

  const response = await fetch("http://localhost:8080/dream", {
    // Making a REQUEST to API
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set type to JSON
    },
    body: JSON.stringify({
      // Convert the data which is a JSON into a string
      prompt: data.get("prompt"),
    }),
  });

  if (response.ok) {
    // if status is "ok", that means the reposnse is good
    const { image } = await response.json();

    const result = document.querySelector("#result"); // Grab the img div
    result.innerHTML = `<img src="${image}" width="512" />`; // Insert the img URL into the div
  } else {
    const err = await response.text(); // else, status is not ok that provides an error message
    alert(err);
    console.error(err);
  }

  hideSpinner();
});

function showSpinner() {
  // Shows a spinner while the img is loading on the page
  const button = document.querySelector("button");
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  // Hides the spinner when the img is shown on the page
  const button = document.querySelector("button");
  button.disabled = false;
  button.innerHTML = "Dream";
}
