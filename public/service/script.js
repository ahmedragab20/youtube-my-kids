import mainjsx from './index';
console.log(mainjsx());
async function app({ color, htmlFilePath }) {
  console.log(color, htmlFilePath);
  const getHtml = async () => {
    return await fetch('/index.jsx')
      .then((file) => file.text())
      .then((htmlContent) => {
        const doc = new Document();
      });
  };

  const h = await getHtml();

  const headline = document.querySelector('#micro-app-1 h1');

  if (headline) {
    headline.style.color = 'blue';
    headline.style.fontWeight = 'bold';
    headline.style.fontSize = '20px';
  }
}

export default app;
