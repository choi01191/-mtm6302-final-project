// API key
// dCjJSQ5676lQRwbe1DXfgZsNaq9Ul3Fej5j9dbgi

/**
 *
√ The current date and time is displayed,accurately updates every second

√ The current NASA APOD is asynchronously retrieved and displayed

√ A greeting (relevant to the time of day) is displayed

√ Visibility can be toggled on a "more data" section

√ Visibility can be toggled on a settings section	

√ At least two application features can be customized

√ The settings are stored in and retrieved from Local Storage

√ The UI is responsive and well designed
 * 
 */

const localStorageKey = "myShit";

const storeToLocalStorage = (obj) => {
    window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(obj)
    );
};

const getFromLocalStorage = () => {
    const item = window.localStorage.getItem(localStorageKey);
    return JSON.parse(item);
};

const currentTime = new Date();
const currentDay = currentTime.toISOString().slice(0, 10);
const apodEndpoint = `https://api.nasa.gov/planetary/apod?api_key=dCjJSQ5676lQRwbe1DXfgZsNaq9Ul3Fej5j9dbgi&date=${currentDay}`;

const $body = document.querySelector("body");
const $displayclock = document.getElementById(
    "display-clock"
);

// 프로미스 먼저 명령 하고 다른 코드 실행후, Promise resolve 되면 then function 실행됨
fetch(apodEndpoint)
    .then(function (apiResponse) {
        // Promise chaining
        return apiResponse.json();
    })
    .then(function (apiData) {
        console.log(apiData);
        if (
            apiData.media_type === "video" ||
            apiData.code === 404
        ) {
            $body.style.background = `url('./images/camping.jpeg')`;
        } else {
            $body.style.background = `url('${apiData.url}')`;
        }
    });

const properties = getFromLocalStorage();
let isTime24Hours =
    //null obj 
    properties !== null
        ? properties.show24
        : false;
let isSecondsVisible =
    properties !== null
        ? properties.showSeconds
        : false;
const updateTimeIntervalMs = 1000;

if (isTime24Hours) {
    document.getElementById("24hours-yes").checked = true;
} else {
    document.getElementById("24hours-no").checked = true;
}

if (isSecondsVisible) {
    document.getElementById("show-sec-yes").checked = true;
} else {
    document.getElementById("show-sec-no").checked = true;
}



const displayTime = (hour, min, second) => {
    if (typeof second !== "undefined") {
        $displayclock.innerHTML = `<h1 id='clock'>${hour}:${min}:${second}</h1>`;
    } else {
        $displayclock.innerHTML = `<h1 id='clock'>${hour}:${min}</h1>`;
    }
};

const updateTime = () => {
    const currentTime = new Date();
    let hour = currentTime.getHours();
    const min = currentTime.getMinutes();
    const second = isSecondsVisible
        ? currentTime.getSeconds()
        : undefined;
    const $greeting = document.getElementById("greeting");
    const offset = isTime24Hours ? 0 : 12;

    if (hour >= 18) {
        hour -= offset;
        displayTime(hour, min, second);
        $greeting.textContent = "Good Night!";
    } else if (hour >= 12 && hour < 18) {
        hour -= offset;
        displayTime(hour, min, second);
        $greeting.textContent = "Good Afternoon!";
    } else {
        displayTime(hour, min, second);
        $greeting.textContent = "Good Morning!";
    }
};

let interval = setInterval(
    updateTime,
    updateTimeIntervalMs
);

const $position = document.getElementById("menu-container");

const $settingMenu = document.querySelector(".fas");
const $more = document.getElementById("more");
const $detailBox = document.getElementById("detail-box");
const $menuContainer = document.getElementById(
    "menu-container"
);

const toggleVisiblity = ($elem) => {
    const isVisible = $elem.style.display === "flex";
    if (isVisible) {
        $elem.style.display = "none";
    } else {
        $elem.style.display = "flex";
    }
};

const toggleVisibilityAndModifyLabel = (
    $elem,
    $labelElem,
    visibleLabel,
    hiddenLabel
) => {
    const isVisible = $elem.style.display === "flex";
    toggleVisiblity($elem);

    if (isVisible) {
        $labelElem.value = visibleLabel;
    } else {
        $labelElem.value = hiddenLabel;
    }
};

$settingMenu.onclick = () =>
    toggleVisiblity($menuContainer);
$more.onclick = () =>
    toggleVisibilityAndModifyLabel(
        $detailBox,
        $more,
        "More",
        "Less"
    );

const monthMapping = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
};

const currentYear = currentTime.getFullYear();
document.getElementById("year").textContent = currentYear;
const currentMonth = currentTime.getUTCMonth();
document.getElementById("month").textContent =
    monthMapping[currentMonth];
const currentDate = currentTime.getDate();
document.getElementById("date").textContent = currentDate;

/**
 * The settings are stored in and retrieved from Local Storage.
 *
 *
 * 1. when save button clicked, retrieve value for radio buttons DONE
 * 2. set values to local storage for correct properties
 * 3. app state should reflect new local storage state
 *    - within button onclick cb, reinvoke functions (will require cleanup)
 * 4. on init load, retrieve properties from local storage
 */

const $saveBtn = document.getElementById("save");
$saveBtn.addEventListener("click", () => {
    const show24 = document.getElementById("24hours-yes")
        .checked;
    const showSeconds = document.getElementById(
        "show-sec-yes"
    ).checked;

    const properties = {
        show24,
        showSeconds,
    };

    storeToLocalStorage(properties);

    isTime24Hours = show24;
    isSecondsVisible = showSeconds;

    clearInterval(interval);

    interval = setInterval(updateTime, updateTimeIntervalMs);
});
