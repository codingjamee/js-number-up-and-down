import readline from "readline";

function readLineAsync(query) {
  function createRandomNumber() {
    return Math.floor(Math.random() * 50 + 1);
  }
  const answer = createRandomNumber();
  let count = 5;
  console.log(answer);

  function printUpDown(input) {
    if (answer > input) {
      return console.log("up");
    }
    if (answer < input) {
      return console.log("down");
    }
  }

  function subtractCount() {
    count--;
  }

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
      const inputNum = +input;
      if (+inputNum === answer) {
        rl.close();
        return resolve(inputNum);
      }

      printUpDown(inputNum);
      subtractCount();
    });
  });
}

async function play() {
  console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
  const inputValue = await readLineAsync("숫자 입력: ");
  console.log("정답!");
  console.log(inputValue);
}

play();
