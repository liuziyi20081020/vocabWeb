function loadLearned() {
    const saved = localStorage.getItem("learnedWords");
    if(saved === null) {
        return [];
    }
    return JSON.parse(saved);
}

let learned = loadLearned();

function saveLearned() {
    localStorage.setItem("learnedWords", JSON.stringify(learned));
}

function isLearned(word) {
    return learned.includes(word);
}

function toggleLearned(word) {
    if(isLearned(word)) {
        learned = learned.filter(function(w) {
            return w !== word;
        });
    } else {
        learned.push(word);
    }
    saveLearned();
    updateLearnBtn();
    renderProgress();
}

const learnBtn = document.querySelector("#learnBtn");
function updateLearnBtn() {
    const w = words[index].word;
    if(isLearned(w)) {
        learnBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>已學會 ';
    } else {
        learnBtn.textContent = "我學會了!";
        learnBtn.classList.add("done");
    }
}

learnBtn.addEventListener("click", function() {
    toggleLearned(words[index].word);
})

function renderProgress() {
    const total = words.length;
    const count = learned.length;
    const percent = Math.round(count / total * 100);

    document.querySelector("#progressFill").style.width = percent + "%";
    document.querySelector("#progressText").textContent = `已學會 ${count} / ${total} 個單字(${percent}%)`;

    const list = document.querySelector("#learnedList");
    list.innerHTML = "";
    learned.forEach(function(wordText) {
        const li = document.createElement("li");
        li.textContent = wordText;
        list.appendChild(li);
    });

}

document.querySelector("#resetBtn").addEventListener("click", function() {
    const ok = confirm("確定要清空學習記錄嗎?這個動作無法復原。")
    if(ok) {
        learned = [];
        saveLearned();
        updateLearnBtn();
        renderProgress();
    }
});

document.querySelector("#nextBtn").addEventListener("click", updateLearnBtn);
document.querySelector("#prevBtn").addEventListener("click", updateLearnBtn);
document.querySelector("#shuffleBtn").addEventListener("click", updateLearnBtn);
updateLearnBtn();
renderProgress();

let reviewMode = false;
const reviewModeBtn = document.querySelector("#reviewModeBtn");

reviewModeBtn.addEventListener("click", function() {
    reviewMode = !reviewMode;

    // reviewModeBtn.innerHTML = reviewMode;
        if(reviewMode) {
            reviewModeBtn.innerHTML = '<i class="fa-solid fa-repeat"></i> 只看還沒學會的'
        } else{
            reviewModeBtn.innerHTML = '<i class="fa-solid fa-repeat"></i> 全部單字';
        }

        if(reviewMode && !cardOk(index)) {
            moveCard(1, false);
        } else{
            showCard();
        }
});

function moveCard(direction, allowStay) {
    let steps = 0;
    let i = index;

    if(!allowStay || !cardOk(i)) {
        do {
            i += direction;
            if(i >= words.length) {
                i = 0;
            }
            if(i < 0) {
                i = words.length - 1;
            }
            steps += 1;
        } while(!cardOk(i) && steps <= words.length);

        if(!cardOk(i)) {
            cardWord.textContent = "全部都學會了!";
            cardMeaning.textContent = "去測驗挑戰滿分吧!"
            cardExample.textContent = "";
            cardCounter.textContent = `$${learned.length} / ${words.length}`;
            return;
        }
    }
    index = i;
    showCard();
    updateLearnBtn();
}

function cardOk(i) {
    if(!reviewMode) {
        return true;
    }
    return !isLearned(words[i].word);
}




