import readline from "readline";

function Init () {
  const createRandomNumber = Math.floor(Math.random() * 50 + 1);
  this.answer = createRandomNumber;
  console.log(this.answer);
  this.cnt = 1;
  this.getCnt = () => this.cnt;
  this.addCnt = () => this.cnt++;
};

function InitGuess() {
  this.guess = [];
  this.showInput = (guessInput) => {
    this.guess.push(+guessInput);
    console.log(guessInput);
    console.log("이전 추측:", this.guess.join(", "));
  };
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

function printUpDown(input, answer) {
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
    return play();
  }
  console.log("게임을 종료합니다.");
}

function printResult(result, answer) {
  if (result === "success") {
    console.log("정답!");
    console.log(`축하합니다! ${answer}번 만에 숫자를 맞추셨습니다.`);
    return askRestart();
  }
  if (result === "fail")
    console.log(`5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`);
  return askRestart();
}

async function play() {
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
  const newGame = new Init();
  const newGuess = new InitGuess();
  const { getCnt, addCnt, answer } = newGame;
  const {showInput} = newGuess;
  
  while (getCnt() <= 5) {
    const inputValue = await readLineAsync("숫자 입력: ");
    if (+inputValue === answer) {
      printResult("success", getCnt());
      break;
    }
    if (getCnt() < 5) {
      showInput(inputValue);
      printUpDown(inputValue, answer);
    }
    addCnt();
  }
  if (getCnt() > 5) printResult("fail");
}

play();
