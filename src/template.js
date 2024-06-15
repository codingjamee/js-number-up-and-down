export function createHtmlTemplate(name) {
  return `
    <link rel="stylesheet" href="./index.css">
    <div class="container">
      <h1 class="hello">Hello, ${name}!</h1>
      <p>Welcome to the dynamically generated HTML page.</p>
    </div>
    
  `;
}
