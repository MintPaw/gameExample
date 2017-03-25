var player;
var collSprites = [];
var gameSprites = [];

engineInit(gameInit, gameUpdate);

function gameInit() {
	// Add mario sprite
	player = createSprite("img/mario.png");
	player.grav = 0;

	var ground = createSprite("img/ground.png");
	ground.y = GAME_HEIGHT - ground.height;
	collSprites.push(ground);

	var wall = createSprite("img/ground.png");
	wall.x = 250;
	wall.y = ground.y - 100;
	collSprites.push(wall);

	var wall2 = createSprite("img/ground.png");
	wall2.x = -200;
	wall2.y = ground.y - 100;
	collSprites.push(wall2);

	var roof = createSprite("img/ground.png");
	roof.x = ground.x - 125;
	roof.y = ground.y - roof.height - 100;
	collSprites.push(roof);
}

function createSprite(assetId) {
	var sprite = {};
	var returnArray = engineCreateSprite(assetId);
	sprite.x = 0;
	sprite.y = 0;
	sprite.width = returnArray[1];
	sprite.height = returnArray[2];
	sprite.id = returnArray[0];
	gameSprites.push(sprite);

	return sprite;
}

function gameUpdate() {
	if (engineIsKeyDown(65)) player.x -= 3;
	if (engineIsKeyDown(68)) player.x += 3;

	var playerIsOnGround = false;
	for (i = 0; i < collSprites.length; i++) {
		var s = collSprites[i];
		while (pointInRect(player.x+player.width/2, player.y+player.height, s.x, s.y, s.width, s.height)) {
			player.y--;
			player.grav = 0;
		}

		while (pointInRect(player.x+player.width, player.y+player.height/2, s.x, s.y, s.width, s.height)) {
			player.x--;
		}

		while (pointInRect(player.x, player.y+player.height/2, s.x, s.y, s.width, s.height)) {
			player.x++;
		}

		while (pointInRect(player.x+player.width/2, player.y, s.x, s.y, s.width, s.height)) {
			player.y++;
			player.grav = 0;
		}

		if (pointInRect(player.x+player.width/2, player.y+player.height+1, s.x, s.y, s.width, s.height)) playerIsOnGround = true;
	}

	if (engineIsKeyDown(32) && playerIsOnGround) {
		player.grav = -15;
		player.y--;
	}

	if (!playerIsOnGround) {
		player.grav++;
		player.y += player.grav;
	}

	for (i = 0; i < gameSprites.length; i++) {
		var s = gameSprites[i];
		engineMoveSprite(s.id, s.x, s.y);
	}
}

function pointInRect(px, py, rx, ry, rw, rh) {
	return px > rx && px < rx+rw && py > ry && py < ry+rh;
}
