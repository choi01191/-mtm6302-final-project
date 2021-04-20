
//API key

//dCjJSQ5676lQRwbe1DXfgZsNaq9Ul3Fej5j9dbgi
/**
 *
√The current date and time is displayed,accurately updates every second

√The current NASA APOD is asynchronously retrieved and displayed

√A greeting (relevant to the time of day) is displayed

Visibility can be toggled on a "more data" section

Visibility can be toggled on a settings section	

At least two application features can be customized

The settings are stored in and retrieved from Local Storage

√The UI is responsive and well designed
 * 
 */

// then is callback function 이거 설명!!!!!!!!!!!!!!!!!!!!!!!!!

const $body = document.querySelector('body')
const $displayclock = document.getElementById('display-clock')
// 숙제에서는 date() current date 만약 오늘게 사진이아면 다른거 페이스홀더 쓰거나 해라
let currentDay = new Date()
currentDay = currentDay.toISOString().slice(0, 10)
console.log(currentDay);
fetch(`https://api.nasa.gov/planetary/apod?api_key=dCjJSQ5676lQRwbe1DXfgZsNaq9Ul3Fej5j9dbgi&date=${currentDay}`)
    .then(function (apiResponse) {
        return apiResponse.json()
    })
    .then(function (apiData) {
        // ㅇㅣ거 안됨
        console.log(apiData);
        if (apiData.media_type === 'video') {
            $body.style.background = `url('/images/camping.jpeg')`
        }
        else { $body.style.background = `url('${apiData.url}')` }

    }
    )
//The current date and time is displayed,accurately updates every second

//currentTime.toLocaleTimeString().split(' ') pm/am function

const createCurrentDisplayTime = () => {
    setInterval(function () {
        let currentTime = new Date()
        let hour = currentTime.getHours()
        let min = currentTime.getMinutes()
        let second = currentTime.getSeconds()
        let $greeting = document.getElementById('greeting')

        const displayTime = (hour, min, second) => { $displayclock.innerHTML = `<h1 id='clock'>${hour}:${min}</h1>` }
        // currentTime = currentTime.toLocaleTimeString().split(' ')[0]

        if (hour >= 18) {
            hour -= 12
            displayTime(hour, min)
            $greeting.textContent = "Good Night!"
        }
        else if (hour >= 12 && hour < 18) {
            hour -= 12
            displayTime(hour, min)
            $greeting.textContent = "Good Afternoon!"
        }

        else {

            displayTime(hour, min)
            $greeting.textContent = "Good Morning!"

        }

    }, 1000)
}
createCurrentDisplayTime()




