const cardContainer = document.getElementById('cardContainer');


async function fetchRandomJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    return data;
}

async function fetchRandomQuote() {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return data.content;
}

async function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    const openingInfo = await fetchRandomJoke();
    front.innerText = "JOKE\n" + openingInfo.setup + "\n" + openingInfo.punchline;

    const back = document.createElement('div');
    back.classList.add('back');

    card.addEventListener('click', async () => {
        if (card.style.transform === 'rotateY(180deg)') {
            card.style.transform = 'rotateY(0deg)';
            const info = await fetchRandomJoke();
            back.innerText = "JOKE\n" + info.setup + "\n" + info.punchline;
            new Audio('rickroll.wav').play();
        } else {
            card.style.transform = 'rotateY(180deg)';
            back.innerText = "QUOTE\n" + await fetchRandomQuote();
            new Audio('rickroll.wav').play();
        }
    });

    card.appendChild(front);
    card.appendChild(back);
    cardContainer.appendChild(card);
}

for (let i = 0; i < 15; i++) {
    createCard();
}
