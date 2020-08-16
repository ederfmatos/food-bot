import ora from 'ora';

class Logger {
  start(text) {
    this.logger = ora({
      spinner: 'dots2',
      text: text,
    }).start();
  }

  update(text) {
    this.logger.text = text;
  }

  info(text) {
    this.logger.info(text);
  }

  error(text) {
    this.logger.fail(text);
  }

  stop(text) {
    this.logger.succeed(text);
  }
}

export default new Logger();
