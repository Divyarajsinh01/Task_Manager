const calculateTip = (total, tipPersent = 0.25) => total + (total * tipPersent)

const fahranhitToCelcuis = (temp) => {
    return (temp - 32) / 1.8
}

const celcuisToFahranhit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(a < 0 || b < 0){
                return reject('number must be positive')
            }
          resolve(a + b)
        },2000)
    })
}

module.exports = {
    calculateTip,
    fahranhitToCelcuis,
    celcuisToFahranhit,
    add
}