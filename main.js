window.onload = () => {
    omega1 = 1/100;
    omega2 = 1/100;
    shift = 0;

    A1 = 100;
    A2 = 100;

    draw_lissajous(omega1, omega2, shift, A1, A2, cnv)
}

draw_lissajous = (omega1, omega2, shift, A1coef, A2coef, canvas) => {
    var ctx = canvas.getContext('2d');

    A1 = A1coef*canvas.height/200;
    A2 = A2coef*canvas.width/200;

    x = canvas.height/3;
    y = canvas.width/3;

    size = 1
    
    ctx.clearRect(0,0,canvas.height,canvas.width)

    for(t=0; t < 1/(omega1*omega2); t++ ){
        ctx.beginPath()
        x =  150 + A1 * Math.cos( omega1 * t + shift)
        y = 150 - A2 * Math.cos( omega2 * t)
        ctx.arc(x,y,size,0,Math.PI*2);
        ctx.fill()
    }
}