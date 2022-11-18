
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class PlayerMovement {

	constructor(gameObject: Phaser.Physics.Arcade.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__PlayerMovement"] = this;

		/* START-USER-CTR-CODE */
		this.gameObject.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.gameObject.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.Physics.Arcade.Sprite): PlayerMovement {
		return (gameObject as any)["__PlayerMovement"];
	}

	private gameObject: Phaser.Physics.Arcade.Sprite;

	/* START-USER-CODE */
	private scene!: Phaser.Scene;
	private player!: Phaser.Physics.Arcade.Sprite;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private spaceBar!: Phaser.Input.Keyboard.Key;
	private upKey!: Phaser.Input.Keyboard.Key;
	private playerSpeed: number = 200;
	private body!: Phaser.Physics.Arcade.Body;
	private jumpCounts = 0;
	private consecutiveJumps = 1;

	start() {
		this.scene = this.gameObject.scene;
		this.player = this.gameObject;
		this.body = <Phaser.Physics.Arcade.Body>this.gameObject.body;

		this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		// Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right, and also Space Bar and shift.
		// Returns:
		// An object containing the properties: up, down, left, right, space and shift.
		this.cursors = this.scene.input.keyboard.createCursorKeys();
	}

	update() {

		// no new objects/properties in update if possibly !

		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-this.playerSpeed);
			// Sets the horizontal flipped state of this Game Object.
			this.player.setFlipX(true);
		}else if (this.cursors.right.isDown) {
			this.player.setVelocityX(this.playerSpeed);
			this.player.setFlipX(false);
		}else {
			this.player.setVelocityX(0);
		}

		/*
		JustDown ->
		The justDown value allows you to test if this Key has just been pressed down or not.
		When you check this value it will return true if the Key is down, otherwise false.
		You can only call justDown once per key press. It will only return true once, until the Key is released and pressed down again.
		 */

		if ((Phaser.Input.Keyboard.JustDown(this.spaceBar) || Phaser.Input.Keyboard.JustDown(this.upKey)) && (this.body.onFloor() || this.jumpCounts < this.consecutiveJumps)) {
			this.jumpCounts++;
			this.player.setVelocityY(-this.playerSpeed * 1.5);
		}

		if (this.body.onFloor()) {
			this.jumpCounts = 0;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
