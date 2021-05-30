const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
// let hue = 0;


window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    for (let index = 0; index < 10; index++) {
        particlesArray.push(new Particle());
    }
})


canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

    console.log("mouse move");
    for (let index = 0; index < 5; index++) {
        particlesArray.push(new Particle());
    }
})


// function drawCircle() {
//     ctx.fillStyle = 'red';
//     ctx.strokeStyle = 'red';
//     ctx.lineWidth = 5;
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//     ctx.stroke();
// }

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// function init() {
//     for (let index = 0; index < 100; index++) {
//         particlesArray.push(new Particle());
//     }
// }
// init();


function handleParticles() {
    for (let index = 0; index < particlesArray.length; index++) {
        particlesArray[index].update();
        particlesArray[index].draw();

        for (let j = index; j < particlesArray.length; j++) {
            const dx = particlesArray[index].x - particlesArray[j].x;
            const dy = particlesArray[index].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[index].color;
                // ctx.lineWidth = particlesArray[index].size;
                ctx.moveTo(particlesArray[index].x, particlesArray[index].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke();
            }
        }


        if (particlesArray[index].size <= 0.3) {
            particlesArray.splice(index, 1);
            console.log(particlesArray.length);
            index--;
        }
    }
}

console.log("particlesArray", particlesArray);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleParticles();
    hue += 2;
    requestAnimationFrame(animate);
}

animate()