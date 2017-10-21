let contadorDesendiendo;//VARIABLE QUE USAREMOS COMO TEMPORIZADOR
const timerDisplay = document.querySelector('.display__time-left');
const finTiempo = document.querySelector('.display__end-time');
const botones = document.querySelectorAll('[data-time]');

function temporizador(seconds){
    /*setInterval(function(){
        seconds --;//DECREMENTA EL TEMPORIZADOR EN SEGUNDOS
    }, 1000);*/

    //LIMPIAR CUALQUIER EXISTENCIA DE LOS TEMPORIZADORES
    clearInterval(contadorDesendiendo);

    const now = Date.now();
    const then = now + seconds * 1000;
    console.log({now, then});
    displayTimeLeft(seconds);//INMEDIATAMENTE EJECUTA EL SEGUNDO 
    displayfinTiempo(then);

    contadorDesendiendo = setInterval(() => {
        //const secondsLeft = (then - Date.now()) / 1000;//TEMPORIZADOR CON DECIMALES
        const secondsLeft = Math.round((then - Date.now()) / 1000);//TEMPORIZADOR REDONDEADO
        //CHECAMOS SI DEBERIAMOS DETENERLO
        if(secondsLeft < 0){//CONDICION QUE DICE QUE SI LOS SEGUNDO LLEGAN A CERO
            clearInterval(contadorDesendiendo);//LIMPIAMOS EL INTERVALO (EN OTRAS PALABARA DETENEMOS EL TEMPORIZADOR)
            return;

        }

        //LO CORREMOS
        //console.log(secondsLeft);
        displayTimeLeft(secondsLeft);
    }, 1000);

}

function displayTimeLeft(seconds){
    const minutos = Math.floor(seconds / 60);//CONVERTIMOS LOS SEGUNDOS EN MINUTOS 
    const remainderSeconds =seconds % 60;//AQUI HACEMOS QUE LOS MINUTOS TENGAN SEGUNDO Y NO QUE CADA VEZ QUE RECCORRA EL MINUTO NOS DIGA QUE ES UN MINUTO SI NO QUE TENGA SEGUNDOS
    const display = `${minutos}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;//SI LA CUENTA VA MENOR EN 10 SE LE AGREGA UN 0 A LOS NUMEROS
    document.title = display;
    console.log(seconds);
    console.log({minutos, remainderSeconds});
    timerDisplay.textContent = display;
}

function displayfinTiempo(timestamp){
    const fin = new Date(timestamp);
    const hora = fin.getHours();
    const adjusteHora = hora > 12 ? hora - 12 : hour;//AJUSTE DE LA HORA EN 12HRS
    const minutos = fin.getMinutes();
    finTiempo.textContent = `Estar de vuelta en ${adjusteHora}:${minutos < 10 ? '0' : ''}${minutos}`;
}

function inicioTiempo(){
    //console.log(this.dataset.time);
    const seconds = parseInt(this.dataset.time);
    console.log(seconds);
    temporizador(seconds);
    
}

botones.forEach(button => button.addEventListener('click', inicioTiempo));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    temporizador(mins * 60);
    this.reset();

});




