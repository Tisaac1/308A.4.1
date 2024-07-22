
import * as Carousel from ".carousel.js";
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
//Request data from an external API using fetch and Axios.

async function initialLoad() {
    try {
        await fetch('https://api.thecatapi.com/v1/breeds');
        const breed = await response.data;
    
       console.log(breeds)

        
            breeds.forEach(breed => {
                const option = document.createElementById ('option')
                option.value = breed.id;
                option.textContent = breed.name;
    option.textContent = breed.name;
    breedSelect.appendChild(option)

            }); 
        } catch (error) {
        console.error("Error fetching breeds:", error)
        return [];
    }
} 
console.log(breedSelect)


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
        const response = await axious.get('https://api.thecatapi.com/v1/images/search', {
            params: {
                breed_ids: BreedSelectBreedId,
                limit:10
            }
        })

const images = response.data;
const carousel = document.getElementById('carousel');
const infoDump = document.getElementById('infoDump');
carousel.innerHTML = '';
infoDump.innerHTML = '';

breedInfo.forEach(info => {
    const imgElement = document.createElement('img');
    imgElement.src = info.url;
    carousel.appendChild(imgElement);

});
if (images.length > 0 && images [0].breeds.length > 0) {
    const breed = images [0].breeds[0];
    const breedInfo = `
    <h3>${breed.name}</h3>
    <p>${breed.description}</p>
    <p><strong>Temperament:</strong> ${breed.temperament}</p>
    <p><strong>Orgin:</strong> ${breed.origin}</p>
    <p><strong>Life Span:</strong> ${breed.life_span}years</p>
    `;
    infoDump.innerHTNL = breedInfo;
};
    }catch (error) {
        console.error('error fetching breed info:', error);

    }
breed Selection.addEventListener('change',(event) => {
    const breedID = event.target.value;
    loadbreedInfo(breedID)
})
