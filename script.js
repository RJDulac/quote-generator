//Get quote from API

const getQuote = async () => {
  //proxy for cors issue
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    //api is using special characters that causes an error
    getQuote();
    console.log("Something went wrong", error);
  }
};

//On load
getQuote();
