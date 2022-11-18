// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// crystal_world_map
		const crystal_world_map = this.add.tilemap("crystal_world_map");
		crystal_world_map.addTilesetImage("sandy_tilesheet_64_64", "sandy_tilesheet_64_64");
		crystal_world_map.addTilesetImage("main_lev_build_1", "main_lev_build_1");

		// plattforms_1
		const plattforms_1 = crystal_world_map.createLayer("plattforms", ["sandy_tilesheet_64_64"], 0, -70);

		// environment_1
		crystal_world_map.createLayer("environment", [], 0, 0);

		// player_zones
		const player_zones = this.add.layer();
		player_zones.visible = false;

		// startZone
		const startZone = this.add.ellipse(71, 312, 128, 128);
		startZone.name = "startZone";
		startZone.scaleX = 0.2144385073648437;
		startZone.scaleY = 0.2124632387342189;
		startZone.isFilled = true;
		player_zones.add(startZone);

		// endZone
		const endZone = this.add.rectangle(1582, -11, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		endZone.name = "endZone";
		endZone.scaleX = 0.23710473207091476;
		this.physics.add.existing(endZone, false);
		endZone.body.setSize(128, 128, false);
		endZone.isFilled = true;
		player_zones.add(endZone);

		// birdman
		const birdman = new Birdman(this, 113, 297);
		this.add.existing(birdman);

		// player
		const player = new Player(this, 138, 37);
		this.add.existing(player);

		// grounds
		const grounds = this.add.layer();
		grounds.visible = false;

		// arcadeimage_1
		const arcadeimage_1 = new ColliderBox(this, 125, 154);
		arcadeimage_1.scaleX = 0.8508015324088837;
		arcadeimage_1.scaleY = 0.7116522330033579;
		grounds.add(arcadeimage_1);

		// arcadeimage
		const arcadeimage = new ColliderBox(this, 25, 347);
		arcadeimage.scaleX = 1.0313645274879917;
		arcadeimage.scaleY = 0.7116522330033579;
		arcadeimage.setOrigin(0, 0);
		grounds.add(arcadeimage);

		// arcadeimage_2
		const arcadeimage_2 = new ColliderBox(this, 584, 139);
		arcadeimage_2.scaleX = 1.0313645274879917;
		arcadeimage_2.scaleY = 0.7116522330033579;
		arcadeimage_2.setOrigin(0, 0);
		grounds.add(arcadeimage_2);

		// arcadeimage_3
		const arcadeimage_3 = new ColliderBox(this, 472, 375);
		arcadeimage_3.scaleX = 1.0313645274879917;
		arcadeimage_3.scaleY = 0.7116522330033579;
		arcadeimage_3.setOrigin(0, 0);
		grounds.add(arcadeimage_3);

		// arcadeimage_4
		const arcadeimage_4 = new ColliderBox(this, 251, 535);
		arcadeimage_4.scaleX = 0.8084553162878898;
		arcadeimage_4.scaleY = 0.7116522330033579;
		arcadeimage_4.setOrigin(0, 0);
		grounds.add(arcadeimage_4);

		// arcadeimage_5
		const arcadeimage_5 = new ColliderBox(this, 840, 486);
		arcadeimage_5.scaleX = 0.6031968806000525;
		arcadeimage_5.scaleY = 0.7116522330033579;
		arcadeimage_5.setOrigin(0, 0);
		grounds.add(arcadeimage_5);

		// arcadeimage_6
		const arcadeimage_6 = new ColliderBox(this, 1226, 444);
		arcadeimage_6.scaleX = 1.0287360946994917;
		arcadeimage_6.scaleY = 0.7116522330033579;
		arcadeimage_6.setOrigin(0, 0);
		grounds.add(arcadeimage_6);

		// arcadeimage_7
		const arcadeimage_7 = new ColliderBox(this, 1115, 185);
		arcadeimage_7.scaleX = 1.0217267645535284;
		arcadeimage_7.scaleY = 0.7116522330033579;
		arcadeimage_7.setOrigin(0, 0);
		grounds.add(arcadeimage_7);

		// arcadeimage_8
		const arcadeimage_8 = new ColliderBox(this, 1479, 55);
		arcadeimage_8.scaleX = 0.4132789495494602;
		arcadeimage_8.scaleY = 0.7116522330033579;
		arcadeimage_8.setOrigin(0, 0);
		grounds.add(arcadeimage_8);

		// arcadeimage_9
		const arcadeimage_9 = new ColliderBox(this, 309, 166);
		arcadeimage_9.scaleX = 0.17814461445442764;
		arcadeimage_9.scaleY = 0.7116522330033579;
		arcadeimage_9.setOrigin(0, 0);
		grounds.add(arcadeimage_9);

		// arcadeimage_10
		const arcadeimage_10 = new ColliderBox(this, 422, 166);
		arcadeimage_10.scaleX = 0.17814461445442764;
		arcadeimage_10.scaleY = 0.7116522330033579;
		arcadeimage_10.setOrigin(0, 0);
		grounds.add(arcadeimage_10);

		// birdman_1
		const birdman_1 = new Birdman(this, 170, 92);
		this.add.existing(birdman_1);

		// birdman_2
		const birdman_2 = new Birdman(this, 677, 61);
		this.add.existing(birdman_2);

		// birdman_3
		const birdman_3 = new Birdman(this, 648, 284);
		this.add.existing(birdman_3);

		// birdman_4
		const birdman_4 = new Birdman(this, 1192, 110);
		this.add.existing(birdman_4);

		// lists
		const groundList = [arcadeimage_1, arcadeimage_10, arcadeimage_9, arcadeimage_8, arcadeimage_7, arcadeimage_6, arcadeimage_5, arcadeimage_4, arcadeimage_3, arcadeimage_2, arcadeimage];

		// player (components)
		new PlayerMovement(player);

		this.plattforms_1 = plattforms_1;
		this.player_zones = player_zones;
		this.player = player;
		this.grounds = grounds;
		this.crystal_world_map = crystal_world_map;
		this.groundList = groundList;

		this.events.emit("scene-awake");
	}

	public plattforms_1!: Phaser.Tilemaps.TilemapLayer;
	public player_zones!: Phaser.GameObjects.Layer;
	public player!: Player;
	public grounds!: Phaser.GameObjects.Layer;
	private crystal_world_map!: Phaser.Tilemaps.Tilemap;
	private groundList!: ColliderBox[];

	/* START-USER-CODE */

    private config: OwnConfig = new OwnConfig();
	public enemies = new Enemies(this);
	public staticColliderGroup = new StaticColliderGroup(this);

	create() {
        this.editorCreate();

        this.crystal_world_map.addTilesetImage(
            'sandy_tilesheet_64_64',
            'sandy_tilesheet_64_64_extruded',
            64,
            64,
            1,
            2);


        this.configCollidingGameObjects();

        this.config.setupWorldBoundsAndCamera(this.player, this, this.crystal_world_map, 1);

        this.createEndOfLevel();

        /*
        When a Camera culls the tiles in this layer it does so using its view into the world,
        building up a rectangle inside which the tiles must exist or they will be culled.
        Sometimes you may need to expand the size of this 'cull rectangle',
        especially if you plan on rotating the Camera viewing the layer.
 */
        this.plattforms_1.setCullPadding(4, 2);

    }

    createEndOfLevel() {
        let endZone = <Phaser.GameObjects.Ellipse>this.player_zones.getByName('endZone');
        // Creates a new Arcade Physics Collider Overlap object.
        const overlap = this.physics.add.overlap(this.player, endZone, () => {
            // Whether the collider is active. So this will collide only 1 time
            overlap.active = false;
            console.log('Player has won!');
        });
    }


    configCollidingGameObjects() {

		// @ts-ignore
		this.physics.add.collider(this.enemies);

		// adds all enemies in this group to given gameobject
		this.enemies.addCollider(this.player);

		// TODO: Alle Grounds in eine Group um weniger collider zu haben ?
		this.groundList.forEach(ground => {
			this.player.addCollider(ground);
			this.enemies.addCollider(ground);
		});

    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
