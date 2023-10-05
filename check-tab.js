import { post } from "./utils.js";

let queryOptions = { active: true, lastFocusedWindow: true };


chrome.tabs.onActivated.addListener(() => {
    chrome.tabs.query(queryOptions).then((res) => {
        const [tab] = res;

        const data = {
            url: tab.url,
            time: new Date().getTime()
        };

         post(data)
    });
    
})
