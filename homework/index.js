import * as Carousel from "/Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_bjvUnTs5gyVIhhYlIxj0C6CcBT2nDCuxjSTWYnT6c3CMrTC0REwctFDxA3wEjg06";
axios.defaults.baseURL = " https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
async function initialLoad() {
  try {
    const response = await axios.get("/breeds");
    const breeds = response.data;

    const breedSelect = document.getElementById("breedSelect");
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

initialLoad();
/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */
async function loadBreedInfo(breedId) {
  try {
    const response = await axios.get(
      "/images/search?breed_ids=${breedId}&limit=10"
    );
    const breedInfo = response.data;

    const carousel = document.getElementById("carousel");
    const infoDump = document.getElementById("infoDump");
    carousel.innerHTML = "";
    infoDump.innerHTML = "";

    breedInfo.forEach((info) => {
      const imgElement = document.createElement("img");
      imgElement.src = info.url;
      carousel.appendChild(imgElement);

      const infoSection = document.createElement("div");
      infoSection.innerHTML = `
              <h3>${info.breeds[0].name}</h3>
              <p>${info.breeds[0].description}</p>
          `;
      infoDump.appendChild(infoSection);
    });
  } catch (error) {
    console.error("Error fetching breed info:", error);
  }
}

breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;
  loadBreedInfo(breedId);
});
//
axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  request.metadata = { startTime: new Date() };
  document.body.style.cursor = "progress";
  return request;
});

axios.interceptors.response.use(
  (response) => {
    response.config.metadata.endTime = new Date();
    const duration =
      response.config.metadata.endTime - response.config.metadata.startTime;
    console.log("Request Duration:", duration, "ms");
    document.body.style.cursor = "default";
    return response;
  },
  (error) => {
    document.body.style.cursor = "default";
    return Promise.reject(error);
  }
);

 //
function updateProgress(progressEvent) {
  const progressBar = document.getElementById("progressBar");
  const percentCompleted = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
  progressBar.style.width = `${percentCompleted}%`;
}

axios.defaults.onDownloadProgress = updateProgress;

export async function favourite(imgId) {
  try {
    const response = await axios.post(
      "https://api.thecatapi.com/v1/favourites",
      { image_id: imgId },
      { headers }
    );
    console.log("Image favorited:", response.data);
  } catch (error) {
    console.error("Error favoriting image:", error);
  }
}
 //
async function getFavourites() {
  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/favourites",
      { headers }
    );
    const favoriteImages = response.data;
    console.log("Favorite images:", favoriteImages);
    carousel.clear();
    favoriteImages.forEach((image) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      const img = document.createElement("img");
      img.src = image.image.url;
      img.alt = image.image.breeds[0].name;
      carouselItem.appendChild(img);
      Carousel.addItem(carouselItem);
    });
  } catch (error) {
    console.error("Error loading favorites:", error);
  }
}

getFavouritesBtn.addEventListener("click", getFavourites);

initialLoad();

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
