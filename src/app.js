/* global AudioContext, navigator */


const ctx = window.c

navigator.getUserMedia(
    { audio: true },
    stream => {

        // creates the audio context
        context = new AudioContext()

        const mediaStream = context.createMediaStreamSource( stream )
        // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor

        // const processor = context.createScriptProcessor( 2048, 1, 1 )
        const analyser = context.createAnalyser()
        analyser.smoothingTimeConstant = 1
        analyser.fftSize = 256
        analyser.minDecibels = -90
        analyser.maxDecibels = -10

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        let max = 0

        const loop = () => {

            analyser.getByteTimeDomainData(dataArray)


            ctx.clearRect(0,0,9999,9999)

            ctx.beginPath()
            ctx.moveTo(400,400)
            for (let i = bufferLength; i--;)
                ctx.lineTo( 400*i/bufferLength, dataArray[i] * 400 / 128 )

            ctx.strokeStyle='#333'
            ctx.stroke()



            max = max*0.99
            for (let i = bufferLength; i--;)
                max = Math.max( max, Math.abs(128-dataArray[i]) * 20 )

            ctx.beginPath()
            ctx.rect( 20, 0, 10, max)
            ctx.fill()

            requestAnimationFrame( loop )
        }



        // we connect the recorder with the input stream
        mediaStream.connect(analyser)



        loop()
    },
    err => console.log( err )
)