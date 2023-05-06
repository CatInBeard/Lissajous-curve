window.onload = () => {
    window.animationInterval = 0;
    window.step =1;
    window.animationType = 0;

    change_phase1_val();
    change_phase2_val();
    change_freq1_val();
    change_freq2_val();
    change_amp1_val();
    change_amp2_val();
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

    draw_lissajous(omega1, omega2, phi1, phi2, A1, A2, cnv, 10)
}

draw_lissajous = (omega1, omega2, phi1, phi2, A1coef, A2coef, canvas, step) => {
    let ctx = canvas.getContext('2d');

    let A1 = A1coef*canvas.height/200;
    let A2 = A2coef*canvas.width/200;
    
    ctx.clearRect(0,0,canvas.height,canvas.width)

    for(t=0; t < 100000; t+=step ){
        let x =  150 + A1 * Math.cos( omega1 * t + phi1)
        let y = 150 - A2 * Math.cos( omega2 * t+ phi2)
        ctx.fillRect(x,y,1,1);
    }
}

start_animation= () => {
    window.step =0;
    button_start.classList.add("visually-hidden");
    button_stop.classList.remove("visually-hidden");
    window.animationInterval = setInterval( () => { draw_animation() }, 60)
}

stop_animation= () => {
    button_start.classList.remove("visually-hidden");
    button_stop.classList.add("visually-hidden");
    clearInterval(window.animationInterval);
    window.animationInterval = 0;
}

draw_animation = () => {
    let coeff= window.step % 2000;
    window.step++;

    let freqval1 = freq1.value/10;
    let freqval2 = freq2.value/10;

    let phi1 = phase1.value * Math.PI * 2;
    let phi2 = phase2.value * Math.PI * 2;
    
    if(!window.animationType){
        freqval2 = 0.8 * freqval1;    
        phi1 = coeff/50* Math.PI;
    }
    else{
        freqval1 = 0.001;
        freqval2 = freqval1 * coeff/1000;
    }

    let A1 = amp1.value/2;
    let A2 = amp2.value/2;

    draw_lissajous(freqval1, freqval2, phi1, phi2, A1, A2, cnv, 5)

}

change_phase1_val = () => {
    phase1_val.innerHTML= ((phase1.value * Math.PI * 2) + "").substring(0,5)
}
change_phase2_val = () => {
    phase2_val.innerHTML= ((phase2.value * Math.PI * 2) + "").substring(0,5)
}
change_freq1_val = () => {
    freq1_val.innerHTML= ((freq1.value) + "").substring(0,5)
    draw_freq_diff();
}
change_freq2_val = () => {
    freq2_val.innerHTML= ((freq2.value) + "").substring(0,5)
    draw_freq_diff();
}
change_amp1_val = () => {
    amp1_val.innerHTML= ((amp1.value) + "").substring(0,5)
}
change_amp2_val = () => {
    amp2_val.innerHTML= ((amp2.value) + "").substring(0,5)
}
draw_freq_diff = () => {
    freq_diff_val.innerHTML= ((freq1.value/freq2.value) + "").substring(0,5)
}