import readline from "readline";
import {
  gameStatus,
  InitialGameConfig,
  checkPromptNumber,
  createRandomNumber,
  settingConfig,
  changeState,
  returnSettingQuestion,
  returnSettingErrorMessage,
  returnGameQuestion,
  returnGameErrorMessage,
  copyArr,
  checkUpDown,
  returnResultMessage,
  asyncloopWhileCondition,
} from "../domain/index.js";

export async function startGame() {
  const { promptCount, totalSettingCount } = { ...settingConfig };

  const settingState = initializeGameSetting();
  changeState(settingState.status, gameStatus.USERSETTING_COUNT[promptCount]);
  console.log("24", settingState.status);

  await userSetting();
  computerSetting();

  const targetStatus = gameStatus.PLAYING;
  changeState(settingState.status, targetStatus);

  return playGame(settingState);

  async function userSetting() {
    const whileCondition = promptCount < totalSettingCount;
    await asyncloopWhileCondition(promptUserSetting, whileCondition);
  }

  function computerSetting() {
    const randomNumber = createRandomNumber(settingState.min, settingState.max);
    changeAnswer(settingState, randomNumber);
  }

  function initializeGameSetting() {
    //gameSetting초기화
    return { ...InitialGameConfig };
  }

  function addCount(count) {
    return count++;
  }

  async function promptUserSetting() {
    //count만큼 user setting받기
    const userAnswer = await readLineAsync(returnSettingQuestion(settingState.status));

    const isValid = checkPromptNumber(userAnswer);
    if (!isValid) return console.log(returnSettingErrorMessage(settingState.status));

    const nowStatus = settingState[gameStatus.USERSETTING_COUNT[promptCount]];
    changeState(nowStatus, userAnswer);
    addCount(promptCount);
  }
}

export async function playGame(state) {
  const playState = { ...state };

  const whileCondition = playState.userTrials.length <= playState.trialLimit;

  const userAnswer = await asyncloopWhileCondition(
    continueGame,
    whileCondition
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
  const endState = {...playState}

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

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}
