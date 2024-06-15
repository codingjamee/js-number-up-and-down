import express from 'express';
import path from 'path';
import { createHtmlTemplate } from './template.js';

const __filename = __filename || path.resolve(__dirname);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  const name = "User";
  const htmlTemplate = createHtmlTemplate(name);
  res.send(htmlTemplate);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});