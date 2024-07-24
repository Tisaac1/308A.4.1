//import * as Carousel from ".carousel.js";
import axios from "axios";

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
    await fetch ("https://api.thecatapi.com/v1/breeds");
    const breed = await response.data();

    console.log(breed);

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching breeds:", error);

  }
}

initialLoad();
// ;console.log(breedSelect);

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
    const response = await axios.get("/images/search?breed_ids=${breedId}&limit=10")

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
      infoDump.innerHTML = breedInfo;
    }
  } catch (error) {
    console.error("error fetching breed info:", error);
  }
  breedSelection.addEventListener("change", (event) => {
    const breedID = event.target.value;
    loadBreedSelectBreedIdInfo(breedID);
  });
}

initialLoad();
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

console.log(catBreed);


// Create a progress bar to indicate the request is in progress.
// The progressBar element has already been created for you.
// You need only to modify its width style property to align with the request progress.
// In your request interceptor, set the width of the progressBar element to 0%.
// This is to reset the progress with each request.
// Research the axios onDownloadProgress config option.
// Create a function "updateProgress" that receives a ProgressEvent object.
// Pass this function to the axios onDownloadProgress config option in your event handler.
// console.log your ProgressEvent object within updateProgress, and familiarize yourself with its structure.
// Update the progress of the request using the properties you are given.
// Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire once or twice per request to this API. 
// This is still a concept worth familiarizing yourself with for future projects.

axios.interceptors.request.use(request => {
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

// As a final element of progress indication, add the following to your Axios interceptors:
// In your request interceptor, set the body element's cursor style to "progress."
// In your response interceptor, set the body element's cursor style to "default."
(error) => {
    error.config.metadate.endTime = new Date().getTime();
    errpor.durationInMs =
    error.config.metadate.endTime - error.config.metadata.StartTime;
    document.body.style.cursor = "default";
    return request;

    return Promise.reject(error)

});

function updateProgress(progressEvent) {
    progressBar.style.width = `${progressEvent.progress * 100}%` / progressEvent.total;
   progressBar.style.width = `${percentCompleted}%`;
    // console.log(progressEvent.progress)
    axios.defaults.onDownloadProgress = updateProgress;
}

// To practice posting data, we will create a system to "favourite" certain images.
// The skeleton of this favourite() function has already been created for you.
// This function is used within Carousel.js to add the event listener as items are created.
// This is why we use the export keyword for this function.
// Post to the cat API's favourites endpoint with the given id.
// The API documentation gives examples of this functionality using fetch(); use Axios!
// Add additional logic to this function such that if the image is already favourited, you delete that favourite using the API, giving this function "toggle" behavior.
// You can call this function by clicking on the heart at the top right of any image.

export async function favourite(imgId) {
try{
    const response = await axios.post("https://api.thecatapi.com/v1/favourites")
    const favourites = response.data;
    
        ////https://api.thecatapi.com/v1/images/search?api_key=live_bjvUnTs5gyVIhhYlIxj0C6CcBT2nDCuxjSTWYnT6c3CMrTC0REwctFDxA3wEjg06%27
        const favouritesImage = response.data;
        console.log("Favorite images:", FavoriteImages);
        carousel.clear();
        FavoriteImages.forEach((image) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            const img = document.createElement("img");
            img.src = image.image.urlimg.alt = image.image.breeds[0].name;
            carouselItem.appendChild(img);
            carousel.addItem(carouselItem);
        });
    }catch (error) {
        console.error(`Error Checking favorite status`,error);
        return false;
    }
}
async function getFavourites(){
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/favourites",
        
      );
      const favoriteImages = response.data;
      console.log("Favorite images:", favoriteImages);
      carousel.clear();
      favoriteImages.forEach((image) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        const img = document.createElement("img");
        img.src = image.image.url;
        img.alt = image.image. breeds[0].name;
        carouselItem.appendChild(img);
        Carousel.addItem(carouselItem);
  });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }
  
  getFavouritesBtn.addEventListener("click", getFavourites);
  
  initialLoad(); 
  