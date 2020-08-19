import puppeteer from 'puppeteer-core';
import { Bar, Presets } from 'cli-progress';
import { argv } from 'yargs';
import { join } from 'path';
import spintax from 'mel-spintax';
import qrcode from 'qrcode-terminal';

import './welcome';
import Logger from './logger';
import { externalInjection, getFileInBase64, delay } from './utils';
import * as constants from './constants';

export default class App {
  static newInstance() {
    return new App();
  }

  async start() {
    await this.downloadAndStartThings();

    await this.checkLogin();
  }

  async downloadAndStartThings() {
    try {
      const botjson = externalInjection('bot.json');
      const messages = await externalInjection('messages', 'main.json');

      const appconfig = JSON.parse(await externalInjection('bot.json'));

      Logger.start('Downloading chrome\n');
      const browserFetcher = puppeteer.createBrowserFetcher({
        path: process.cwd(),
      });

      const progressBar = new Bar({}, Presets.shades_grey);

      progressBar.start(100, 0);

      const revisionInfo = await browserFetcher.download(
        '666595',
        (download, total) => {
          progressBar.update((download * 100) / total);
        }
      );

      progressBar.update(100);
      Logger.stop('Downloading chrome ... done!');
      Logger.start('Launching Chrome');

      const pptrArgv = [];
      if (argv.proxyURI) {
        pptrArgv.push('--proxy-server=' + argv.proxyURI);
      }
      const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath,
        headless: appconfig.appconfig.headless,
        userDataDir: join(process.cwd(), 'ChromeSession'),
        devtools: false,
        args: [...constants.DEFAULT_CHROMIUM_ARGS, ...pptrArgv],
        userDataDir: constants.DEFAULT_DATA_DIR,
      });

      Logger.stop('Launching Chrome ... done!');
      if (argv.proxyURI) {
        Logger.info('Using a Proxy Server');
      }

      Logger.start('Opening Whatsapp');
      this.page = await browser.pages();

      if (this.page.length > 0) {
        this.page = this.page[0];
        this.page.setBypassCSP(true);

        if (argv.proxyURI) {
          await this.page.authenticate({
            username: argv.username,
            password: argv.password,
          });
        }

        this.page.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
        );

        await this.page.goto('https://web.whatsapp.com', {
          waitUntil: 'networkidle0',
          timeout: 0,
        });

        botjson
          .then(response => this.page.evaluate(`const intents = ${response}`))
          .catch(error => Logger.error(`there was an error \n ${error}`));

        this.page.evaluate(`const messages = ${messages};`);

        Logger.stop('Opening Whatsapp ... done!');
        this.page.exposeFunction('log', message => console.log(message));

        this.page.exposeFunction('getFile', getFileInBase64);
        this.page.exposeFunction('resolveSpintax', spintax.unspin);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async injectScripts(page) {
    return await this.page
      .waitForSelector('[data-icon=laptop]')
      .then(async () => {
        let filepath = join(__dirname, 'WAPI.js');
        await page.addScriptTag({ path: require.resolve(filepath) });
        filepath = join(__dirname, 'inject.js');
        await page.addScriptTag({ path: require.resolve(filepath) });
        return true;
      })
      .catch(() => {
        console.log('User is not logged in. Waited 30 seconds.');
        return false;
      });
  }

  async checkLogin() {
    Logger.start('Page is loading');

    await delay(10000);

    const isLogged = await this.page.evaluate("localStorage['last-wid']");

    if (isLogged) {
      Logger.stop('Looks like you are already logged in');
      await this.injectScripts(this.page);
    } else {
      Logger.info('You are not logged in. Please scan the QR below');
      await this.getAndShowQR();
    }

    return Promise.resolve();
  }

  async getAndShowQR() {
    const scanme = "img[alt='Scan me!'], canvas";
    await this.page.waitForSelector(scanme);

    const imageData = await this.page.evaluate(
      `document.querySelector("${scanme}").parentElement.getAttribute("data-ref")`
    );

    qrcode.generate(imageData, { small: true });
    Logger.start(
      'Waiting for scan \nKeep in mind that it will expire after few seconds'
    );

    const isLoggedIn = await this.injectScripts(page);
    while (!isLoggedIn) {
      await delay(300);
      isLoggedIn = await this.injectScripts(page);
    }

    if (isLoggedIn) {
      Logger.stop('Looks like you are logged in now');
    }
  }
}
