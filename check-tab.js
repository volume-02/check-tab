import { post } from './utils.js';

let queryOptions = { active: true, lastFocusedWindow: true };

console.log(chrome.tabs);

const getTabUrl = (method) => {
    return chrome.tabs.query(queryOptions).then((res) => {
        const [tab] = res;

        const data = {
            method,
            url: tab.url,
            time: new Date().getTime(),
        };
        return data;
    });
};

chrome.tabs.onActivated.addListener(() => {
    getTabUrl('onActivated').then((res) => {
        if (res.url !== '') {
            post(res);
        }
    });
});

chrome.tabs.onUpdated.addListener(() => {
    getTabUrl('onUpdated').then((res) => {
            post(res);
    });
});

chrome.windows.onFocusChanged.addListener((window) => {
    if (window == chrome.windows.WINDOW_ID_NONE) {
        // inFocus = false;
    } else {
        // inFocus = true;
        getTabUrl('onFocusChanged').then((res) => {
            if (res.url !== '') {
                post(res)
            }
        });
    }
});
