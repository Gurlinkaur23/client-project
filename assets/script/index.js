'use strict';

// Utility functions
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
  return parent.querySelector(selector);
}

// Selections
const opSystem = select('.op-system');
const language = select('.language');
const browser = select('.browser');

const width = select('.width');
const height = select('.height');
const layout = select('.layout');

const level = select('.level');
const status = select('.status');

const network = select('.network');

// Main code

// Window
function setWindowDimensions() {
  width.innerText = `Width: ${window.innerWidth}px`;
  height.innerText = `Height: ${window.innerHeight}px`;

  if (window.innerHeight > window.innerWidth) {
    layout.innerText = 'Orientation: Portrait';
  } else {
    layout.innerText = 'Orientation: Landscape';
  }
}

// System

function getOS() {
  const opSystem = navigator.userAgent.toLowerCase();

  if (opSystem.includes('windows')) {
    return 'Windows';
  } else {
    return 'Mac/iOS';
  }
}

function getSystemBrowser() {
  const browser = navigator.userAgent.toLowerCase();

  switch (true) {
    case /edg/.test(browser):
      return 'Edge';
    case /chrome/.test(browser):
      return 'Chrome';
    case /firefox/.test(browser):
      return 'Firefox';
  }
}

function setSystemData() {
  opSystem.innerText = `OS: ${getOS()}`;
  language.innerText = `Language: ${navigator.language}`;
  browser.innerText = `Browser: ${getSystemBrowser()}`;
}

// Battery
function getBatteryStatus() {
  if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
      setBatteryStatus(battery);

      onEvent('chargingchange', battery, () => {
        setBatteryStatus(battery);
      });

      onEvent('levelchange', battery, () => {
        setBatteryStatus(battery);
      });
    });
  } else {
    level.innerText = `Level: not available`;
    status.innerText = `Status: not available`;
  }
}

function setBatteryStatus(battery) {
  level.innerText = `Level: ${Math.trunc(battery.level * 100)}%`;
  status.innerText = `Status: ${
    battery.charging ? 'charging' : 'not charging'
  }`;
}

// Network
function getNetwork() {
  if (navigator.onLine) {
    network.textContent = 'Online';
    network.style.backgroundColor = '';
  } else {
    network.textContent = 'Offline';
    network.style.backgroundColor = '#e6364e';
  }
}

// Events
onEvent('load', window, () => {
  setWindowDimensions();
  setSystemData();
  getBatteryStatus();
  getNetwork();
});

onEvent('resize', window, () => {
  setWindowDimensions();
  setSystemData();
  getBatteryStatus();
  getNetwork();
});

onEvent('online', window, () => {
  getNetwork();
});

onEvent('offline', window, () => {
  getNetwork();
});

console.log(navigator.onLine);
