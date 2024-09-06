$(".defaultTextContainer").empty();

let shuffleId = $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(r => r.deck_id);

const grabNewCard = (shuffleId) =>
    Promise.resolve($.getJSON(`https://deckofcardsapi.com/api/deck/${shuffleId}/draw/?count=1`));

Promise.resolve(shuffleId)
    .then(r => {
        $('#newCard').on('click', () => {
            Promise.resolve(grabNewCard(r))
                .then(t => {
                    if (t.remaining == 0) {
                        $('#newCard')
                            .off('click')
                            .text('No more cards!')
                            .css({ 'cusror': 'not-allowed' })
                            .on('click', () => alert("No more cards in the deck!"));
                        return;
                    }
                    displayNewCard(t);
                });
        });
    })
    .catch(e => {
        console.log("There was an error");
        console.error(e);
    });
const displayNewCard = resp => {
    const rotation = `rotate(${Math.floor(Math.random() * 359)}deg)`;
    $('.defaultTextContainer')
        .append($("<img>")
            .attr({
                'class': 'newImageCard',
                'src': resp.cards[0].image,
            })
            .css({
                'position': 'absolute',
                'margin-left': '-50px',
                'margin-top': '5%',
                'transform': rotation,
                '-ms-transform': rotation,
                '-moz-transform': rotation,
                '-webkit-transform': rotation,
                '-o-transform': rotation,
            }));
}