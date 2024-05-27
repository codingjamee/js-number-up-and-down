import readline from "readline";

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

function createRandomNumber() {
  return Math.floor(Math.random() * 50 + 1);
}

const prevGuess = (() => {
  let guess = [];
  const guessInputFn = (guessInput) => {
    guess.push(+guessInput);
    console.log(guessInput);
    console.log("이전 추측:", guess.join(", "));
  };
  const resetGuess = () => (guess = []);
  return { guessInputFn, resetGuess };
})();

function printUpDown(answer, input) {
  if (answer > input) {
    console.log("업");
  }
  if (answer < input) {
    console.log("다운");
  }
}

async function askRestart() {
  const restartOrNot = await readLineAsync(
    "게임을 다시 시작하시겠습니까? (yes/no): "
  );
  if (restartOrNot === "yes") {
    prevGuess.resetGuess();
    return play();
  }
  console.log("게임을 종료합니다.");
}

function printResult(result, count, answer) {
  if (result === "success") {
    console.log("정답!");
    console.log(`축하합니다! ${count}번 만에 숫자를 맞추셨습니다.`);
    return askRestart();
  }
  if (result === "fail")
    console.log(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`);
  return askRestart();
}

async function play() {
  const answer = createRandomNumber();
  console.log(answer);
  let cnt = 1;
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
  while (cnt <= 5) {
    const inputValue = await readLineAsync("숫자 입력: ");
    if (+inputValue === answer) {
      printResult("success", cnt);
      break;
    }
    prevGuess.guessInputFn(inputValue);
    printUpDown(answer, inputValue);
    cnt++;
  }
  //5회 초과시
  if (cnt > 5) printResult("fail", cnt, answer);
}

play();
