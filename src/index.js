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

function printUpDown(answer, input) {
  if (answer > input) {
    console.log("up");
  }
  if (answer < input) {
    console.log("down");
  }
}

async function restart() {
  const restartOrNot = await readLineAsync(
    "재시작 하시겠습니까?(yes or no) : "
  );
  if (restartOrNot === "yes") {
    play();
  }
}

async function play() {
  const answer = createRandomNumber();
  console.log(answer);
  let cnt = 1;
  while (cnt <= 5) {
    console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
    const inputValue = await readLineAsync("숫자 입력: ");
    if (+inputValue === answer) {
      console.log("정답!");
      console.log(cnt + " 만에 성공");
      break;
    }
    printUpDown(answer, inputValue);
    cnt++;
  }
  restart();
}

play();
