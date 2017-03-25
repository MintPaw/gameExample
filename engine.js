var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var print = console.log;
var renderer;
var initFn;
var updateFn;
var stage;

var engineSprites = [];
var keyStates = [];

function engineInit(init, update) {
	initFn = init;
	updateFn = update;
	PIXI.utils.sayHello("Game initing");

	stage = new PIXI.Container();
	renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT);
	document.body.appendChild(renderer.view);

	for (i = 0; i < 128; i++) keyStates[i] = false;
	document.addEventListener("keydown", function(e) {
		keyStates[e.keyCode] = true;
	});

	document.addEventListener("keyup", function(e) {
		keyStates[e.keyCode] = false;
	});

	PIXI.loader.add("img/ground.png");
	PIXI.loader.add("img/mario.png");
	PIXI.loader.load(engineLoaded);
}

function engineLoaded() {
	initFn();
	engineUpdate();
}

function engineIsKeyDown(keyCode) {
	return keyStates[keyCode];
}

function engineCreateSprite(assetId) {
	var engineSprite = new PIXI.Sprite(PIXI.loader.resources[assetId].texture);
	stage.addChild(engineSprite);
	engineSprites.push(engineSprite);
	return [engineSprites.length-1, engineSprite.width, engineSprite.height];
}

function engineMoveSprite(id, x, y) {
	var engineSprite = engineSprites[id];
	engineSprite.x = x;
	engineSprite.y = y;
}

function engineUpdate() {
	updateFn();
	renderer.render(stage);
	requestAnimationFrame(engineUpdate);
}
