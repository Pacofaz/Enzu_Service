const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};
let score = 0;
let health = 3;
document.getElementById('score').textContent = score;
document.getElementById('health').textContent = health;

class Entity {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Player extends Entity {
    constructor(x, y) {
        super(x, y, 15, 'blue');
        this.speed = 4;
    }

    update() {
        if (keys['ArrowUp'] || keys['w']) this.y -= this.speed;
        if (keys['ArrowDown'] || keys['s']) this.y += this.speed;
        if (keys['ArrowLeft'] || keys['a']) this.x -= this.speed;
        if (keys['ArrowRight'] || keys['d']) this.x += this.speed;

        // Keep player inside canvas
        this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
    }
}

class Zombie extends Entity {
    constructor(x, y) {
        super(x, y, 15, 'green');
        this.speed = 1 + Math.random();
    }

    update(target) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
    }
}

class Bullet extends Entity {
    constructor(x, y, angle) {
        super(x, y, 5, 'red');
        this.speed = 6;
        this.angle = angle;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
}

const player = new Player(canvas.width / 2, canvas.height / 2);
const zombies = [];
const bullets = [];
let spawnTimer = 0;
let gameOver = false;

function spawnZombie() {
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    if (edge === 0) { // top
        x = Math.random() * canvas.width; y = 0;
    } else if (edge === 1) { // right
        x = canvas.width; y = Math.random() * canvas.height;
    } else if (edge === 2) { // bottom
        x = Math.random() * canvas.width; y = canvas.height;
    } else { // left
        x = 0; y = Math.random() * canvas.height;
    }
    zombies.push(new Zombie(x, y));
}

function shoot() {
    const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    bullets.push(new Bullet(player.x, player.y, angle));
}

const mouse = {x: 0, y: 0};
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === ' ') shoot();
});
window.addEventListener('keyup', e => keys[e.key] = false);

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();

    spawnTimer++;
    if (spawnTimer > 100) {
        spawnZombie();
        spawnTimer = 0;
    }

    bullets.forEach((b, i) => {
        b.update();
        b.draw();
        if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
            bullets.splice(i, 1);
        }
    });

    zombies.forEach((z, zi) => {
        z.update(player);
        z.draw();

        // bullet collision
        bullets.forEach((b, bi) => {
            const dist = Math.hypot(b.x - z.x, b.y - z.y);
            if (dist < b.size + z.size) {
                zombies.splice(zi, 1);
                bullets.splice(bi, 1);
                score++;
                document.getElementById('score').textContent = score;
            }
        });

        // player collision
        const distPlayer = Math.hypot(player.x - z.x, player.y - z.y);
        if (distPlayer < player.size + z.size) {
            zombies.splice(zi, 1);
            health--;
            document.getElementById('health').textContent = health;
            if (health <= 0) {
                gameOver = true;
                alert('Game Over! Punkte: ' + score);
            }
        }
    });

    requestAnimationFrame(update);
}

update();
