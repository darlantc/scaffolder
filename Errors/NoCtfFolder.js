const chalk = require('chalk');

const error = chalk.bold.red;
const path = chalk.blue.underline.bold;

class NoCtfFolder extends Error {
  constructor() {
    super();
  }

  getDisplayErrorMessage() {
    const githubLink = 'https://github.com/galElmalah/ctf';
    const message = `${error(
      'Error there is no ctf folder.'
    )}\nPlease create a ctf folder.\nFor more info checkout: ${path(
      githubLink
    )}`;

    return message;
  }

  get name() {
    return 'NoCtfFolder';
  }
}

module.exports = NoCtfFolder;