/* Global Variables */


const apiKey = "45020210bbd6bb4e6353d10d9636b814"


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear()


//event on submit

const generate = document.getElementById("generate")


//fetch data function

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
                let weather = `id : ${data.weather[0].id} , main :${data.weather[0].main} ,discription:${data.weather[0].description} `
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
            }
        }



    } catch (err) {
        console.log("there is a problem::" + err)
    }




}

generate.addEventListener('click', getData)