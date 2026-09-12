let index = 0;
const flashcard = document.querySelector("#flashcard");
const cardWord = document.querySelector("#cardWord");
const cardMeaning = document.querySelector("#cardMeaning");
const cardExample = document.querySelector("#cardExample");
const cardCounter = document.querySelector("#cardCounter");

function showCard() {
    const w = words[index];
    cardWord.textContent = w.word;
    cardMeaning.textContent = w.meaning;
    cardExample.textContent = w.example;
    cardCounter.textContent = `${index + 1} / ${words.length}`;
    flashcard.classList.remove("flipped");
}

flashcard.addEventListener("click", function() {
    flashcard.classList.toggle("flipped");
}) 

showCard(); 


document.querySelector("#nextBtn").addEventListener("click", function() {
    moveCard(1, false);
    // index += 1;
    // if(index >= words.length) {
    //     index = 0;
    // }
    // showCard(); 

});

document.querySelector("#prevBtn").addEventListener("click", function() {
    moveCard(-1, false);
    // index -= 1;
    // if(index < 0) {
    //     index = words.length - 1;
    // }
    // showCard(); 
})

document.querySelector("#shuffleBtn").addEventListener("click", function() {
    words.sort(function() {
        return Math.random() - 0.5;
    })
    index = 0;
    showCard();
})

const tabBtns = document.querySelectorAll(".tab-btn");

tabBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".tab-Btn").forEach(function(b) {
        b.classList.remove("active");})
        document.querySelectorAll(".page").forEach(function(p) {
        p.classList.remove("active");})
        btn.classList.add("active");
        document.querySelector("#" + btn.dataset.tab).classList.add("active");
    });
});

document.addEventListener("keydown", function(e) {
    if(e.key === "ArrowRight") {
        document.querySelector("#nextBtn").click();
    } else if(e.key === "ArrowLeft") {
        document.querySelector("#prevBtn").click();
    } else if(e.key === " ") {
        e.preventDefault();
        flashcard.classList.toggle("flipped");
    }
})









