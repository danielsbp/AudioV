let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
function start() {
	 // Get the audio element tag
	let audio = document.querySelector("audio");


	
	let canvasCtx = canvas.getContext('2d');

	// audio.crossOrigin = "anonymous";

	let ctx = new AudioContext();
	let audioSource = ctx.createMediaElementSource(audio);
	let analayzer = ctx.createAnalyser();

	audioSource.connect(analayzer);
	audioSource.connect(ctx.destination);

	let frequencyData = new Uint8Array(analayzer.frequencyBinCount);
	analayzer.getByteFrequencyData(frequencyData);

    console.log("frequencyData", frequencyData);

    audio.play();

    //let frame = 0;
    //let speed = 0.0003;

    function render() {
    	canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    	analayzer.getByteFrequencyData(frequencyData);
    	//frame += speed;
    	
    	for(let x in frequencyData){
	    	
	    	canvasCtx.fillStyle ="orange";
	    	canvasCtx.fillRect(x, 400+frequencyData[x], 1, 1);
	    	canvasCtx.fillStyle ="red";
	    	canvasCtx.fillRect(x, 400+frequencyData[x]/3, 1, 1);
	    	canvasCtx.fillStyle ="#17a6ff";
	    	canvasCtx.fillRect(x, 350-frequencyData[x], 1, 1);
	    	canvasCtx.fillStyle ="#92ff8c";
	    	canvasCtx.fillRect(x, 350-frequencyData[x]/3, 1, 1);
	    	

	    	
    	}


    	requestAnimationFrame(render);
    }

    render();

}