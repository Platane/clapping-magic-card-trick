/* global AudioContext, navigator, a,b,c,d,  gain, context, analyser, phase, t, startDate, x */


const createCard = ( value, icon, color ) => {
    const el = d.createElement('div')
    el.innerHTML = value+' '+icon

    el.setAttribute('style','transform-origin: 50% 360px;transition:transform 300ms ease;padding:10px;background:#fff;position:absolute;top:50%;left:50%;box-shadow:0 0 5px 0 #333;border-radius:10px;width:100px;height:140px;color:'+color)

    return el
}

b.style.backgroundColor='#077915'
const cards = []
for (let i=8;i--;) {
    b.appendChild(
        cards[i] = createCard( 1+(i>>2), ['&#9824;','&#9830;','&#9827;','&#9829;'][i%4], i%2 ? 'red' : 'black' )
    )
    cards[i].style.transform = 'translate3d('+((i-4)*0)+'px,0,0) rotate('+((i-3)*-10)+'deg)'
    cards[i].style.transitionDelay = (i * 100)+'ms'
}


phase = 0
gain = 0
t = 0
x = 0
startDate = 0

const demo = true

navigator.getUserMedia(
    { audio: true },
    stream => {

        // creates the audio context
        context = new AudioContext()

        // const processor = context.createScriptProcessor( 2048, 1, 1 )
        analyser = context.createAnalyser()
        // analyser.smoothingTimeConstant = 1
        // analyser.fftSize = 256
        // analyser.minDecibels = -90
        // analyser.maxDecibels = -10

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        context.createMediaStreamSource( stream ).connect(analyser)




        const loop = () => {

            t ++

            analyser.getByteTimeDomainData(dataArray)


            // ctx.clearRect(0,0,9999,9999)
            //
            // ctx.beginPath()
            // ctx.moveTo(400,400)
            // for (let i = bufferLength; i--;)
            //     ctx.lineTo( 400*i/bufferLength, dataArray[i] * 400 / 128 )
            //
            // ctx.strokeStyle='#333'
            // ctx.stroke()

            c.clearRect(0,0,999,999)



            gain = gain*0.96
            // gain = Math.max( 0, gain - 0.5 )
            for (let i = bufferLength; i--;)
                gain = Math.max(gain, Math.abs(128-dataArray[i])*3.5)

            c.beginPath()
            c.rect(9,99,300,9)
            c.stroke()
            c.beginPath()
            c.rect(9,99,8*gain,9)
            c.fill()

            if ( gain > 50 ){
                c.beginPath()
                c.rect(99,199,50,50)
                c.fill()
            }

            for ( let i = 3; i--;  ){
                c.beginPath()
                c.rect(8+(i+1)*100,30,4, 10 + 20 * (i<phase)  )
                x&(1<<i) ? c.fill() : c.stroke()
            }


            if ( !startDate ){
                if ( gain > 50 ) {
                    startDate = t
                    phase = 0
                }
            } else {

                c.beginPath()
                c.rect(9,9,300,9)
                c.stroke()
                c.beginPath()
                c.rect(9,9,(t-startDate),9)
                c.fill()

                if ( (t-startDate) == (phase+1)*100 ) {
                    x += ( 1<<phase ) * ( gain > 50 )
                    phase ++

                    if ( phase == 3 )
                        return cards[x].style.transform = 'scale(1.5)'
                }
            }

            requestAnimationFrame( loop )
        }


        b.onkeyup = () => cards.forEach( c => c.style.transform = 'translate3d(0,200px,0)' )


        loop()
    },
    () => 0
)