/**
계산 로직과 다른점은
계산은 사용자와의 인터렉션에 관련이 없으나
UI는 사용자와의 인터렉션에 관련이 있음
그러므로 count에 따라 보여줘야할지 말지는 UI에서 다뤄야 한다고 판단했음
 */
import readline from "readline";
import { gameData } from "../domain/index.js";

/**
 * 따로 constant 객체로 뺀 이유
 * 나중에 문구를 수정할 때 묶어두면 편함
 * 프로퍼티 명으로 문구 빠르게 유추 가능
 */
const constant = {
  askBoundary: "게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50) ",
  askTrialLimit: "게임 시작을 위해 진행 가능 횟수를 입력해주세요.",
  askRestart: "게임을 다시 시작하시겠습니까? (yes/no): ",
};

const consoleContent = ({ answer, trialCount, minNumber, maxNumber }) => {
  return {
    notValid: "유효하지 않은 입력입니다.",
    guessNumber: `컴퓨터가 ${minNumber}~${maxNumber} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`,
    correct: `정답! 
  축하합니다! ${trialCount}번 만에 숫자를 맞추셨습니다.`,
    fail: `5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`,
    end: "게임을 종료합니다.",
  };
};

/**
사용자 입력을 받는다
최소 최대값 입력을 받는다 
재시작 종료 옵션
몇회만에 맞췄는지 보여준다
*/

export async function playGame() {
  const { answer, trialLimit, minNumber, maxNumber, settingIsNotValid } =
    await startSetting();
  if (settingIsNotValid) {
    printConsole({ result: consoleContent().notValid });
    return askRestart();
  }
  printConsole({
    result: consoleContent({ minNumber, maxNumber }).guessNumber,
  });
  const { result, trialCount } = await tryLoop(trialLimit, answer);
  printConsole({ result, trialCount, answer });
  askRestart();
}

function printConsole({ result, trialCount, answer }) {
  if (result === "success") {
    printConsole({ result: consoleContent({ trialCount }).correct });
    return;
  }
  if (result === "fail") {
    printConsole({ result: consoleContent({ answer }).fail });
    return;
  }
  console.log(result);
}

async function startSetting() {
  const { result: boundary, isValid: boundaryIsValid } = await userInputSet(
    constant.askBoundary
  );
  const [minNumber, maxNumber] = setMinMax(boundary);
  const { result: trialLimit, isValid: limitIsValid } = await userInputSet(
    constant.askTrialLimit
  );
  const answer = gameData(minNumber, maxNumber).answer;
  return {
    answer,
    trialLimit,
    minNumber,
    maxNumber,
    settingIsNotValid: !boundaryIsValid || !limitIsValid,
  };
}

function setMinMax(boundary) {
  const [first, second] = boundary.split(",");
  const minNumber = Math.min(first, second);
  const maxNumber = Math.max(first, second);
  return [minNumber, maxNumber];
}

async function userInputSet(askConstant) {
  const result = await readLineAsync(askConstant);
  const input = result.split(",");
  const isValid = validation(...input);
  return { result, isValid };
}

function validation(...userInput) {
  let isValid;
  isValid = userInput.reduce(
    (isValid, input) => isValid && !isNaN(input),
    false
  );
  return isValid;
}

async function tryLoop(trialLimit, answer) {
  let trialCount = 1;
  const guess = [];
  while (trial <= trialLimit) {
    const inputValue = await readLineAsync("숫자 입력: ");
    const inputValid = validation(inputValue);
    if (!inputValid) continue;
    const inputCorrect = parseFloat(inputValue) === answer;
    const overLimit = trialCount > trialLimit;

    if (inputCorrect) ({ result: "success", trialCount });
    if (overLimit) ({ result: "fail" });

    const guesses = guess.concat(gameData().showInput(guess, inputValue));
    printConsole({ result: `이전 추측: ${guesses.join(", ")}` });
    const upDown = gameData().printUpDown(answer, inputValue);
    printConsole({ result: upDown });

    if (inputValid) trialCount++;
  }
  return trialCount;
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

async function askRestart() {
  const restartOrNot = await readLineAsync(constant.askRestart);
  if (restartOrNot === "yes") {
    return playGame();
  }
  printConsole({ result: consoleContent().end });
}
