import * as Carousel from ".carousel.js";
import axios from "axios.js";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

//--Create an async function "initialLoad" that does the following:
// Retrieve a list of breeds from the cat API using fetch().
// Create new <options> for each of these breeds, and append them to breedSelect.
// Each option should have a value attribute equal to the id of the breed.
// Each option should display text equal to the name of the breed.
// This function should execute immediately.
//-------------------------------------------------------------------------------------------

async function initialLoad() {
  try {
    await fetch.get("https://api.thecatapi.com/v1/breeds");
    const breed = await response.data;

    console.log(breeds);

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return [];
  }
}
console.log(breedSelect);

// Create an event handler for breedSelect that does the following:
// Retrieve information on the selected breed from the cat API using fetch().
// Make sure your request is receiving multiple array items!
// Check the API documentation if you are only getting a single object.
// For each object in the response array, create a new element for the carousel.
// Append each of these new elements to the carousel.
// Use the other data you have been given to create an informational section within the infoDump element.
// Be creative with how you create DOM elements and HTML.
// Feel free to edit index.html and styles.css to suit your needs.
// Remember that functionality comes first, but user experience and design are also important.
// Each new selection should clear, re-populate, and restart the carousel.
// Add a call to this function to the end of your initialLoad function above to create the initial carousel.
//--------------------------------------------------------------------------------------------------------------------------------

async function BreedSelect(breedId) {
  const loadBreedSelectBreedId = breedSelect.value;

  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
      {
        params: {
          breed_ids: BreedSelectBreedId,
          limit: 10,
        },
    }
      
    )

    const images = response.data;
    const carousel = document.getElementById("carousel");
    const infoDump = document.getElementById("infoDump");
    carousel.innerHTML = "";
    infoDump.innerHTML = "";

    breedInfo.forEach((info) => {
      const imgElement = document.createElement("img");
      imgElement.src = info.url;
      carousel.appendChild(imgElement);
  });
    if (images.length > 0 && images[0].breeds.length > 0) {
      const breed = images[0].breeds[0];
      const breedInfo = `
    <h3>${breed.name}</h3>
    <p>${breed.description}</p>
    <p><strong>Temperament:</strong> ${breed.temperament}</p>
    <p><strong>Orgin:</strong> ${breed.origin}</p>
    <p><strong>Life Span:</strong> ${breed.life_span}years</p>
    `;
      infoDump.innerHTNL = breedInfo;
    }
  } catch (error) {
    console.error("error fetching breed info:", error);
  }
  breedSelection.addEventListener("change", (event) => {
    const breedID = event.target.value;
    loadBreedSelectBreedIdInfo(breedID);
  });
}

//Create an additional file to handle an alternative approach.
axios
  .get("https//api.thecatapi.com/v1/breeds")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("There is a Error fetching data:", error));

//Within this additional file, change all of your fetch() functions to Axios!
// Axios has already been imported for you within index.js.
// If you've done everything correctly up to this point, this should be simple.
// If it is not simple, take a moment to re-evaluate your original code.
// Hint: Axios has the ability to set default headers. Use this to your advantage by setting a default header with your API key
// so that you do not have to send it manually with all of your requests! You can also set a default base URL!

//Default header
axios.defaults.headers.common["x-api-key"] =
  "live_bjvUnTs5gyVIhhYlIxj0C6CcBT2nDCuxjSTWYnT6c3CMrTC0REwctFDxA3wEjg06";
let response = await axios.get("https://api.thecatapi.com/v1/breeds/");
const catBreeds = response.data;

console.log(catbreed);

// Add Axios interceptors to log the time between request and response to the console.
// Hint: you already have access to code that does this!
// Add a console.log statement to indicate when requests begin.
// As an added challenge, try to do this on your own without referencing the lesson material.

axios.interceptors.request.use((request) => {
    console.log("starting request", request);
    request.metadata = { startTime: new Date()};
    progressBar.style.width = "0%"
    document.body.style.cursor = 'progress';
    return request;
});

axios.interceptors.response.use(response => {
    response.config.metadata.end = new Date().getTime();
    const duration = response.config.metadate.endTime - response.config.metadad.startTime;
    console.log('request')
    document.body.style.cursor = "default";
    return request;
},
(error) => {
    error.config.metadate.endTime = new Date().getTime();
    errpor.durationInMs =
    error.config.metadate.endTime - error.config.metadata.StartTime;
    document.body.style.cursor = "default";
    return request;

    return Promise.reject(error)

});
function updateProgress(progressEvent) {
    progressBar.style.width = `${progressEvent.progress * 100}%`;
   
    console.log(progressEvent.progress)
}


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