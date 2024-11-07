// * ------------------------------------------------------ FUNCTIONS ------------------------------------------------------------------
/**
 * uses fetch method to perform an AJAX API call and get the desired number of photos with descriptions
 * @param {Number} cardNumber number of desired photos
 * @returns {Array} array of photo objects
 */
const fetchAPI = async (cardNumber) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${cardNumber}`
  );
  const photos = await response.json();
  return photos;
};
/**
 * Given an array of photo objects, generates HTML cards and prints it in the DOM
 * @param {Array} photos array of photo objects to be printed
 */
const printCards = async (photos) => {
  let cardsHTML = "";
  photos.forEach((photo) => {
    cardsHTML += `
          <div class="col-12 col-md-6 col-lg-4">
              <div class="card photo-card h-100 rounded-0">
                  <img class="pin" src="./img/pin.svg" alt="" />
                  <img
                  src="${photo.url}"
                  alt=""
                  class="photo-card-img p-3 card-img-top img-fluid"
                  />
                  <div class="card-body">
                      <p class="card-text">
                      ${photo.title}
                      </p>
                  </div>
              </div>
          </div>`;
  });
  cardRowEl.innerHTML = cardsHTML;
};
/**
 * Adds event listeners for every card printed in the document
 */
const addCardEventListeners = () => {
  // Gets the card elements
  const cardsEL = document.querySelectorAll(".photo-card");

  // Adds CLICK event listener
  cardsEL.forEach((card) => card.addEventListener("click", cardClickHandler));

  // Adds MOUSE OVER event listener
  cardsEL.forEach((card) =>
    card.addEventListener("mouseover", cardMouseoverHandler)
  );

  // Adds MOUSE OUT event listener
  cardsEL.forEach((card) =>
    card.addEventListener("mouseout", cardMouseoutHandler)
  );
};
/**
 * Handles the behaviour of the click event on each card
 */
function cardClickHandler() {
  const cardImg = this.querySelector(".photo-card-img");
  overlayImg.src = cardImg.src;
  overlay.classList.remove("d-none");
  overlay.classList.add("d-flex");
}
/**
 * Handles the behaviour of the mouse over event on each card
 */
function cardMouseoverHandler() {
  const pin = this.querySelector(".pin");
  // makes the pin disappear
  pin.classList.add("d-none");
  this.classList.add("animation");
}
/**
 * Handles the behaviour of the mouse out event on each card
 */
function cardMouseoutHandler() {
  const pin = this.querySelector(".pin");
  // makes the pin reappear
  pin.classList.remove("d-none");
  this.classList.remove("animation");
}
/**
 * Handles the behaviour of the click event on the 'Close' button in the overlay
 */
const closeButtonHandler = () => {
  overlay.classList.remove("d-flex");
  overlay.classList.add("d-none");
};
/**
 * Handles the API call to get all the photos and prints them in the page, then adds event listeners for click behaviour
 */
const cardsEntry = async () => {
  printCards(await fetchAPI(cardNumber));
  addCardEventListeners();
  overlayCloseButton.addEventListener("click", closeButtonHandler);
};

// * ------------------------------------------------------ GETTING NODES FROM DOM -------------------------------------------------------
const cardRowEl = document.getElementById("card-row");
const overlay = document.getElementById("overlay");
const overlayCloseButton = document.getElementById("overlay-close-button");
const overlayImg = document.querySelector("#overlay img");

// * ------------------------------------------------------ MAIN LOGIC -------------------------------------------------------------------

// Number of cards to be generated
const cardNumber = 6;

// AJAX API call, card generation and behaviour
cardsEntry();
