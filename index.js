import Unsplash from 'unsplash-js';
import { toJson } from 'unsplash-js';

// https://github.com/maykar/compact-custom-header/blob/master/compact-custom-header.js#L25
let ll = document.querySelector('home-assistant');
ll = ll && ll.shadowRoot;
ll = ll && ll.querySelector('home-assistant-main');
ll = ll && ll.shadowRoot;
ll = ll && ll.querySelector('app-drawer-layout partial-panel-resolver');
ll = (ll && ll.shadowRoot) || ll;
ll = ll && ll.querySelector('ha-panel-lovelace');
ll = ll && ll.shadowRoot;
ll = ll && ll.querySelector('hui-root');

const screensaverConfig = {
  query: 'nature',
  idle_time: 10,
  ...ll.lovelace.config.screensaver
};

const unsplash = new Unsplash({
  accessKey: screensaverConfig.unsplash_access_key
});

let idleTime = 0;
let screenSaverRunning = false;
let images = [];
let currentImage = 0;

const screenSaverContainer = document.createElement('div');
screenSaverContainer.style.position = 'absolute';
screenSaverContainer.style.top = 0;
screenSaverContainer.style.left = 0;
screenSaverContainer.style.width = '100vw';
screenSaverContainer.style.height = '100vh';
screenSaverContainer.style.background = '#000';

const screenSaverImageOne = document.createElement('div');
screenSaverImageOne.style.position = 'absolute';
screenSaverImageOne.style.top = 0;
screenSaverImageOne.style.left = 0;
screenSaverImageOne.style.width = '100%';
screenSaverImageOne.style.height = '100%';
screenSaverImageOne.style.backgroundSize = 'cover';
screenSaverImageOne.style.opacity = 0;
screenSaverImageOne.style.transition = 'opacity 2s ease-in-out';

const screenSaverImageTwo = screenSaverImageOne.cloneNode(true);

screenSaverContainer.appendChild(screenSaverImageOne);
screenSaverContainer.appendChild(screenSaverImageTwo);

const changeImage = function() {
  if (screenSaverRunning) {
    currentImage++;

    if (currentImage === images.length) {
      currentImage = 0;
    }

    if (currentImage % 2) {
      screenSaverImageOne.style.opacity = 0;
      screenSaverImageTwo.style.backgroundImage = `url(${images[currentImage].urls.regular})`;
      screenSaverImageTwo.style.opacity = 1;
    } else {
      screenSaverImageTwo.style.opacity = 0;
      screenSaverImageOne.style.backgroundImage = `url(${images[currentImage].urls.regular})`;
      screenSaverImageOne.style.opacity = 1;
    }

    setTimeout(changeImage, 30000); // 30000 = 30 sekunder
  }
};

const startScreenSaver = function() {
  screenSaverRunning = true;

  unsplash.search
    .photos(screensaverConfig.query, 1, 21, { orientation: 'landscape' })
    .then(toJson)
    .then(json => {
      images = json.results;

      document.body.appendChild(screenSaverContainer);

      changeImage();
    });
};

const stopScreenSaver = function() {
  currentImage = 0;
  screenSaverRunning = false;
  screenSaverContainer.remove();
};

window.setInterval(() => {
  if (!screenSaverRunning) {
    idleTime++;

    if (idleTime >= screensaverConfig.idle_time) {
      startScreenSaver();
    }
  }
}, 60000); // 60000 = 1 minute

window.addEventListener('click', () => {
  idleTime = 0;

  if (screenSaverRunning) {
    stopScreenSaver();
  }
});

window.addEventListener('touchstart', () => {
  idleTime = 0;

  if (screenSaverRunning) {
    stopScreenSaver();
  }
});
