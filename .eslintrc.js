module.exports = {
  extends: ['blitz'],
  rules: {
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
}
