/* Global Variables */

const apiKey = "45020210bbd6bb4e6353d10d9636b814"


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()


//event on submit

const generate = document.getElementById("generate")


//fetch data function

const getData = async () => {
    const zip = document.getElementById("zip")
    const feeling = document.getElementById("feelings")
    apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`


    const res = await fetch(apiURL)
    console.log(res)


}

generate.addEventListener('click', getData)