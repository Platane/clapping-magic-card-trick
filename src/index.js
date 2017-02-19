/* eslint no-undef: "off" */

// nice green background
b.style.backgroundColor='#082'

// this element display useful information for the magician
// it should be "hidden", small enougth to not draw attention of the public
b.appendChild(label = d.createElement('a'))
label.setAttribute('style','position:absolute;left:0')

// instanciate the cards
// notice that the cards are attached to a random object ( the body here ) to save an array instanciation
for (i=N_CARD;i--;) {

    b.appendChild( b[i] = d.createElement('a') )

    // the text is the number and the color, as unicode
    b[i].innerHTML = (N_CARD/4-(i>>2))+' '+('\u2660\u2666\u2663\u2665'[i%4])

    b[i].setAttribute('style',

        // position the element origin
        'position:absolute;'
        +'left:45%;'
        +'top:55%;'

        // prepare transform animation
        +'transform-origin:50% 329px;'
        +'transition:transform 329ms '+(i * 45)+'ms;'

        // position the cards in "eventail" mode
        +'transform:rotate('+((N_CARD/2-i)*9)+'deg);'

        // styling
        +'padding:10;'
        +'background:#fff;'
        +'box-shadow:0 0 1px #000;'
        +'border-radius:9px;'
        +'width:99;'
        +'height:160;'
        +'color:'+( i%2 && 'red' )
    )
}



// // init some values


phase = -1

// the time at which the gain should be considered null
cooldown =

x =

// time since the keypress, in cycle
t =

// time at the first clap
startDate =

// in train mode, position the card to hint the magician
trainingMode = 0

l=PHASE_DURATION

navigator.getUserMedia(
    { audio: 1 },
    stream => {

        // pipe the microphone input to a script node

        audioContext = new AudioContext()

        scriptNode = audioContext.createScriptProcessor(SCRIPTNODE_BUFFER_SIZE, 1, 1)

        audioContext.createMediaStreamSource( stream ).connect( scriptNode )


        scriptNode.onaudioprocess = audioProcessingEvent => {

            if ( t++ < 9 )
                return

            inputData = audioProcessingEvent.inputBuffer.getChannelData(0)

            for ( i=SCRIPTNODE_BUFFER_SIZE; i--; )
                if( inputData[i] > MIC_THREESHOLD )
                    cooldown = t + 9

            label.innerHTML=cooldown > t ? '=' : '_'

            _phase = phase

            if( !startDate ){
                if ( cooldown > t ) {
                    startDate = t
                    phase = 0
                }
            } else {

                // display the current state
                for(i=0; i< phase;i++)
                    label.innerHTML+=x&(1<<i) ? 'o' : '-'

                // display the time remaining before the next tic
                for(i=0; i< l-((t-startDate)%l)-3; i++)
                    label.innerHTML+='.'

                // tic
                if ( (t-startDate) == (phase+1)*l ) {
                    if ( phase == N_CARD_LN-1 )
                        b[x].style.transform = 'scale(1.5)'

                    x += ( 1<<phase ) * ( cooldown > t )

                    // increment the phase
                    // reset the cooldown ( prevent to write cooldown = 0, to save a char )
                    cooldown = phase ++
                }
            }

            // in trainingMode only,
            // position the card to show which ones will be selected at the next tic
            if ( _phase != phase && trainingMode )
                for(i=N_CARD;i--;)
                    b[i].style.transform = (x & ((1<<phase)-1)) != (i & ((1<<phase)-1))
                        ? 'translate(0,159px)'
                        : 'translate('+((N_CARD/2-i)*30)+'px,'+( (1<<phase) & i ? -199 : 0 )+'px)'
        }


        b.onclick = e => {

            // set the training mode flag
            // also double the phase duration
            if(e.target != b)
                trainingMode = l = l*2

            // position the cards in "deck" mode
            for(i=N_CARD;i--;)
                b[i].style.transform = 'translate(0,159px)'

            // before the script node is connected to a desitination, it is un-active
            // active it
            scriptNode.connect( audioContext.destination )
        }
    },
    ()=>0
)