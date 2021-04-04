export const colors = [
  '#dc0073',
  '#04e762',
  '#fa9a1b',
  '#c026e7',
  '#e14f00',
  '#00d3f2',
  '#9b5de5',
  '#ff9770',
  '#f27059',
  '#8900f2',
  '#bc00dd',
  '#93e1d8',
  '#25ced1',
  '#ffb7ff',
  '#caff8a',
  '#935fa7',
  '#fb4d3d',
  '#d7fc5b',
  '#ca1551',
  '#ff8552',
  '#345995',
];

export const colorGenerator = colorArr => {
  let colorIdx = Math.floor(Math.random() * colorArr.length);
  return colorIdx;
};
