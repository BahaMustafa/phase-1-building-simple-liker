// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Add an event listener to the document to wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get the like buttons
  const likeButtons = document.querySelectorAll('.like');

  // Add click event listeners to each like button
  likeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Get the heart icon inside the like button
      const heart = button.querySelector('.like-glyph');

      // Check if the heart is empty or full
      if (heart.innerText === EMPTY_HEART) {
        // Invoke mimicServerCall to simulate making a server request
        mimicServerCall()
          .then(function() {
            // Update the appearance of the heart
            heart.innerText = FULL_HEART;
            heart.classList.add('activated-heart');
          })
          .catch(function(error) {
            // Display the error modal
            const modal = document.querySelector('#modal');
            const modalMessage = document.querySelector('#modal-message');
            modalMessage.innerText = error;
            modal.classList.remove('hidden');

            // Hide the error modal after 3 seconds
            setTimeout(function() {
              modal.classList.add('hidden');
            }, 3000);
          });
      } else {
        // Change the heart back to empty
        heart.innerText = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
