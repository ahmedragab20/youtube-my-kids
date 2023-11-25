import { getHtmlDoc } from '@/micro-engine/htmlEngine';

interface IGeneric {
  [prop: string]: any
}
async function app<T>(target: string, options: T | IGeneric) {
  console.log(options);

  const html = await getHtmlDoc('/service/micro.html');

  const microTarget = document.querySelector(target)

  if (microTarget) {
    console.log(html);
    microTarget.removeAttribute('data-v-inspector')

    microTarget.innerHTML = html!
  }
}

export default app;
