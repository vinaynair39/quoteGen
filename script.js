const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show loading
function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.style.visibility = "hidden";
	authorText.hidden = true;
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		loader.hidden = true;
		quoteContainer.hidden = false;
		authorText.hidden = false;
		quoteContainer.style.visibility = "visible";
	}
}

// Get Quote from API

async function getQuote() {
	quoteContainer.hidden = true;
	showLoadingSpinner();
	const apiUrl = "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		// If Author is Blank, add Unkown
		if (data.author === "") {
			authorText.innerText = "Unknown";
		} else {
			authorText.innerText = data.quoteAuthor;
		}
		// Reduce font size for long Quotes
		if (data.quoteText.length > 120) {
			quoteText.classList.add("long-quote");
		} else {
			quoteText.classList.remove("long-quote");
		}
		quoteText.innerText = data.quoteText;

		// stop loader
		removeLoadingSpinner();
	} catch (error) {
		getQuote();
		console.log("no quote", error);
	}
}

// Tweeet Quote
function tweetQUote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twiterUrl = `https://twitter.com/intent/tweet?text=${quote} -${author}`;
	window.open(twiterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQUote);

getQuote();
