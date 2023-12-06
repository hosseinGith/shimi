async function main() {
  const question = document.querySelector(".questionsInput");
  const userAnswer = document.querySelector(".userAnswerInput");
  const refresh = document.querySelector(".refresh");
  const winner = document.querySelector(".winner");

  let element = await (await fetch("./scripts/elements.json")).json();
  let answers = await (await fetch("./scripts/answers.json")).json();
  let randomNum;

  function selectWriteElem() {
    randomNum = Math.floor(Math.random() * element.length);
    question.value =
      Number(element.indexOf(element[randomNum])) +
      1 +
      " " +
      element[randomNum];
    userAnswerKeyUp();
  }
  function userAnswerKeyUp() {
    winner.classList.remove("active");
    let answer = answers[element.indexOf(element[randomNum])];
    if (!userAnswer.value) {
      userAnswer.classList.remove("right");
      return userAnswer.classList.remove("dangerBg");
    }
    if (answer === userAnswer.value) {
      winner.classList.add("active");
      userAnswer.classList.add("right");
      return;
    } else if (
      answer.includes(userAnswer.value) &&
      answer[0] === userAnswer.value[0]
    ) {
      userAnswer.classList.add("right");
      userAnswer.classList.remove("dangerBg");
    } else {
      userAnswer.classList.add("dangerBg");
      userAnswer.classList.remove("right");
    }
  }
  function refreshElement() {
    selectWriteElem();
  }
  selectWriteElem();
  refresh.addEventListener("click", refreshElement);
  userAnswer.addEventListener("keyup", userAnswerKeyUp);
}
main();
