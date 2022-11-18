// You can write more code here

/* START OF COMPILED CODE */

interface ColliderBox {

	 body: Phaser.Physics.Arcade.StaticBody;
}

class ColliderBox extends Phaser.Physics.Arcade.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "box", frame);

		scene.physics.add.existing(this, true);
		this.body.setSize(292, 46, false);

		/* START-USER-CTR-CODE */
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        this.scene.events.once('scene-awake', () => {
            this.refreshBody();
        });
        /* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
    private level: Level = <Level>this.scene;

    start() {
        this.level.staticColliderGroup.add(this);
    }

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
