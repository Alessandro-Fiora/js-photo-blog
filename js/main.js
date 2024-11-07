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
  const cardsEL = document.querySelectorAll(".photo-card");
  cardsEL.forEach((card) => card.addEventListener("click", cardClickHandler));
  cardsEL.forEach((card) =>
    card.addEventListener("mouseover", function () {
      console.log("mouse over card");
      console.log(this);

      this.classList.add("animation");
    })
  );
  cardsEL.forEach((card) =>
    card.addEventListener("mouseout", function () {
      console.log("mouse out card");
      console.log(this);

      this.classList.remove("animation");
    })
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
