const quizTotal = 10;
let quizWords = [];
let currentQ = 0;
let score = 0;
let answered = false;

const quizStart = document.querySelector("#quizStart");
const quizMain = document.querySelector("#quizMain");
const quizEnd = document.querySelector("#quizEnd");
const quizInfo = document.querySelector("#quizInfo");
const question = document.querySelector("#question");
const options = document.querySelector("#options");
const nextQBtn = document.querySelector("#nextQBtn");

function shuffled(arr) {
    const copy = arr.slice();
    return copy.sort(function() {
        return Math.random() - 0.5;
    })
}

function startQuiz() {
    quizWords = shuffled(words).slice(0, quizTotal);
    currentQ = 0;
    score = 0;
    quizStart.classList.add("hidden");
    quizEnd.classList.add("hidden");
    quizMain.classList.remove("hidden");
    showQuestion();
}

document.querySelector("#startQuizBtn").addEventListener("click", startQuiz);
document.querySelector("#restartBtn").addEventListener("click", startQuiz);

function makeOptions(correctWord) {
    const wrongPool = words.filter(function(w) {
        return w.word !== correctWord.word;
    });

     const wrongs = shuffled(wrongPool).slice(0, 3).map(function(w) {
        return w.meaning;
    });

    return shuffled(wrongs.concat(correctWord.meaning));
}

function showQuestion() {
    answered = false;
    nextQBtn.classList.add("hidden");

    const q = quizWords[currentQ];
    question.textContent = q.word;
    quizInfo.textContent = `第${currentQ + 1} / ${quizTotal} 題 | 目前得分 ${score}`;

    options.innerHTML = "";
    const optionsList = makeOptions(q);

    optionsList.forEach(function(text) {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.classList.add("option");
        btn.addEventListener("click", function() {
            checkAnswer(btn, q);
        });
        options.appendChild(btn);
    });
}

function checkAnswer(btn, q) {
    if(answered) {
        return;
    }
    answered = true;

    if(btn.textContent === q.meaning) {
        btn.classList.add("correct");
        score += 1;
    } else {
        btn.classList.add("wrong");
        document.querySelectorAll(".option").forEach(function(o) {
            if(o.textContent === q.meaning) {
                o.classList.add("correct");
            }
        });
    }

    quizInfo.textContent = `第${currentQ + 1} / ${quizTotal} 題 | 目前得分 ${score}`;
    nextQBtn.classList.remove("hidden");
}

nextQBtn.addEventListener("click", function() {
    currentQ += 1;
    if(currentQ >= quizTotal) {
        showResult();
    } else {
        showQuestion();
    }
});

function showResult() {
    quizMain.classList.add("hidden");
    quizEnd.classList.remove("hidden");
    document.querySelector("#finalScore").textContent = `${score} / ${quizTotal}`;

    const finalMsg = document.querySelector("#finalMsg");
    if(score === quizTotal) {
        finalMsg.innerHTML = `100分!<i class="fa-solid fa-trophy"></i>`;
    } else if(score >= 7) {
        finalMsg.textContent = `繼續加油!`;
    } else if(score >= 4) {
        finalMsg.textContent = `請認真背單字!!`;
    } else {
        finalMsg.textContent = `每個單字發抄10次!`;
    }
}
