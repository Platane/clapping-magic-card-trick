/* global AudioContext, navigator, a,b,c,d */


const createCard = ( value, icon, color ) => {
    const el = d.createElement('div')
    el.innerHTML = value+' '+icon

    el.setAttribute('style','transition:transform 300ms ease;padding:10px;background:#fff;position:absolute;top:50%;left:50%;box-shadow:0 0 5px 0 #333;border-radius:10px;width:100px;height:140px;color:'+color)

    return el
}

b.setAttribute('style','background:#077915')
const cards = [
    [ '4','c','red' ],
    [ '4','p','black' ],
    [ '4','t','black' ],
    [ '4','cc','red' ],
    [ '5','c','red' ],
    [ '5','c','red' ],
    [ '5','p','black' ],
    [ '5','cc','black' ],
].map(  (x,i) => {

    const card = createCard(...x)
    b.appendChild( card )

    card.style.transform = 'translate3d('+((i-4)*50)+'px,0,0)'

    return card
})

window.addEventListener('click', () => {

    cards.forEach( c => c.style.transform = '' )


})

const ctx = window.c
//
// navigator.getUserMedia(
//     { audio: true },
//     stream => {
//
//         // creates the audio context
//         context = new AudioContext()
//
//         const mediaStream = context.createMediaStreamSource( stream )
//         // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
//
//         // const processor = context.createScriptProcessor( 2048, 1, 1 )
//         const analyser = context.createAnalyser()
//         analyser.smoothingTimeConstant = 1
//         analyser.fftSize = 256
//         analyser.minDecibels = -90
//         analyser.maxDecibels = -10
//
//         const bufferLength = analyser.frequencyBinCount
//         const dataArray = new Uint8Array(bufferLength)
//
//         let max = 0
//
//         const loop = () => {
//
//             analyser.getByteTimeDomainData(dataArray)
//
//
//             ctx.clearRect(0,0,9999,9999)
//
//             ctx.beginPath()
//             ctx.moveTo(400,400)
//             for (let i = bufferLength; i--;)
//                 ctx.lineTo( 400*i/bufferLength, dataArray[i] * 400 / 128 )
//
//             ctx.strokeStyle='#333'
//             ctx.stroke()
//
//
//
//             max = max*0.99
//             for (let i = bufferLength; i--;)
//                 max = Math.max( max, Math.abs(128-dataArray[i]) * 20 )
//
//             ctx.beginPath()
//             ctx.rect( 20, 0, 10, max)
//             ctx.fill()
//
//             requestAnimationFrame( loop )
//         }
//
//
//
//         // we connect the recorder with the input stream
//         mediaStream.connect(analyser)
//
//
//
//         loop()
//     },
//     err => console.log( err )
// )