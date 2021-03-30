const fetch = require('node-fetch');
import {avgPrice30} from './poll'
import settings from '../settings.json'

// Send discord messages, no fancy formatting, just the content of the message.
export const sendDiscord = (message) => {
    fetch(`${settings.DISCORD}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            content: message
        })
    }).then(data => {
        // console.log(data)
    }).catch(e => {
            // console.log(e)
        })
}

export const sendErrors = (message) => {
    fetch(`${settings.DISCORD_ERRORS}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            content: message
        })
    }).then(data => {
        // console.log(data)
    }).catch(e => {
            // console.log(e)
        })
}

export const getRSI = async() => {
    let upMoves = 0
    let downMoves = 0
    const averagePrice = await avgPrice30(`${settings.MAIN_MARKET}`)
    averagePrice.forEach((element, index) => {
        if(element[1] < element[4]) {
            upMoves+=1
        }
        if (element[1] > element[4]) {
            downMoves+=1
        }
    });
    const avgU = (upMoves/30).toFixed(8)
    const avgD = (downMoves/30).toFixed(8)
    const RS = avgU/avgD
    const RSI = 100 - (100/(1+RS))
    return RSI
}