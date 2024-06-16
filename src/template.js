
export function createHtmlTemplate() {
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
    <script src="./app.js"></script>
    <article class="container">
      <h1>🔢 숫자 업 & 다운 Game</h1>
      <h3>게임설정</h3>
      <em>숫자 범위</em>
      <input id="input">
    </article>

  `;
}
