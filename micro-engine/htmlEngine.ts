export async function getHtmlDoc(path: string) {
  try {
    const file = await fetch(path);
    const html = await file.text();
    return html
  } catch (error) {
    console.error(error);
  }
}