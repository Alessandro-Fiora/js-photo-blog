const cardRowEl = document.getElementById("card-row");

const cardNumber = 6;

const fetchAPI = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${cardNumber}`
  );
  const photos = await response.json();
  return photos;
};

const printPhotos = async (photos) => {
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

  const cardsEL = await document.querySelectorAll(".photo-card");
  console.log(cardsEL);

  cardsEL.forEach((card) => {
    card.addEventListener("click", () => {
      alert("click");
    });
  });
};

const cardsEntry = async () => {
  printPhotos(await fetchAPI());
};

cardsEntry();

// fetch(
//   `https://jsonplaceholder.typicode.com/photos?_limit=${cardNumber}`
// ).then((response) =>
//   response.json().then((data) => {
//     console.log(data);

//     data.forEach((photo) => {
//       cardRowEl.innerHTML += `
//     <div class="col-12 col-md-6 col-lg-4">
//         <div class="card h-100 rounded-0">
//             <img
//             src="${photo.url}"
//             alt=""
//             class="p-3 card-img-top img-fluid"
//             />
//             <div class="card-body">
//                 <p class="card-text">
//                 ${photo.title}
//                 </p>
//             </div>
//         </div>
//     </div>`;
//     });
//   })
// );
