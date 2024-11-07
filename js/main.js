const cardRowEl = document.getElementById("card-row");
const overlay = document.getElementById("overlay");
const overlayCloseButton = document.getElementById("overlay-close-button");
const overlayImg = document.querySelector("#overlay img");

const cardNumber = 6;

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

  // Gestisco click card --- in futuro sarà una funzione
  const cardsEL = document.querySelectorAll(".photo-card");
  console.log(cardsEL);

  cardsEL.forEach((card) => {
    card.addEventListener("click", function () {
      const cardImg = this.querySelector(".photo-card img");
      overlayImg.src = cardImg.src;
      console.log(cardImg.src);
      console.log(overlayImg);

      overlay.classList.remove("d-none");
      overlay.classList.add("d-flex");
    });
  });
};

const cardsEntry = async () => {
  printCards(await fetchAPI());
};

overlayCloseButton.addEventListener("click", () => {
  overlay.classList.remove("d-flex");
  overlay.classList.add("d-none");
});

cardsEntry();
