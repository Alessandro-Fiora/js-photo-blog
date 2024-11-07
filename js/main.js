const fetchAPI = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${cardNumber}`
  );
  const photos = await response.json();
  return photos;
};

const printCards = async (photos) => {
  let cardsHTML = "";
  photos.forEach((photo) => {
    cardsHTML += `
          <div class="col-12 col-md-6 col-lg-4">
              <div class="card photo-card h-100 rounded-0">
                  <img
                  src="${photo.url}"
                  alt=""
                  class="p-3 card-img-top img-fluid"
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

const addCardEventListeners = () => {
  const cardsEL = document.querySelectorAll(".photo-card");
  cardsEL.forEach((card) => card.addEventListener("click", cardClickHandler));
};

function cardClickHandler() {
  const cardImg = this.querySelector(".photo-card img");
  overlayImg.src = cardImg.src;
  overlay.classList.remove("d-none");
  overlay.classList.add("d-flex");
}

const closeButtonHandler = () => {
  overlay.classList.remove("d-flex");
  overlay.classList.add("d-none");
};

const cardsEntry = async () => {
  printCards(await fetchAPI());
  addCardEventListeners();
  overlayCloseButton.addEventListener("click", closeButtonHandler);
};

const cardRowEl = document.getElementById("card-row");
const overlay = document.getElementById("overlay");
const overlayCloseButton = document.getElementById("overlay-close-button");
const overlayImg = document.querySelector("#overlay img");

const cardNumber = 6;

cardsEntry();
