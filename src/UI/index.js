import {
  gameStatus,
  checkPromptNumber,
  createRandomNumber,
  checkUpDown,
  runAsyncLoopWhileCondition,
  GameState,
  showGuideMessage,
  getGameInstructions,
} from "../domain/index.js";
import { addDom, addNumber, toNumber } from "../utils/util.js";

const startTemplate = () => {
  return `
  <style>
    .container {
      background-color: lightgrey;
      width: 600px;
      margin: 200 auto;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
  </style>
  <article class="container">
    <h1>🔢 숫자 업 & 다운 Game</h1>
    <h3>게임설정</h3>
    <em>숫자 범위</em>
    <input id="input">
  </article>
`;
};

export async function startGame() {
  //추후 여러 게임을 동시에 진행하기 위해
  console.log('start game')
  const gameState1 = GameState();
  const root = document.getElementById("root");
  addDom().addChild(root, startTemplate());

  const userSettingCount = () => gameState1.getState().promptCount;
  gameState1.updateState(
    "status",
    gameStatus.USERSETTING_COUNT[userSettingCount()]
  );

  await userSetting();
  computerSetting();

  const targetStatus = gameState1.getState().PLAYING;
  gameState1.updateState("status", targetStatus);

  return playGame();

  async function userSetting() {
    const totalUserSettingCount = gameState1.getState().totalSettingCount;
    const whileCondition = () => userSettingCount() < totalUserSettingCount;
    await runAsyncLoopWhileCondition(promptUserSetting, whileCondition);
  }

  function computerSetting() {
    const { min, max } = gameState1.getState();
    const randomNumber = createRandomNumber(min, max);
    gameState1.updateState("answer", randomNumber);
  }

  async function promptUserSetting() {
    //count만큼 user setting받기
    const userAnswer = await readLineAsync(
      getGameInstructions().returnSettingQuestion(gameState1.getState().status)
    );

    const isValid = checkPromptNumber(userAnswer);
    if (!isValid) {
      gameState1.updateState("status", gameStatus.NOTVALID_ANSWER);
      const message = getGameInstructions().returnSettingErrorMessage(state);
      return showGuideMessage(message);
    }

    const count = gameState1.getState().promptCount;
    const targetStatus = gameStatus.USERSETTING_COUNT[count];

    gameState1.updateState(targetStatus, toNumber(userAnswer));
    gameState1.updateState("promptCount", addNumber(count));
    gameState1.updateState(
      "status",
      gameStatus.USERSETTING_COUNT[addNumber(count)]
    );
  }
}

export async function playGame(state) {
  const playState = { ...state };

  const whileCondition = () =>
    playState.userTrials.length <= playState.trialLimit;

  const userAnswer = await runAsyncLoopWhileCondition(
    continueGame,
    whileCondition()
  );

  endGame(playState, userAnswer);

  //계속 게임이 진행됨
  async function continueGame() {
    //validCount인지 확인
    const isValidCount = checkValidCount(state);
    if (!isValidCount) return changeState(state);
    //loop를 빠져나옴

    //user 입력 받음
    const userInput = await promptUser();

    //validation 확인
    const isValid = checkPromptNumber(userInput);
    if (!isValid) return console.log(returnGameErrorMessage());

    //answer인지 확인
    const isAnswer = checkIsAnswer(userInput, playState);
    if (isAnswer) return true;

    onValidGame(userInput);
  }

  function checkValidCount() {
    return playState.trialLimit >= playState.userTrials.length;
  }

  function onValidGame(userInput) {
    const isUp = checkUpDown(playState.answer, userInput);
    console.log(`${isUp ? "up" : "down"}`);

    addUserTrials(userInput);
    console.log(user.userTrials);

    addCount();
  }

  function addUserTrials(userInput) {
    playState.userTrials.push(userInput);
  }

  async function promptUser() {
    //user의 응답을 받음
    return await readLineAsync(returnGameQuestion(playState.status));
  }

  function checkIsAnswer(userTry) {
    return userTry === playState.answer;
  }
}

export async function endGame(playState, result) {
  const endState = { ...playState };

  if (result) onSuccessGame();
  if (!result) onFailGame();

  console.log(returnResultMessage(endState.status));

  const answer = await askRestart();
  if (answer === "yes") return playGame();

  return console.log("게임을 종료합니다.");

  function onFailGame() {
    changeState(endState.status, gameStatus.FAIL);
  }

  function onSuccessGame() {
    changeState(endState.status, gameStatus.SUCCESS);
  }

  async function askRestart() {
    return await readLineAsync("다시 시작하시겠습니까? (yes / no) : ");
  }
}

// function readLineAsync(query) {
//   return new Promise((resolve, reject) => {
//     if (arguments.length !== 1) {
//       reject(new Error("arguments must be 1"));
//     }

//     if (typeof query !== "string") {
//       reject(new Error("query must be string"));
//     }

//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     rl.question(query, (input) => {
//       rl.close();
//       resolve(input);
//     });
//   });
// }
