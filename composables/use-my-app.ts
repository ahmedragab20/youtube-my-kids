export const useMyApp = () => {
  return shallowReactive({
    version: '1.0.0',
    author: 'Ahmed Ragab',
    name: 'Youtube My Kids',
    description:
      'App that helps the parents to provide a safe environment for their kids to watch youtube videos',
  });
};
