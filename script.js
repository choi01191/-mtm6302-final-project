
//API key

//dCjJSQ5676lQRwbe1DXfgZsNaq9Ul3Fej5j9dbgi
// then is callback function 이거 설명!!!!!!!!!!!!!!!!!!!!!!!!!

const $body = document.querySelector('body')
// 숙제에서는 date() current date 만약 오늘게 사진이아면 다른거 페이스홀더 쓰거나 해라
let currentTime = new Date()
currentTime = currentTime.toISOString().slice(0, 10)
console.log(currentTime);
fetch(`https://api.nasa.gov/planetary/apod?api_key=dCjJSQ5676lQRwbe1DXfgZsNaq9Ul3Fej5j9dbgi&date=${currentTime}`)
    .then(function (apiResponse) {
        return apiResponse.json()
    })
    .then(function (apiData) {
        console.log(apiData);
        if (apiData.media_type === 'video') {
            $body.style.background = `url('./images/camping.jpeg')`
        }
        else { $body.style.background = `url('${apiData.url}')` }

    }
    )
