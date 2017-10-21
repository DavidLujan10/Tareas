const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    })
    .catch(err => {
        console.error(`ERROR!!`, err);
    });
}

function paintToCanvas(){
    const width = video.videoWidth;//LA CONSTANTE QUE NOS DA EL ANCHO  DEL CANVAS DEL VIDEO
    const height = video.videoHeight;//LA CONSTANTE QUE NOS DA EL ALTO DEL CANVAS DEL VIDEO
    canvas.width = width;//ANCHO  DEL CANVAS DEL VIDEO
    canvas.height = height;//ALTO DEL CANVAS DEL VIDEO
    
    return setInterval(() =>{
        ctx.drawImage (video, 0, 0, width, height);
        //SACAMOS LOS PIXELES
        const pixels = ctx.getImageData(0, 0, width, height);
        //console.log(pixels);
        //ES UN LIO AQUI CON ELLOS
        //pixels = redEffect(pixels);

        pixels = rgbSplit(pixels);
        //ctx.globalAlpha = 0.1; //La propiedad globalAlpha establece o devuelve el valor alfa o de transparencia actual del dibujo.

        //pixels = greenScreen(pixels);

        //LOS DEVOLVEMOS
        //debugger;
        //ctx.putImage = ctx.getImageData(0, 0, width, height);
        ctx.putImageData(pixels, 0, 0);

    }, 16);
}

function takePhoto(){
    //TOCABAN LOS SONIDOS
    snap.currentTime = 0;
    snap.play();

    //SACAMOS LOS DATOS DEL CANVAS
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'Imagen');
    //link.textContent = 'Download Image';
    link.innerHTML = `<img src = "${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firsChild);

}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i + 0] = pixels.data[i + 0] + 200; //ROJO
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //VERDE
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //BLUE
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i - 150] = pixels.data[i + 0]; //ROJO
        pixels.data[i + 500] = pixels.data[i + 1]; //VERDE
        pixels.data[i - 550] = pixels.data[i + 2]; //BLUE
    }
    return pixels;
}

function greenScreen(pixels){
    const levels = {};
    
      document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
      });

      //console.log(levels);
    
      for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];
    
        if (red >= levels.rmin
          && green >= levels.gmin
          && blue >= levels.bmin
          && red <= levels.rmax
          && green <= levels.gmax
          && blue <= levels.bmax) {
          // take it out!
          pixels.data[i + 3] = 0;
        }
      }
    
      return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
