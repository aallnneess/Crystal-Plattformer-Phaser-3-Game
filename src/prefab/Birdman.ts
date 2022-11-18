
// You can write more code here

/* START OF COMPILED CODE */

interface Birdman {

	 body: Phaser.Physics.Arcade.Body;
}

class Birdman extends Phaser.Physics.Arcade.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 10, y ?? 0, texture || "birdman", frame);

		scene.physics.add.existing(this, false);
		this.body.gravity.y = 500;
		this.body.collideWorldBounds = true;
		this.body.setOffset(7, 24);
		this.body.setSize(24, 39, false);

		/* START-USER-CTR-CODE */
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private level: Level = <Level>this.scene;

	private start() {
		console.log('start birdman');
		// add this enemy to Scene-Enemy Group
		this.level.enemies.add(this);
	}

	update() {
		this.setVelocityX(30);
	}

	// Update this Sprite's animations.
	protected preUpdate(time: number, delta: number) {
		super.preUpdate(time, delta);
		this.anims.play(ANIM_BIRDMAN_WALK, true);

	}

// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
