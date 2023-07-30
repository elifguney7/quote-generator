const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading(){
    //Show loading
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    //Hide loading
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    //Choose random quote
    loading();
    i = Math.floor(Math.random()*apiQuotes.length);
    const quote = apiQuotes[i];
    authorText.textContent = quote.author;
    //Style font size according to quote length.
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Hide load and set quote    
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes(){
    //Fetch quote from API
    loading();
    const apiURL ='https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
       //ERROR
    }
}

function tweetQuote(){
    //Tweet quote
    const twitterURL =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuotes();