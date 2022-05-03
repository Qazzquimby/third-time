let timerRunning = false;
let currentSessionDurationMinutes = 0;
let storedRestMinutes = 0;
let totalWorkMinutes = 0;

const WORKING = {
  name: 'working',
  onTick: () => {
    currentSessionDurationMinutes += 1;
    storedRestMinutes += 1 / 3;
    totalWorkMinutes += 1;
  }
};
const RESTING = {
  name: 'resting',
  onTick: () => {
    storedRestMinutes -= 1;
  }
};
const STOPPED = {
  name: 'stopped',
  onTick: () => {
    // decrease to minimum of 0
    storedRestMinutes = Math.max(0, storedRestMinutes - 1);
  }
};

let currentAction = WORKING;

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.cmd === 'TIMER_START') {
//     currentSessionDurationMinutes.value = 0;
//     currentAction.value = WORKING;
//   } else if (request.cmd === 'TIMER_PAUSE') {
//     currentAction.value = RESTING;
//   } else if (request.cmd === 'TIMER_STOP') {
//     currentAction.value = STOPPED;
//   }
// });

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener((/* tab */) => {
    // Opens our extension in a new browser window.
    // Only if a popup isn't defined in the manifest.
    chrome.tabs.create({
      url: chrome.runtime.getURL('www/index.html')
    }, (/* newTab */) => {
      // Tab opened.
    });
  });
});

export default function(bridge /* , allActiveConnections */) {
  bridge.on('storage.get', event => {
    const payload = event.data;
    if (payload.key === null) {
      chrome.storage.local.get(null, r => {
        const result = [];

        // Group the items up into an array to take advantage of the bridge's chunk splitting.
        for (const itemKey in r) {
          result.push(r[itemKey]);
        }
        bridge.send(event.eventResponseKey, result);
      });
    } else {
      chrome.storage.local.get([payload.key], r => {
        bridge.send(event.eventResponseKey, r[payload.key]);
      });
    }
  });

  bridge.on('storage.set', event => {
    const payload = event.data;
    chrome.storage.local.set({ [payload.key]: payload.data }, () => {
      bridge.send(event.eventResponseKey, payload.data);
    });
  });

  bridge.on('storage.remove', event => {
    const payload = event.data;
    chrome.storage.local.remove(payload.key, () => {
      bridge.send(event.eventResponseKey, payload.data);
    });
  });

  bridge.on('TIMER_START', () => {
    currentSessionDurationMinutes.value = 0;
    currentAction.value = WORKING;
  });
  bridge.on('TIMER_PAUSE', () => {
    currentAction.value = RESTING;
  });
  bridge.on('TIMER_STOP', () => {
    currentAction.value = STOPPED;
  });

  if (!timerRunning) {
    timerRunning = true;
    setInterval(() => {
      currentAction.onTick();
      bridge.send('ON_TICK_TIMERS', {
        currentSessionDurationMinutes,
        storedRestMinutes,
        totalWorkMinutes,
      })
    }, 1000*60);
  }


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
