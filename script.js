//grab Ids from dom
const quoteContainer = document.getElementById("quote-container"),
  quoteText = document.getElementById("quote"),
  authorText = document.getElementById("author"),
  twitterButton = document.getElementById("twitter"),
  newQuoteButton = document.getElementById("new-quote"),
  loader = document.getElementById("loader");

//show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//hide loading
const complete = () => {
  if (!loading.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};
//Get quote from API

const getQuote = async () => {
  loading();
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
    //stop loader. Show quote
    complete();
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
