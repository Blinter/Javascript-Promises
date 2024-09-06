# Javascript Promises - Asynchronous Code

### Part 1 : Number Facts

1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.

```javascript
$(".defaultTextContainer").empty();
$.getJSON("http://numbersapi.com/42/math?json")
    .then(r => {
        $(".defaultTextContainer").append(`${r.text}<br>`);
    });
```

2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

```javascript
$(".defaultTextContainer").empty();
$.getJSON("http://numbersapi.com/42,8,16,24/math?json")
    .then(r => {
        for (const k in r) $(".defaultTextContainer").append(`${r[k]}<br>`);
    });

// Chained
let multipleRequests = [
    $.getJSON("http://numbersapi.com/42/math?json"),
    $.getJSON("http://numbersapi.com/8/math?json"),
    $.getJSON("http://numbersapi.com/24/math?json"),
    $.getJSON("http://numbersapi.com/16/math?json"),
];

Promise.all(multipleRequests)
    .then(r => {
        $(r).each((i, e) => {
            console.log(i.toString() + ": " + e.text);
        });
    });
```

3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

```javascript
let multipleRequests = [
    $.getJSON("http://numbersapi.com/42/math?json"),
    $.getJSON("http://numbersapi.com/42/math?json"),
    $.getJSON("http://numbersapi.com/42/math?json"),
    $.getJSON("http://numbersapi.com/42/math?json"),
];
$(".defaultTextContainer").empty();
Promise.all(multipleRequests)
    .then(r => {
        $(r).each((i, e) => {
            // console.log(i.toString() + ": " + e.text);
            $(".defaultTextContainer").append(e.text + "<br>");
        });
    });
```

---

### Part 2: Deck of Cards

1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

```javascript
$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(r => {
        $.getJSON(`https://deckofcardsapi.com/api/deck/${r.deck_id}/draw/?count=1`)
            .then(t => {
                console.log(`${t.cards[0].value} of ${t.cards[0].suit}`);
            });
    });
```

2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.
    
    Once you have both cards, **console.log** the values and suits of both cards.

```javascript
$(".defaultTextContainer").empty();
$.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(r => {
        $.getJSON(`https://deckofcardsapi.com/api/deck/${r.deck_id}/draw/?count=1`)
            .then(t => {
                console.log(`${t.cards[0].value} of ${t.cards[0].suit}`);
                $.getJSON(`https://deckofcardsapi.com/api/deck/${r.deck_id}/draw/?count=1`)
                    .then(e => {
                        console.log(`${e.cards[0].value} of ${e.cards[0].suit}`);
                    });
            });
    });
```

3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
   
```
See index.html, deck_of_cards.js
```