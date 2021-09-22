export const colorPalette = {
  text: {
    0: '#000000',
    1: '#373737',
    2: '#646464',
    3: '#979797',
    4: '#CACACA',
    5: '#F2F2F2',
    6: '#F6F6F6'
  },
  primary: {
    0: '#004B71',
    1: '#6200EE',
    2: '#0474ADDD',
    3: '#0474ADAA',
    4: '#0474AD77',
    5: '#0474AD33',
    6: '#0474A00'
  },
  info: {
    0: '#0097B9',
    1: '#05C7F2',
    2: '#05C7F2DD',
    3: '#05C7F2AA',
    4: '#05C7F277',
    5: '#05C7F233',
    6: '#05C7F200'
  },
  success: {
    0: '#3E9072',
    1: '#00BF78',
    2: '#00BF78DD',
    3: '#00BF78AA',
    4: '#00BF7877',
    5: '#00BF7833',
    6: '#00BF7800'
  },
  warning: {
    0: '#CB9557',
    1: '#FFBC6E',
    2: '#FFBC6EDD',
    3: '#FFBC6EAA',
    4: '#FFBC6E77',
    5: '#FFBC6E33',
    6: '#FFBC6E00'
  },
  error: {
    0: '#B13D3D',
    1: '#BD2B46',
    2: '#E95050DD',
    3: '#E95050AA',
    4: '#E9505077',
    5: '#E9505033',
    6: '#E9505000'
  },
}

export const palette = {
  text: {
    primary: colorPalette.text[1],
    secondary: colorPalette.text[2]
  },
  primary: {
    main: colorPalette.primary[1],
    dark: colorPalette.primary[0],
  },
  secondary: {
    main: colorPalette.error[1],
    dark: colorPalette.error[0]
  },
  error: {
    main: colorPalette.error[1],
    dark: colorPalette.error[0]
  },
  action: {
    disabledBackground: '#DCDCDC'
  }
}
