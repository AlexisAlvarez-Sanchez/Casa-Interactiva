// =====================================================
// PROYECTO FINAL - CASITA INTERACTIVA
// Materia: Graficación
// Nombre: Alexis Alvarez Sanchez.
// =====================================================


// Control de animación
let animacionActiva = true;

// Puerta
let puertaAbierta = false;
let anguloPuerta = 0;

// Nubes
let nubes = [];

// Humo de chimenea
let particulasHumo = [];

// Estrellas
let estrellas = [];

// Flores
let flores = [];


function setup() {
    createCanvas(800, 600);
    
    // Inicializar nubes con posiciones aleatorias
    for (let i = 0; i < 5; i++) {
        nubes.push({
            x: random(width),
            y: random(30, 120),
            velocidad: random(0.3, 1.2),
            tamano: random(0.8, 1.5)
        });
    }
    
    // Inicializar estrellas
    for (let i = 0; i < 80; i++) {
        estrellas.push({
            x: random(width),
            y: random(height / 2),
            brillo: random(100, 255),
            parpadeo: random(0.02, 0.08)
        });
    }
    
    // Inicializar flores en el jardín
    for (let i = 0; i < 8; i++) {
        flores.push({
            x: random(50, 250),
            y: random(480, 550),
            color: color(random(200, 255), random(50, 150), random(100, 200)),
            tamano: random(8, 15),
            oscilacion: random(TWO_PI)
        });
    }
    
    smooth();
}


function draw() {
   
    // mouseX controla el ciclo día/noche (0 = noche, width = día)
    let cicloDia = map(mouseX, 0, width, 0, 1);
    cicloDia = constrain(cicloDia, 0, 1);
  
    // colores: Noche (azul oscuro) → Día (azul claro)
    let colorNoche = color(25, 25, 60);
    let colorDia = color(135, 206, 235);
    let colorCielo = lerpColor(colorNoche, colorDia, cicloDia);
    background(colorCielo);
    
   
    dibujarEstrellas(cicloDia);
    
    
    // mouseY controla la altura del astro
    let alturaAstro = map(mouseY, 0, height, 50, height - 100);
    alturaAstro = constrain(alturaAstro, 50, height - 100);
    
    // Sol (día) o Luna (noche)
    if (cicloDia > 0.3) {
        dibujarSol(width - 100, alturaAstro, cicloDia);
    } else {
        dibujarLuna(width - 100, alturaAstro, cicloDia);
    }
    
   
    dibujarNubes();
    
   
    dibujarJardin();
    
    
    dibujarFlores();
    
    
    dibujarCasita();
    
  
    dibujarHumo();
    
    
    dibujarInfo();
}



// Dibujar estrellas que parpaden
function dibujarEstrellas(cicloDia) {
    // Opacidad 
    let opacidad = map(cicloDia, 0, 1, 255, 0);
    
    if (opacidad > 5) {
        noStroke();
        for (let estrella of estrellas) {
            // parpadeo
            let brillo = estrella.brillo + sin(frameCount * estrella.parpadeo) * 50;
            brillo = constrain(brillo, 50, 255);
            fill(255, 255, 200, opacidad * (brillo / 255));
            circle(estrella.x, estrella.y, random(2, 4));
        }
    }
}

// Dibujar sol con rayos
function dibujarSol(x, y, cicloDia) {
    push();
    translate(x, y);
    
    // Animacion sol
    stroke(255, 200, 50, 200);
    strokeWeight(3);
    let rotacionRayos = frameCount * 0.02;
    for (let i = 0; i < 12; i++) {
        let angulo = rotacionRayos + (i * TWO_PI / 12);
        let x1 = cos(angulo) * 50;
        let y1 = sin(angulo) * 50;
        let x2 = cos(angulo) * 75;
        let y2 = sin(angulo) * 75;
        line(x1, y1, x2, y2);
    }
    
    // Círculo del sol
    noStroke();
    fill(255, 220, 50);
    circle(0, 0, 80);
    
    // Brillo por dentro
    fill(255, 255, 150);
    circle(0, 0, 50);
    
    pop();
}

// Dibujar luna 
function dibujarLuna(x, y, cicloDia) {
    push();
    translate(x, y);
    
    
    noStroke();
    fill(255, 255, 220, 50);
    circle(0, 0, 120);
    
    // Círculo de la luna
    fill(220, 220, 200);
    circle(0, 0, 70);
    
    
    fill(180, 180, 160);
    circle(-15, -10, 12);
    circle(20, 5, 8);
    circle(-5, 20, 15);
    circle(10, -18, 6);
    
    pop();
}

