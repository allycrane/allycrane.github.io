const newQuoteButton = document.querySelector("#js-new-quote");

newQuoteButton.addEventListener("click", getQuote);

const answerButton = document.querySelector("#js-tweet");
const answerText = document.querySelector("#js-answer-text");
let currentAnswer = "";

answerButton.addEventListener("click", function() {
    answerText.textContent = currentAnswer;
});



const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

async function getQuote() {
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Request failed with status ${response.status}');
        }

    const trivia = await response.json();
    console.log(trivia);
    displayQuote(trivia.question);
    currentAnswer = trivia.answer;
    answerText.textContent = "";

}
catch (error) {
    console.error("Could not load trivia:", error);
    alert("Could not load trivia. Please try again.");
}
}

function displayQuote(question){
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = question;
}

getQuote();