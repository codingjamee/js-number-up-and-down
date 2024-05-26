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

    //성공하면 break하고 resolve
    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

function createRandomNumber() {
  return Math.floor(Math.random() * 50 + 1);
}
async function play() {
  function printUpDown(input) {
    if (answer > input) {
      console.log("up");
    }
    if (answer < input) {
      console.log("down");
    }
  }
  const answer = createRandomNumber();
  console.log(answer);
  for (let i = 5; i > 0; i--) {
    console.log("컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.");
    const inputValue = await readLineAsync("숫자 입력: ");
    if (+inputValue === answer) {
      console.log("정답!");
      break;
    }
    printUpDown(inputValue);
  }
}

play();

//게임시작
//5회 반복 : 5회 하지만 중간에라도 게임이 끝나야함. ok
//5회가 끝나도 게임끝 ok
//다시 시작하기를 선택하면 재시작
