async function main() {
  const question = document.querySelector(".questionsInput");
  const userAnswer = document.querySelector(".userAnswerInput");
  const refresh = document.querySelector(".refresh");
  const winner = document.querySelector(".winner");
  const levelsBtn = document.querySelectorAll(".levels button");

  let element = await (await fetch("./scripts/elements.json")).json();
  let answers = await (await fetch("./scripts/answers.json")).json();
  let randomNum;
  let easyLevel = true;
  let rightAnswer = document.createElement("audio");

  let audios = [
    "./assets/audio/afarin (3).mp3",
    "./assets/audio/Effect Sedaye Tashvigh - (5).mp3",
  ];
  function selectWriteElem() {
    if (!easyLevel) return hardAnswerSelectWriteElem();
    randomNum = Math.floor(Math.random() * element.length);
    question.textContent =
      Number(element.indexOf(element[randomNum])) +
      1 +
      " " +
      element[randomNum];
    userAnswerKeyUp();
  }
  function userAnswerKeyUp() {
    if (!easyLevel) return userHardAnswerKeyUp();
    winner.classList.remove("active");
    let answer = answers[element.indexOf(element[randomNum])];
    let lowerCase = userAnswer.value.toLowerCase();
    if (!lowerCase) {
      userAnswer.classList.remove("right");
      return userAnswer.classList.remove("dangerBg");
    }
    if (answer === lowerCase) {
      rightAnswer.pause();
      let random = Math.round(Math.random() * audios.length);
      rightAnswer.src = audios[random];
      rightAnswer.play();
      winner.classList.add("active");
      userAnswer.classList.add("right");
      return;
    } else if (answer.includes(lowerCase) && answer[0] === lowerCase[0]) {
      userAnswer.classList.add("right");
      userAnswer.classList.remove("dangerBg");
    } else {
      userAnswer.classList.add("dangerBg");
      userAnswer.classList.remove("right");
    }
  }
  function hardAnswerSelectWriteElem() {
    randomNum = Math.floor(Math.random() * answers.length);
    question.textContent = answers[randomNum].toUpperCase();
    userHardAnswerKeyUp();
  }

  function userHardAnswerKeyUp() {
    winner.classList.remove("active");
    let answer =
      answers.indexOf(answers[randomNum]) +
      1 +
      " " +
      element[answers.indexOf(answers[randomNum])].toLowerCase();
    let lowerCase = userAnswer.value.toLowerCase();
    if (!lowerCase) {
      userAnswer.classList.remove("right");
      return userAnswer.classList.remove("dangerBg");
    }
    if (answer === lowerCase) {
      let random = Math.round(Math.random() * audios.length);
      rightAnswer.src = audios[random];
      rightAnswer.play();
      winner.classList.add("active");
      userAnswer.classList.add("right");
      return;
    } else if (answer.includes(lowerCase) && answer[0] === lowerCase[0]) {
      userAnswer.classList.add("right");
      userAnswer.classList.remove("dangerBg");
    } else {
      userAnswer.classList.add("dangerBg");
      userAnswer.classList.remove("right");
    }
  }
  selectWriteElem();
  levelsBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.contains("easy") ? (easyLevel = true) : (easyLevel = false);
      btn.parentElement.parentElement.remove();
      if (easyLevel) {
        selectWriteElem();
      } else {
        hardAnswerSelectWriteElem();
        userAnswer.placeholder = "اسم عنصر را با عدد اتمی بنویسید";
      }
    });
  });
  refresh.addEventListener("click", selectWriteElem);
  userAnswer.addEventListener("keyup", userAnswerKeyUp);
}
document.addEventListener("DOMContentLoaded", main);
