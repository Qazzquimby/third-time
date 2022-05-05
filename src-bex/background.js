async function setTimers(value) {
  console.log('setting timers to', value);
  await chrome.storage.local.set(value);
}

// Can't import lodash here
const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

async function getTimers() {
  let timers = await chrome.storage.local.get([
    'currentSessionDurationMinutes',
    'storedRestMinutes',
    'totalWorkMinutes',
  ]);
  if (isEmpty(timers)) {
    console.log('Timers are empty, setting to 0.');
    timers = {
      currentSessionDurationMinutes: 0,
      storedRestMinutes: 0,
      totalWorkMinutes: 0,
    };
  }
  return timers;
}

const WORKING = {
  name: 'working',
  onTick: async () => {
    const timers = await getTimers();
    timers.currentSessionDurationMinutes += 1;
    timers.storedRestMinutes += 1 / 3;
    timers.totalWorkMinutes += 1;
    await setTimers(timers);
  },
};
const RESTING = {
  name: 'resting',
  onTick: async () => {
    const timers = await getTimers();
    timers.storedRestMinutes -= 1;
    await setTimers(timers);
  },
};
const STOPPED = {
  name: 'stopped',
  onTick: async () => {
    const timers = await getTimers();
    timers.storedRestMinutes = Math.max(0, timers.storedRestMinutes - 1);
    await setTimers(timers);
  },
};

let currentAction = WORKING;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener((/* tab */) => {
    // Opens our extension in a new browser window.
    // Only if a popup isn't defined in the manifest.
    chrome.tabs.create(
      {
        url: chrome.runtime.getURL('www/index.html'),
      },
      (/* newTab */) => {
        // Tab opened.
      }
    );
  });
});

export default async function (bridge /* , allActiveConnections */) {
  bridge.on('storage.get', (event) => {
    const payload = event.data;
    if (payload.key === null) {
      chrome.storage.local.get(null, (r) => {
        const result = [];

        // Group the items up into an array to take advantage of the bridge's chunk splitting.
        for (const itemKey in r) {
          result.push(r[itemKey]);
        }
        bridge.send(event.eventResponseKey, result);
      });
    } else {
      chrome.storage.local.get([payload.key], (r) => {
        bridge.send(event.eventResponseKey, r[payload.key]);
      });
    }
  });

  bridge.on('storage.set', (event) => {
    const payload = event.data;
    chrome.storage.local.set({ [payload.key]: payload.data }, () => {
      bridge.send(event.eventResponseKey, payload.data);
    });
  });

  bridge.on('storage.remove', (event) => {
    const payload = event.data;
    chrome.storage.local.remove(payload.key, () => {
      bridge.send(event.eventResponseKey, payload.data);
    });
  });

  bridge.on('TIMER_START', () => {
    set({ currentSessionDurationMinutes: 0 });
    currentAction.value = WORKING;
  });
  bridge.on('TIMER_PAUSE', () => {
    currentAction.value = RESTING;
  });
  bridge.on('TIMER_STOP', () => {
    currentAction.value = STOPPED;
  });

  chrome.alarms.create({ periodInMinutes: 0.1 });
  chrome.alarms.onAlarm.addListener(() => {
    (async function () {
      await currentAction.onTick();
      let timers = await getTimers();
      bridge.send('ON_TICK_TIMERS', timers);
    })();
  });

  /*
  // EXAMPLES
  // Listen to a message from the client
  bridge.on('test', d => {
    console.log(d)
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onCreated.addListener(tab => {
    bridge.send('browserTabCreated', { tab })
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      bridge.send('browserTabUpdated', { tab, changeInfo })
    }
  })
   */
}