// Dibujar y animar nubes
function dibujarNubes() {
    noStroke();
    fill(255, 255, 255, 200);
    
    for (let nube of nubes) {
        push();
        translate(nube.x, nube.y);
        scale(nube.tamano);
        
        // Dibujar nube con múltiples círculos
        circle(0, 0, 50);
        circle(30, -10, 60);
        circle(60, 0, 50);
        circle(30, 10, 40);
        
        pop();
        
        // Mover nube si la animación está activa
        if (animacionActiva) {
            nube.x += nube.velocidad;
            if (nube.x > width + 100) {
                nube.x = -100;
            }
        }
    }
}

// Dibujar el jardín/suelo
function dibujarJardin() {
    // Suelo verde
    noStroke();
    fill(34, 139, 34);
    rect(0, height - 100, width, 100);
    
    // Detalle del césped
    stroke(20, 100, 20);
    strokeWeight(2);
    for (let i = 0; i < width; i += 20) {
        line(i, height - 100, i + 5, height - 90);
        line(i + 10, height - 100, i + 8, height - 88);
    }
    
    // Camino de entrada
    noStroke();
    fill(160, 140, 100);
    beginShape();
    vertex(360, height - 100);
    vertex(440, height - 100);
    vertex(480, height);
    vertex(320, height);
    endShape(CLOSE);
}

// Dibujar flores animadas
function dibujarFlores() {
    for (let flor of flores) {
        push();
        translate(flor.x, flor.y);
        
        // Tallo
        stroke(34, 100, 34);
        strokeWeight(3);
        line(0, 0, 0, 20);
        
        // Hojas
        noStroke();
        fill(50, 150, 50);
        ellipse(-8, 10, 12, 6);
        ellipse(8, 12, 12, 6);
        
        // Flor con animación de oscilación
        let oscilacion = sin(frameCount * 0.05 + flor.oscilacion) * 3;
        translate(oscilacion, 0);
        
        // Pétalos
        noStroke();
        fill(flor.color);
        for (let i = 0; i < 6; i++) {
            let angulo = i * TWO_PI / 6;
            let px = cos(angulo) * flor.tamano * 0.6;
            let py = sin(angulo) * flor.tamano * 0.6;
            circle(px, py, flor.tamano);
        }
        
        // Centro de la flor
        fill(255, 200, 50);
        circle(0, 0, flor.tamano * 0.5);
        
        pop();
    }
}

// Dibujar la casita completa
function dibujarCasita() {
    push();
    translate(250, 250);
    
    
    noStroke();
    fill(210, 180, 140); // Color madera clara
    rect(0, 100, 300, 200);
    
    // Textura de ladrillos
    stroke(180, 150, 110);
    strokeWeight(1);
    for (let i = 0; i < 300; i += 30) {
        line(i, 100, i, 300);
        for (let j = 100; j < 300; j += 20) {
            let offset = (j / 20) % 2 === 0 ? 0 : 15;
            line(i + offset, j, i + offset + 30, j);
        }
    }
    
  
    noStroke();
    fill(139, 69, 19); // Marrón oscuro
    triangle(-20, 100, 150, -30, 320, 100);
    
    // Detalle del techo
    stroke(100, 50, 10);
    strokeWeight(3);
    line(-20, 100, 150, -30);
    line(150, -30, 320, 100);
    
    
    noStroke();
    fill(120, 60, 30);
    rect(220, -10, 40, 80);
    
    // Borde de la chimenea
    fill(100, 50, 20);
    rect(215, -15, 50, 15);
    
    
    // La iluminación de las ventanas cambia según el ciclo día/noche
    let cicloDia = map(mouseX, 0, width, 0, 1);
    let colorVentana = cicloDia > 0.5 ? color(100, 150, 200) : color(255, 200, 100);
    
    // Ventana izquierda
    dibujarVentana(40, 150, colorVentana);
    
    // Ventana derecha
    dibujarVentana(200, 150, colorVentana);
    

    dibujarPuerta(120, 180);
    
   
    // Marco de la casa
    stroke(100, 80, 60);
    strokeWeight(4);
    noFill();
    rect(0, 100, 300, 200);
    
    pop();
}

// Dibujar ventana
function dibujarVentana(x, y, colorInterior) {
    push();
    translate(x, y);
    
    // Marco
    noStroke();
    fill(100, 70, 50);
    rect(-5, -5, 70, 70);
    
    // Cristal
    fill(colorInterior);
    rect(0, 0, 60, 60);
    
    // Reflejo
    fill(255, 255, 255, 100);
    triangle(5, 55, 25, 5, 45, 5);
    
    // Cruces de la ventana
    stroke(100, 70, 50);
    strokeWeight(4);
    line(30, 0, 30, 60);
    line(0, 30, 60, 30);
    
    // Cortina
    noStroke();
    fill(200, 100, 100);
    rect(0, -5, 60, 15);
    
    pop();
}

