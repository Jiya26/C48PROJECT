var car,boy,carImg,boyImg,roadImg,carOpenImg;
var red,yellow,green,signal,pole,poleImg;
var timer2, timer1;
var zebraCrossingImg,zebraCrossing;
var fineImg,fine,fine1,fine1Img;
var girlImg,girl;
var roadLight,roadLightImg;

var isGreenLightON = true;
var isZebraCrossingOff = true;
var isGirlVisible = false;
var d;

var colors = ["red", "yellow", "green"];

function preload()
{
	carImg=loadImage("images/audi car door close.png");
	 carOpenImg = loadImage("images/audi car.png");
	boyImg = loadImage("images/boy image.png");
	roadImg = loadImage("images/road img.png");
	red=loadImage("images/traffic light/red light.png");
	yellow=loadImage("images/traffic light/yellow light.png");
	 green=loadImage("images/traffic light/green light.png");
	zebraCrossingImg=loadImage("images/zebra crossing image .jpg");
	fineImg = loadImage("images/police taking fine.png");
	poleImg=loadImage("images/pole.png");
	girlImg = loadImage("images/girl image.png");
	fine1Img = loadImage("images/traffic police stoping vehical.png");
	roadLightImg = loadImage("images/road light.jpg");
}

function setup() {
	createCanvas(1500, 700);
	
	boy = createSprite(500,350,50,50);
	pole = createSprite(width/2+425,200,50,50);
	zebraCrossing = createSprite(750,500,70,70);
	car=createSprite(200,350,50,50);
	fine = createSprite(width/2-400,car.y+100,20,20);
	girl = createSprite(600,500,70,70);
	fine1 = createSprite(750,car.y+125,20,20);

	car.addImage("carcloseImg",carImg);
	boy.addImage("boystandImg",boyImg);
	car.addImage("caropenImg",carOpenImg);	
	fine.addImage("fineimg",fineImg);
	pole.addImage("poleimg",poleImg);
	zebraCrossing.addImage("zebracrossing img",zebraCrossingImg);
	girl.addImage("girl img",girlImg);
	fine1.addImage("fine1 img",fine1Img);

	fine.visible = false;
	pole.visible = false;
	zebraCrossing.visible = false;
	girl.visible = false;
	fine1.visible = false;

	car.scale=0.25;
	boy.scale=0.25;
	fine.scale=0.25;
	pole.scale=1.5;
	girl.scale =0.2;
	zebraCrossing.scale = 1.5;
	fine1.scale =0.2;

	signal = createSprite(width/2 + 425, 200, 50, 50);
	signal.addImage("red", red);
	signal.addImage("yellow", yellow);
	signal.addImage("green", green);
	signal.scale = 0.3;
	signal.visible = false;
}


function draw() {
  background("LightBlue");

  image(roadImg,width/2-400,-height*99,800,height*100);

   if(keyDown(LEFT_ARROW)){
	   if(checkSignal() && checkZebraCrossing()) {
		car.x = car.x -10 
	   }	   
	}
else if(keyDown(RIGHT_ARROW)){
		if(checkSignal() && checkZebraCrossing()) {
			car.x = car.x+10
		}
}
else if(keyDown(UP_ARROW)){
	if(checkSignal() && checkZebraCrossing()) {
	car.y = car.y-10
	}
}
else if(keyDown(DOWN_ARROW)){
	if(checkSignal() && checkZebraCrossing()) {	
	car.y = car.y+10
	}
}

if(keyDown("w")){
	boy.y = boy.y-10
}
else if(keyDown("s")){
	boy.y = boy.y+10
}
else if(keyDown("a")){
	boy.x = boy.x-10
}
else if(keyDown("d")){
	boy.x = boy.x+10
}
camera.position.x = width/2;
camera.position.y = car.y;

trafficLight();
zebracrossing();

  drawSprites();
}
function trafficLight(){
	if(frameCount%500===0 && isGreenLightON === true){
		pole.y= car.y+50;
		signal.y = car.y -15;
		signal.visible = true;
		pole.visible = true;

		// Generating random number for the signal colour
		d = Math.round(random(0,2));		
		signal.changeImage(colors[d]);

		if(d === 2) {
			isGreenLightON = true;
		} else {
			isGreenLightON = false; 
		}
			
		//isGreenLightON = false; 
		timer1 = 100;
	}
	if(timer1 !== undefined) {
		timer1--;
		if(timer1 === 0) {
			d++;
			if(d === 3) {
				d = 0;
			}
			signal.changeImage(colors[d]);
			if(d === 2) {
				isGreenLightON = true;
			} else {
				isGreenLightON = false; 
			}
			timer2 = 100;
		}
	}
	
	if(timer2 !== undefined) {
		timer2--;
		if(timer2===0){
			d++;
			if(d === 3) {
				d = 0;
			}
			signal.changeImage(colors[d]);
			if(d === 2) {
				isGreenLightON = true;
			} else {
				isGreenLightON = false; 
			}
			//isGreenLightON = true;
		}

	}
}

function checkSignal() {
	if(isGreenLightON) {
		fine.visible = false;
		return true;
	} else {
		fine.visible = true;
		car.setVelocity(0, 0);
		fine.y = car.y + 20;
		return false;
	}
}
	
function zebracrossing(){
	if(frameCount%750===0){
		zebraCrossing.visible = true;
		zebraCrossing.y = car.y - 75;
		isZebraCrossingOff = false;
		var r = Math.round(random(1,2));
		if(r === 1){
			girl.visible = true;
			isGirlVisible = true;
			girl.y = zebraCrossing.y;
			girl.x = random(600,800);
			girl.velocityX = -0.5;
		} else {
			girl.visible = false;
			isGirlVisible = false;
		}
	}
}

function checkZebraCrossing(){
	if(isZebraCrossingOff){
		fine1.visible = false;
		return true;
	}else {
		if(isGirlVisible) {
			if(girl.x < 550) {
				fine1.visible = false;
				return true;
			} else {
				fine1.visible = true;
				car.setVelocity(0, 0);
				fine1.y = zebraCrossing.y - 120;
				return false;
			}			
		} else {
			fine1.visible = false;
			return true;
		}
	}
}