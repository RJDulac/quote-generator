//grab Ids from dom
const quoteContainer = document.getElementById("quote-container"),
  quoteText = document.getElementById("quote"),
  authorText = document.getElementById("author"),
  twitterButton = document.getElementById("twitter"),
  newQuoteButton = document.getElementById("new-quote");

//Get quote from API

const getQuote = async () => {
  //proxy for cors issue
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //if author is blank, assign "Unkown"
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unkown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    //api is using special characters that causes an error
    getQuote();
  }
};

//tweet quote
const tweetQuote = () => {
  const quote = quoteText.innerText,
    author = authorText.innerText,
    twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  //open new window
  open(twitterUrl, "_blank");
};

//Event Listeners
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

//On load
getQuote();
