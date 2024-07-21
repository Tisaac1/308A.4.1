const { left } = require("@popperjs/core");
const { data } = require("jquery");
import * as Carousel from "./Carousel.js";
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
        await fetch('https://api.thecatapi.com/v1/breeds');
        const data = await response.data;
        return data.breeds;
       console.log(breeds)

        breeds.foreach((breed) => {
            const option = document.createElement("option");
        option.value = breed.id;
    option.textContent = breed.name;
breedSelect.appendChild(option)})
    } catch (error) {
        console.error("Error fetching breeds:", error)
        return [];
    
} 