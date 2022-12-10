const caRDS__ = document.querySelectorAll(".card"),
    time__ = document.querySelector(".time b"),
    FLIPS = document.querySelector(".flips b"),
    rfsBTN = document.querySelector(".details button");




let max_TIME = 20;
let leftTIME = max_TIME;
let current_flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPla___ = false;
let cardOne, cardTwo, timer;



function intialTIMER() {
    if (leftTIME <= 0) {
        return clearInterval(timer);
    }
    leftTIME--;
    time__.innerText = leftTIME;
}

function flio_carrrds({ target: clickedCard }) {
    if (!isPla___) {
        isPla___ = true;
        timer = setInterval(intialTIMER, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && leftTIME > 0) {
        current_flips++;
        FLIPS.innerText = current_flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        MATCHED___CARD(cardOneImg, cardTwoImg);
    }
}

function MATCHED___CARD(firstIMG, secondIMG) {
    if (firstIMG === secondIMG) {
        matchedCard++;
        if (matchedCard == 6 && leftTIME > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flio_carrrds);
        cardTwo.removeEventListener("click", flio_carrrds);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function SHUffle_caRDS() {
    leftTIME = max_TIME;
    current_flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    time__.innerText = leftTIME;
    FLIPS.innerText = current_flips;
    disableDeck = isPla___ = false;

    let aRrAY__ = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    aRrAY__.sort(() => Math.random() > 0.5 ? 1 : -1);

    caRDS__.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/${aRrAY__[index]}.jpg`;
        }, 500);
        card.addEventListener("click", flio_carrrds);
    });
}

SHUffle_caRDS();

rfsBTN.addEventListener("click", SHUffle_caRDS);

caRDS__.forEach(card => {
    card.addEventListener("click", flio_carrrds);
});