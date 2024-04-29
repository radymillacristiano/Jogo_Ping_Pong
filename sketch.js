let xBolinha = 300
let yBolinha = 200
let diametro = 24
let raio = diametro / 2

let xRaquete1 = 10
let yRaquete1 = 150
let xRaquete2 = 580
let yRaquete2 = 150
let raqueteComprimento = 8
let raqueteAltura = 100

let velocidadeXBolinha = 8
let velocidadeYBolinha = 8
let velocidadeYRaquete2;

let meusPontos = 0
let oponentePontos = 0

let raquetada
let ponto
let trilha

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostrarBolinha()
  moverBolinha()
  mostrarRaquetes(xRaquete1, yRaquete1, xRaquete2, yRaquete2)
  movimentarRaquete1()
  movimentarRaquete2()
  // verificarColisaoRaquete1()
  colisaoRaquetesBiblioteca(xRaquete1, yRaquete1)
  colisaoRaquetesBiblioteca(xRaquete2, yRaquete2)
  incluirPlacar()
  marcarPonto()
}


function mostrarBolinha() {
  circle(xBolinha,yBolinha, diametro);
}

function moverBolinha() {
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
  
  // Verificação da colisão nas bordas
  if (xBolinha + raio > width || xBolinha < 0) {
  velocidadeXBolinha *= -1
}
  if (yBolinha + raio > height || yBolinha < 0) {
  velocidadeYBolinha *= -1
  }  
}

function mostrarRaquetes(x, y, x2, y2) {
  rect(x, y, raqueteComprimento, raqueteAltura)
  rect(x2, y2, raqueteComprimento, raqueteAltura)
}

function movimentarRaquete1() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete1 -= 10
  }
  
  if (keyIsDown(DOWN_ARROW)) {
  yRaquete1 += 10
  }
  
}

function movimentarRaquete2() {
  // Movimento automático
  velocidadeYRaquete2 = yBolinha - yRaquete2 - raqueteComprimento / 2 - 30
  yRaquete2 += velocidadeYRaquete2 + chanceDeErrar
  
  calculaChanceDeErrar()
  
  // Movimento para segundo jogador
//   if (keyIsDown(87)) {
//     yRaquete2 -= 10
//   }
  
//   if (keyIsDown(83)) {
//     yRaquete2 += 10
//   }
  
}
  
// function verificarColisaoRaquete1() {
//     // Verificação da colisão na raquete
//     if (xBolinha - raio < xRaquete1 + raqueteComprimento && yBolinha - raio < yRaquete1 + raqueteAltura && yBolinha + raio > yRaquete1) {
//   velocidadeXBolinha *= -1
// }
// }

// essa função replace a de cima; é uma forma diferente de fazer a mesma coisa

let colidiu = false

function colisaoRaquetesBiblioteca(x, y) {      
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1
    raquetada.play()
  }  
}

function incluirPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20)
  fill(255)
  text(oponentePontos, 470, 26)
}

function marcarPonto(){
  if (xBolinha > 598){
    meusPontos += 1
    ponto.play()
  }
  if (xBolinha < 2){
    oponentePontos += 1
    ponto.play()
  }
}

// Aumentar erros do oponente automático
let chanceDeErrar = 0;

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}