// Dibujar puerta interactiva
function dibujarPuerta(x, y) {
    push();
    translate(x, y);
    
    // Marco de la puerta
    noStroke();
    fill(80, 50, 30);
    rect(-5, -5, 70, 130);
    
    // Animación de la puerta
    if (puertaAbierta && anguloPuerta < PI / 3) {
        anguloPuerta += 0.05;
    } else if (!puertaAbierta && anguloPuerta > 0) {
        anguloPuerta -= 0.05;
    }
    
    // Puerta con perspectiva cuando se abre
    push();
    translate(30, 60);
    rotate(-anguloPuerta);
    translate(-30, -60);
    
    // Panel de la puerta
    fill(139, 90, 43);
    rect(0, 0, 60, 120);
    
    // Detalles de la puerta
    stroke(100, 60, 20);
    strokeWeight(2);
    noFill();
    rect(5, 5, 50, 50);
    rect(5, 60, 50, 55);
    
    // Picaporte
    noStroke();
    fill(200, 170, 80);
    circle(50, 60, 8);
    
    pop();
    
    // Interior oscuro visible cuando la puerta está abierta
    if (anguloPuerta > 0.1) {
        fill(30, 20, 10);
        rect(5, 5, 50, 110);
    }
    
    pop();
}

// Dibujar humo de la chimenea
function dibujarHumo() {
    // Generar nueva partícula de humo
    if (animacionActiva && frameCount % 10 === 0) {
        particulasHumo.push({
            x: 490,
            y: 220,
            tamano: random(10, 20),
            opacidad: 200,
            velocidadY: random(0.5, 1.5),
            drift: random(-0.5, 0.5)
        });
    }
    
    // Dibujar y actualizar partículas
    noStroke();
    for (let i = particulasHumo.length - 1; i >= 0; i--) {
        let p = particulasHumo[i];
        
        fill(150, 150, 150, p.opacidad);
        circle(p.x, p.y, p.tamano);
        
        if (animacionActiva) {
            p.y -= p.velocidadY;
            p.x += p.drift + sin(frameCount * 0.05 + i) * 0.3;
            p.tamano += 0.3;
            p.opacidad -= 1.5;
        }
        
        // Eliminar partículas viejas
        if (p.opacidad <= 0 || p.y < 0) {
            particulasHumo.splice(i, 1);
        }
    }
}

// Dibujar información en pantalla
function dibujarInfo() {
    // Panel semi-transparente
    fill(0, 0, 0, 150);
    noStroke();
    rect(10, 10, 280, 90, 10);
    
    // Texto informativo
    fill(255);
    textSize(14);
    textAlign(LEFT);
    text(" Ciclo: " + (mouseX < width/2 ? "Noche" : "Dia"), 20, 35);
    text("  Puerta: " + (puertaAbierta ? "Abierta" : "Cerrada"), 20, 55);
    text("  Animacion: " + (animacionActiva ? "Activa" : "Pausada"), 20, 75);
    text("  Frame: " + frameCount, 20, 95);
    
    // Indicador visual del ciclo
    let cicloDia = map(mouseX, 0, width, 0, 1);
    fill(100, 100, 100);
    rect(width - 160, 15, 140, 20, 10);
    
    // Barra de progreso del ciclo
    let barraColor = lerpColor(color(50, 50, 150), color(255, 200, 50), cicloDia);
    fill(barraColor);
    rect(width - 160, 15, 140 * cicloDia, 20, 10);
    
    fill(255);
    textAlign(CENTER);
    textSize(12);
    text("CICLO DIA/NOCHE", width - 90, 30);
}


// Click del mouse - Abrir/cerrar puerta
function mousePressed() {
    // Verificar si el click está en el área de la puerta
    // Coordenadas aproximadas de la puerta en la casita
    let puertaX = 370;
    let puertaY = 430;
    let puertaAncho = 60;
    let puertaAlto = 120;
    
    if (mouseX > puertaX && mouseX < puertaX + puertaAncho &&
        mouseY > puertaY && mouseY < puertaY + puertaAlto) {
        puertaAbierta = !puertaAbierta;
    }
}

// Tecla espacio - Pausar/reanudar animación
function keyPressed() {
    if (key === ' ') {
        animacionActiva = !animacionActiva;
        if (animacionActiva) {
            loop();
        } else {
            noLoop();
            // Redibujar una vez para mostrar el estado pausado
            redraw();
        }
    }
}


