const customName = document.getElementById("custom-name");

const generateBtn = document.querySelector(".generate");

const story = document.querySelector(".story");

function randomValueFromArray(array) {
const random = Math.floor(Math.random() * array.length);
return array[random];
}

const places = [
    "Norlin",
    "Tilted Towers",
    "Half Fast Subs"
];

const events =[
    "pooped their pants",
    "backflipped for the first time spontaneously",
    "wore the party cat hat and was the life of the party"
];

const characters = [
    "Log",
    "Aid",
    "AC"
];

function returnRandomStoryString() {
    const randomPlace = randomValueFromArray(places);
    const randomEvent = randomValueFromArray(events);
    const randomCharacter = randomValueFromArray(characters);

    const storyText = `It was 94 Fahrenheit outside, so ${randomCharacter} went for a stroll. When they got to ${randomPlace}, they let a fart slip by accident, then ${randomEvent}. Bob saw the whole thing, but was not surprised — ${randomCharacter} weighs 300 pounds, and is allergic to Ozempic.`;
    return storyText;
}

generateBtn.addEventListener("click", function() {
let newStory = returnRandomStoryString();
if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
}
if (document.getElementById("uk").checked) {
    const weight = Math.round (300/14)+" stone";
    const temperature = Math.round ((94-32)* 5/9) + " Celsius";
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Fahrenheit", temperature);
}

story.textContent = newStory;
});