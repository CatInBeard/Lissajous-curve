window.onload = () => {
    window.animationInterval = 0;
    window.step =1;
    redraw();

}

redraw = () => {
    if(window.animationInterval) return false;

    let omega1 = freq1.value/10;
    let omega2 = freq2.value/10;

    let phi1 = phase1.value * Math.PI * 2;
    let phi2 = phase2.value * Math.PI * 2;

    let A1 = amp1.value/2;
    let A2 = amp2.value/2;

    draw_lissajous(omega1, omega2, phi1, phi2, A1, A2, cnv, 0.1)
}

draw_lissajous = (omega1, omega2, phi1, phi2, A1coef, A2coef, canvas, step) => {
    let ctx = canvas.getContext('2d');

    let A1 = A1coef*canvas.height/200;
    let A2 = A2coef*canvas.width/200;
    
    ctx.clearRect(0,0,canvas.height,canvas.width)

    for(t=0; t < Math.PI/(omega1*omega2); t+=step ){
        let x =  150 + A1 * Math.cos( omega1 * t + phi1)
        let y = 150 - A2 * Math.cos( omega2 * t+ phi2)
        ctx.fillRect(x,y,1,1);
    }
}

start_animation= () => {
    window.step =0;
    button_start.classList.add("visually-hidden");
    button_stop.classList.remove("visually-hidden");
    window.animationInterval = setInterval( () => { draw_animation() }, 40)
}

stop_animation= () => {
    button_start.classList.remove("visually-hidden");
    button_stop.classList.add("visually-hidden");
    clearInterval(window.animationInterval);
    window.animationInterval = 0;
}

draw_animation = () => {
    let coeff= window.step % 100;
    window.step++;

    let freq1 = 0.001;
    let freq2 = 0.8 * freq1;
    
    let phi1 = coeff/50* Math.PI;
    let phi2 = Math.PI*0.1;
    
    let A1 = 75;
    let A2 = 75;

    draw_lissajous(freq1, freq2, phi1, phi2, A1, A2, cnv, 2000)

}