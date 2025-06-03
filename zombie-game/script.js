const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};
let score = 0;
let health = 3;
let wood = 0;
let stone = 0;
let isDay = true;
let cycle = 0;
const cycleLength = 1500; // frames per Tag/Nacht
let base = null;
const defenses = [];
const resources = [];
document.getElementById('score').textContent = score;
document.getElementById('health').textContent = health;
document.getElementById('wood').textContent = wood;
document.getElementById('stone').textContent = stone;
document.getElementById('phase').textContent = 'Tag';
document.getElementById('baseHealth').textContent = 0;

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

class Resource extends Entity {
    constructor(x, y, type) {
        const color = type === 'wood' ? 'sienna' : 'gray';
        super(x, y, 10, color);
        this.type = type;
    }
}

class BaseStructure {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.health = 100;
    }

    draw() {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

class Defense extends Entity {
    constructor(x, y) {
        super(x, y, 8, 'orange');
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

function spawnResource() {
    const type = Math.random() < 0.5 ? 'wood' : 'stone';
    const x = Math.random() * (canvas.width - 20) + 10;
    const y = Math.random() * (canvas.height - 20) + 10;
    resources.push(new Resource(x, y, type));
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
    if (e.key === 'b' && !base && wood >= 5 && stone >= 5) {
        base = new BaseStructure(player.x, player.y);
        wood -= 5;
        stone -= 5;
        document.getElementById('wood').textContent = wood;
        document.getElementById('stone').textContent = stone;
        document.getElementById('baseHealth').textContent = base.health;
    }
    if (e.key === 'v' && wood >= 3 && stone >= 2) {
        defenses.push(new Defense(player.x, player.y));
        wood -= 3;
        stone -= 2;
        document.getElementById('wood').textContent = wood;
        document.getElementById('stone').textContent = stone;
    }
});
window.addEventListener('keyup', e => keys[e.key] = false);

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Tag/Nacht Zyklus
    cycle++;
    if (cycle > cycleLength) {
        isDay = !isDay;
        document.getElementById('phase').textContent = isDay ? 'Tag' : 'Nacht';
        cycle = 0;
        if (isDay) {
            for (let i = 0; i < 5; i++) spawnResource();
        }
    }

    if (isDay && Math.random() < 0.01) spawnResource();
    if (!isDay) {
        spawnTimer++;
        if (spawnTimer > 80) {
            spawnZombie();
            spawnTimer = 0;
        }
    }

    player.update();
    player.draw();

    if (base) {
        base.draw();
        document.getElementById('baseHealth').textContent = base.health;
    }

    defenses.forEach(d => d.draw());

    resources.forEach((r, ri) => {
        r.draw();
        const dist = Math.hypot(player.x - r.x, player.y - r.y);
        if (dist < player.size + r.size) {
            if (r.type === 'wood') wood++; else stone++;
            resources.splice(ri, 1);
            document.getElementById('wood').textContent = wood;
            document.getElementById('stone').textContent = stone;
        }
    });

    bullets.forEach((b, i) => {
        b.update();
        b.draw();
        if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
            bullets.splice(i, 1);
        }
    });

    zombies.forEach((z, zi) => {
        const target = base ? base : player;
        z.update(target);
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

        if (base) {
            const distBase = Math.hypot(base.x - z.x, base.y - z.y);
            if (distBase < base.size / 2 + z.size) {
                zombies.splice(zi, 1);
                base.health -= 10;
                if (base.health <= 0) {
                    gameOver = true;
                    alert('Das Haus wurde zerstört! Punkte: ' + score);
                }
            }
        }

        defenses.forEach((d, di) => {
            const distDef = Math.hypot(d.x - z.x, d.y - z.y);
            if (distDef < d.size + z.size) {
                zombies.splice(zi, 1);
            }
        });
    });

    requestAnimationFrame(update);
}

update();
