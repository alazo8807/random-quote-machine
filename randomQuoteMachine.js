var colors = [ "#03204f", "#4f1902", "#204f02", "#bc3232", "#32bc7b", "#444436", "#3a2933", "#3d1919", "#bc4418",
  "#306030", "#30605d", "#403060", "#470a47", "#c40101", "#160087"];

init();

function init(){
  var quote = getQuote();
  createTweetFromQuote( quote );
}

function getQuote(){
  var quoteObj = {
    text: 'Quote Text',
    author: 'John Doe'
  }

  var url = "https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/random.json"

  fetch(url)
    //See if there is any error fetching the data
    .then(handleError)
    //No error, process the data comming from the promise
    .then(parseData)
    //update the page with the new quote
    .then(updateHTML)
    //There was an error, process it
    .catch(function(error){
      alert("Sorry, there was an error, please try again.")
    });

  function handleError(data)  {
    //Check if it was fetched ok. If not throw error.
    if(!data.ok){
      throw Error (data.status);
    }
    return data.json();
  }

  function parseData(data)  {
     quoteObj.text = data.quote;
     quoteObj.author = data.author;
     return quoteObj;
  }

  function updateHTML (data)  {
    var quoteText = data.text;
    var quoteAuthor = data.author;
    var randomNbr = Math.floor(Math.random()*colors.length);
    var color = colors[randomNbr];

    $('body').css('background-color', color);
    $('.buttons').css('background-color', color);
    //hide the quote and update the text
    $('p').fadeOut(750, function(){
      //quoteText has html elements, use html and text functions to remove
      //html tags and save just the text into the span
      $('#quoteText').html(quoteText);
      //save just the quote text
      var str = $('#quoteText').text();
      //now convert it to html text again
      $('#quoteText').html(str);
      $('#author').html('- ' + quoteAuthor);
      $('p').css('color', color);

    });
    //Show the new quote
    $('p').fadeIn(1750);

  }

  return quoteObj;
}

// Update tweet button from text
function updateTweetButton( text ) {
  var newHref = "https://twitter.com/intent/tweet?text=" + text + "&hashtags=quotes"
  $('#twitterBtn').attr('href', newHref);

};

// Generates tweet text and creates button
function createTweetFromQuote( quote ) {
  var tweetText = (quote.text+ " -" + quote.author);

  updateTweetButton( tweetText )
};

$('#newQuoteBtn').click(function(){
  init();
});
