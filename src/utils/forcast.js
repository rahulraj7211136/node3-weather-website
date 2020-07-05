const request=require('request')
const forcast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=818c1144b8c4c8952bb5c21bb76eaf27'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily[0].weather[0].description+' the temp of outside is '+body.current.temp+'.The high and low temp are '+ body.daily[0].temp.max +' and '+ body.daily[0].temp.min +' respectively and the humidity is '+body.current.humidity+' %')
        }
    })
}
module.exports=forcast