/* Global Variables */


const apiKey = "45020210bbd6bb4e6353d10d9636b814"


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear()


//event on submit

const generate = document.getElementById("generate")


//fetch data function
function updateUserInterface(obj) {
    //catching element
    const date = document.getElementById("date")
    const temp = document.getElementById("temp")
    const feelingOut = document.getElementById("feelingOut")
    const weather = document.getElementById("content")
    const windSpeed = document.getElementById("wind")


    date.innerHTML = "Date : " + obj.date
    temp.innerHTML = "Temperture : " + obj.temp
    weather.innerHTML = "Weather :  " + obj.weather
    feelingOut.innerHTML = "Feeling : " + obj.feeling
    windSpeed.innerHTML = "Wind Speed : " + obj.windSpeed


    //updating data


}

const getData = async () => {
    try {
        const zip = document.getElementById("zip").value
        const feeling = document.getElementById("feelings").value
        apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`

        if (!zip || !feeling) {
            alert("please fill all fileds")
        }
        else {
            const res = await fetch(apiURL)


            const data = await res.json()
            if (res.status != 200) {
                alert(`There is no data for ZIP:  ' ${zip} ' ! \n Enter a valid code !!`)
            } else {


                let temp = data.main.temp
                let place = data.sys.country
                let weather = ` ${data.weather[0].main} , ${data.weather[0].description} `
                let windSpeed = data.wind.speed

                // console.log(temp)
                // console.log(place)
                // console.log(weather)
                // console.log(windSpeed)
                // console.log(feeling)

                await fetch('/getWeather', {

                    method: "post",
                    headers: {
                        "Content-Type": "application/json"

                    },
                    body: JSON.stringify({

                        date: newDate,
                        temp: temp,
                        feeling: feeling,

                        place: place,
                        weather: weather,
                        windSpeed: windSpeed
                    })
                })

                const response = await fetch("/getWeather")
                const final = await response.json()
                console.log(final)




                updateUserInterface(final)
            }
        }



    } catch (err) {
        console.log("there is a problem::" + err)
    }




}

generate.addEventListener('click', getData)




