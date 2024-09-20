// Get the textarea element, heart container, and modal
const messageBox = document.getElementById("messageBox");
const heartContainer = document.getElementById("heart-container");
const thankyouModal = document.getElementById("thankyou-modal");

// Get the form element
const form = document.getElementById("contactForm");

// Listen for the 'input' event to track typing
messageBox.addEventListener("input", function () {
  // Add glowing effect while typing
  messageBox.classList.add("glowing");

  // Remove the glowing effect after typing stops
  clearTimeout(messageBox.timeout);
  messageBox.timeout = setTimeout(() => {
    messageBox.classList.remove("glowing");
  }, 1500); // Delay of 1.5 seconds after typing

  // Create heart effects while typing
  createHeartEffect();
});

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Gather form data
  const formData = new FormData(form);

  // Send the form data via Fetch API
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        // Show thank you modal
        thankyouModal.classList.add("show");

        // Create heart effect when the modal appears
        createHeartEffect();

        // Hide the modal after 3 seconds
        setTimeout(() => {
          thankyouModal.classList.remove("show");
        }, 3000);

        // Reset the form after submission
        form.reset();
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
});

// Function to create heart effect
function createHeartEffect() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Random position around the textarea
  const xPos = Math.random() * messageBox.offsetWidth;
  const yPos = Math.random() * 20;

  heart.style.left = `${xPos}px`;
  heart.style.bottom = `${yPos}px`;

  // Append the heart to the container
  heartContainer.appendChild(heart);

  // Remove the heart after animation is complete
  setTimeout(() => {
    heart.remove();
  }, 2000); // 2 seconds delay to match the animation duration
}
