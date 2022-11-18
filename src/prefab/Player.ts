// You can write more code here

/* START OF COMPILED CODE */

interface Player {

	 body: Phaser.Physics.Arcade.Body;
}

class Player extends Phaser.Physics.Arcade.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "idle01", frame);

		scene.physics.add.existing(this, false);
		this.body.gravity.y = 500;
		this.body.collideWorldBounds = true;
		this.body.setOffset(8, 2);
		this.body.setSize(19, 36, false);

		/* START-USER-CTR-CODE */
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        /* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

    private level: Level = <Level>this.scene;
    private startZone!: Phaser.GameObjects.Ellipse;
    private endZone!: Phaser.GameObjects.Ellipse;

    start() {
        this.setStartAndEndPoints();
    }

    // Update this Sprite's animations.
    protected preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);



        switch (this.body.onFloor()) {
            case true: {
                if (this.body.velocity.x !== 0) {
                    this.anims.play(ANIM_PLAYER_WALK, true);
                } else {
                    this.anims.play(ANIM_PLAYER_IDLE, true);
                }

                break;
            }
            case false: {
                this.anims.play(ANIM_PLAYER_JUMP, true);
                break;
            }
        }
    }

    public setStartAndEndPoints() {
        this.startZone = <Phaser.GameObjects.Ellipse>this.level.player_zones.getByName('startZone');
        this.endZone = <Phaser.GameObjects.Ellipse>this.level.player_zones.getByName('endZone');

        this.x = this.startZone.x;
        this.y = this.startZone.y;
    }

    public addCollider(gameObject: Phaser.GameObjects.GameObject) {
        this.scene.physics.add.collider(this, gameObject);
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
