/* global AudioContext, navigator, a,b,c,d,  gain, context, analyser, phase, t, startDate, x, cards, mask, showTimeMode, _phase */


const createCard = ( value, icon, color ) => {
    const el = d.createElement('div')
    el.innerHTML = value+' '+icon

    el.setAttribute('style','transform-origin:50% 360px;transition:transform 400ms;padding:10px;background:#fff;position:absolute;top:50%;left:calc(50% - 50px);box-shadow:0 0 5px 0 #333;border-radius:10px;width:100px;height:140px;color:'+color)

    return el
}

b.style.backgroundColor='#077915'
cards = []
for (let i=8;i--;) {
    b.appendChild(
        cards[i] = createCard( 1+(i>>2), ['&#9824;','&#9830;','&#9827;','&#9829;'][i%4], i%2 ? 'red' : 'black' )
    )
    cards[i].style.transform = 'translate3d('+((i-4)*0)+'px,0,0) rotate('+((i-3)*-10)+'deg)'
    cards[i].style.transitionDelay = (i * 100)+'ms'
}


phase = -1
gain = 0
t = 0
x = 0
startDate = 0
showTimeMode = 0

navigator.getUserMedia(
    { audio: true },
    stream => {

        context = new AudioContext()

        analyser = context.createAnalyser()

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        context.createMediaStreamSource( stream ).connect(analyser)




        const loop = () => {

            t += 0.5

            analyser.getByteTimeDomainData(dataArray)




            gain = gain*0.96
            // gain = Math.max( 0, gain - 0.5 )
            for (let i = bufferLength; i--;)
                gain = Math.max(gain, Math.abs(128-dataArray[i])*3.5)

            c.clearRect(0,0,999,999)

            if ( !showTimeMode ){

                c.beginPath()
                c.rect(9,99,400,9)
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

                if ( startDate ) {
                    c.beginPath()
                    c.rect(9,9,300,9)
                    c.stroke()
                    c.beginPath()
                    c.rect(9,9,(t-startDate),9)
                    c.fill()
                }
            }

            _phase = phase

            if ( !startDate ){
                if ( gain > 50 ) {
                    startDate = t
                    phase = 0
                }
            } else {

                if ( (t-startDate) == (phase+1)*100 ) {
                    if ( phase == 3 )
                        return cards[x].style.transform = 'scale(2)'

                    x += ( 1<<phase ) * ( gain > 50 )
                    phase ++
                }
            }

            if ( _phase != phase && !showTimeMode )
                for(let i=8;i--;)
                    cards[i].style.transform = (x & ((1<<(phase))-1)) != (i & ((1<<(phase))-1))
                        ? 'scale(0.5) translate3d(0,200px,0)'
                        : ( (1<<(phase)) & i )
                            ?   'translate3d('+(-i*30)+'px,-100px,0)'
                            :   'translate3d('+(-i*30)+'px,100px,0)'

            requestAnimationFrame( loop )
        }


        b.onkeyup = () => {
            showTimeMode=true
            for(let i=8;i--;)
                cards[i].style.transform = 'translate3d(0,200px,0)'
        }


        loop()
    },
    () => 0
)