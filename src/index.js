/* eslint no-undef: "off" */

b.style.backgroundColor='#077915'
cards = []
for (i=8;i--;) {

    b.appendChild( cards[i] = d.createElement('div') )
    cards[i].innerHTML = (1+(i>>2))+' '+('♠️♦️♣️♥️'[(i%4)*2])
    cards[i].setAttribute('style',
        'transform:rotate('+((3-i)*9)+'deg);'
        +'transform-origin:50% 359px;'
        +'transition:transform 600ms '+(i * 99)+'ms;'
        +'padding:10;'
        +'background:#fff;'
        +'position:absolute;'
        +'top:60%;'
        +'left:50%;'
        +'box-shadow:0 0 2px #000;'
        +'border-radius:9px;'
        +'width:60;'
        +'height:99;'
        +'color:'+( i%2 && 'red' )
    )
}


phase = -1
t = 0
x = 0
startDate = 0
trainingMode = 0
cooldown = 0

navigator.getUserMedia(
    { audio: 1 },
    stream => {

        audioContext = new AudioContext()

        scriptNode = audioContext.createScriptProcessor(SCRIPTNODE_BUFFER_SIZE, 1, 1)

        audioContext.createMediaStreamSource( stream ).connect( scriptNode )

        scriptNode.onaudioprocess = audioProcessingEvent => {

            t++

            inputData = audioProcessingEvent.inputBuffer.getChannelData(0)

            for ( i=SCRIPTNODE_BUFFER_SIZE; i--; )
                if( inputData[i] > MIC_THREESHOLD )
                    cooldown = t + 12

            c.clearRect(0,0,999,999)

            if ( trainingMode ){

                {
                    max_gain = 0
                    for ( i=SCRIPTNODE_BUFFER_SIZE; i--; )
                        max_gain = Math.max( max_gain, inputData[i] )

                    c.beginPath()
                    c.rect(9,199,299,90)
                    c.stroke()

                    c.beginPath()
                    c.rect(9,199, max_gain/MIC_THREESHOLD*299,90)
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
                    cards[i].style.transform = (x & ((1<<phase)-1)) != (i & ((1<<phase)-1))
                        ? 'scale(.5)translate(0,199px)'
                        : ( (1<<phase) & i )
                            ?   'translate('+(-i*30)+'px,-99px)'
                            :   'translate('+(-i*30)+'px,99px)'


        }


        b.onkeyup = e => {
            trainingMode=e.which == 84
            for(i=8;i--;)
                cards[i].style.transform = 'translate(0,199px)'

            scriptNode.connect( audioContext.destination )
        }
    },
    ()=>0
)