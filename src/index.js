/* eslint no-undef: "off" */

const createCard = ( value, icon, color ) => {
    const el = d.createElement('div')
    el.innerHTML = value+' '+icon

    el.setAttribute('style','transform-origin:50% 360px;transition:transform 600ms;padding:10px;background:#fff;position:absolute;top:50%;left:calc(50% - 50px);box-shadow:0 0 5px 0 #333;border-radius:10px;width:100px;height:140px;color:'+color)

    return el
}

b.style.backgroundColor='#077915'
cards = []
for (i=8;i--;) {
    b.appendChild(
        cards[i] = createCard( 1+(i>>2), ['&#9824;','&#9830;','&#9827;','&#9829;'][i%4], i%2 ? 'red' : '#000' )
    )
    cards[i].style.transform = 'translate3d('+((i-4)*0)+'px,0,0) rotate('+((i-3)*-10)+'deg)'
    cards[i].style.transitionDelay = (i * 100)+'ms'
}


phase = -1
t = 0
x = 0
startDate = 0
trainingMode = 0
cooldown = 0

const THREESHOLD = 0.05

navigator.getUserMedia(
    { audio: true },
    stream => {

        audioContext = new AudioContext()

        scriptNode = audioContext.createScriptProcessor(1024, 1, 1)

        audioContext.createMediaStreamSource( stream ).connect( scriptNode )

        scriptNode.onaudioprocess = audioProcessingEvent => {

            t++

            inputData = audioProcessingEvent.inputBuffer.getChannelData(0)

            audioProcessingEvent.inputBuffer.length

            for ( let i=1024; i--; )
                if( inputData[i] > THREESHOLD )
                    cooldown = t + 26

            c.clearRect(0,0,999,999)

            if ( trainingMode ){

                {
                    max = 0
                    for ( i=1024; i--; )
                        max = Math.max( max, inputData[i] )

                    c.beginPath()
                    c.rect(9,200,300,90)
                    c.stroke()

                    c.beginPath()
                    c.rect(9,200, max/THREESHOLD*300,90)
                    c.fill()
                }

                if ( cooldown > t ){
                    c.beginPath()
                    c.rect(99,399,50,50)
                    c.fill()
                }

                for ( i = 3; i--;  ){
                    c.beginPath()
                    c.rect(8+(i+1)*100,30,4, 10 + 20 * (i< phase)  )
                    x&(1<<i) ? c.fill() : c.stroke()
                }

                if ( startDate ) {
                    c.beginPath()
                    c.rect(9,9,400,9)
                    c.stroke()
                    c.beginPath()
                    c.rect(9,9,(t-startDate),9)
                    c.fill()
                }
            }



            _phase = phase

            if ( !startDate ){
                if ( cooldown > t ) {
                    startDate = t
                    phase = 0
                }
            } else {

                if ( (t-startDate) == (phase+1)*100 ) {
                    if ( phase == 3 )
                        return cards[x].style.transform = 'scale(2)'

                    x += ( 1<<phase ) * ( cooldown > t )
                    phase ++
                }
            }

            if ( _phase != phase && trainingMode )
                for(i=8;i--;)
                    cards[i].style.transform = (x & ((1<<(phase))-1)) != (i & ((1<<(phase))-1))
                        ? 'scale(0.5) translate3d(0,200px,0)'
                        : ( (1<<(phase)) & i )
                            ?   'translate3d('+(-i*30)+'px,-100px,0)'
                            :   'translate3d('+(-i*30)+'px,100px,0)'


        }


        b.onkeyup = e => {
            trainingMode=e.which == 84
            for(i=8;i--;)
                cards[i].style.transform = 'translate3d(0,200px,0)'

            scriptNode.connect( audioContext.destination )
        }
    },
    ()=>0
)