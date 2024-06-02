import readline from "readline";
import { gameData } from "../domain/index.js";

/**
계산 로직과 다른점은
계산은 사용자와의 인터렉션에 관련이 없으나
UI는 사용자와의 인터렉션에 관련이 있음
그러므로 count에 따라 보여줘야할지 말지는 UI에서 다뤄야 한다고 판단했음
 */
/**
사용자 입력을 받는다
최소 최대값 입력을 받는다 
재시작 종료 옵션
몇회만에 맞췄는지 보여준다
*/

export async function playGame() {
  const boundary = await askBoundary();
  const [minNumber, maxNumber] = boundary.split(",").trim();
  const trialLimit = await askCount();
  let trial = 1; //trial 재할당을 위해 let으로 선언
  const answer = gameData(minNumber, maxNumber).answer;
  console.log(
    `컴퓨터가 ${minNumber}~${maxNumber} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`
  );
  trial = await tryLoop(trial, trialLimit, answer);

  askRestart();
}

async function tryLoop(trial, trialLimit, answer) {
  let trialCount = trial;
  while (trial <= trialLimit) {
    const inputValue = await readLineAsync("숫자 입력: ");
    const typeIsNumber = !isNaN(inputValue);
    if (!typeIsNumber) {
      console.log("숫자가 아닙니다.");
      continue;
    }
    if (parseFloat(inputValue) === answer) {
      printResult("success", trial);
      break;
    }
    if (trialCount < 5) {
      showInput(inputValue);
      gameData().printUpDown(answer, inputValue);
    }
    if (trialCount > trialLimit) return printResult("fail");
    if (typeIsNumber) trialCount--;
  }
  return trialCount;
}

async function askBoundary() {
  return await readLineAsync(
    "게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)"
  );
}
async function askCount() {
  return await readLineAsync("게임 시작을 위해 진행 가능 횟수를 입력해주세요.");
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
  const restartOrNot = await readLineAsync(
    "게임을 다시 시작하시겠습니까? (yes/no): "
  );
  if (restartOrNot === "yes") {
    resetAnswer();
    resetCount();
    resetGuess();
    return play();
  }
  console.log("게임을 종료합니다.");
}

function printResult(result, trial) {
  if (result === "success") {
    console.log("정답!");
    console.log(`축하합니다! ${trial}번 만에 숫자를 맞추셨습니다.`);
    return askRestart();
  }
  if (result === "fail")
    console.log(
      `5회 초과! 숫자를 맞추지 못했습니다. (정답: ${gameData().answer})`
    );
  return askRestart();
}
