"use strict";
window.addEventListener('load', function () {
    var game = new Phaser.Game({
        width: document.body.offsetWidth >= OwnConfig.WORLD_WIDTH ? OwnConfig.WORLD_WIDTH : document.body.offsetWidth,
        height: 600,
        type: Phaser.AUTO,
        backgroundColor: "#242424",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        }
    });
    game.scene.add("Preload", Preload);
    game.scene.add("Level", Level);
    game.scene.add("Boot", Boot, true);
});
class Boot extends Phaser.Scene {
    preload() {
        this.load.pack("pack", "assets/preload-asset-pack.json");
    }
    create() {
        this.scene.start("Preload");
    }
}
// The constants with the animation keys.
const ANIM_PLAYER_WALK = "player_walk";
const ANIM_PLAYER_IDLE = "player_idle";
const ANIM_PLAYER_JUMP = "player_jump";
const ANIM_BIRDMAN_WALK = "birdman_walk";
// You can write more code here
/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
class PlayerMovement {
    constructor(gameObject) {
        this.gameObject = gameObject;
        gameObject["__PlayerMovement"] = this;
        /* START-USER-CTR-CODE */
        this.gameObject.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
        this.gameObject.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        /* END-USER-CTR-CODE */
    }
    static getComponent(gameObject) {
        return gameObject["__PlayerMovement"];
    }
    gameObject;
    /* START-USER-CODE */
    scene;
    player;
    cursors;
    spaceBar;
    upKey;
    playerSpeed = 200;
    body;
    jumpCounts = 0;
    consecutiveJumps = 1;
    start() {
        this.scene = this.gameObject.scene;
        this.player = this.gameObject;
        this.body = this.gameObject.body;
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
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
            this.player.setFlipX(false);
        }
        else {
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
}
/* END OF COMPILED CODE */
// You can write more code here
var GameObject = Phaser.GameObjects.GameObject;
class Enemies extends Phaser.GameObjects.Group {
    // Es kann auch eine leere Gruppe erstellt werden - und diese bereits mit anderen gruppen oder Objekten
    // ein "collide" erstellt werden....dies wird trotzdem funktionieren !
    constructor(scene) {
        super(scene);
    }
    addCollider(obj1) {
        console.log('add Enemies collider');
        // this = Enemies = All objects in enemy group
        return this.scene.physics.add.collider(this, obj1);
    }
}
class OwnConfig {
    static WORLD_WIDTH = 1600;
    setupWorldBoundsAndCamera(player, scene, map, zoom) {
        // TODO : Zomm anhand des document.body.offsetWidth einstellen ?
        scene.physics.world.setBounds(0, 0, OwnConfig.WORLD_WIDTH, 600);
        scene.cameras.main.setBounds(0, 0, OwnConfig.WORLD_WIDTH, 600).setZoom(zoom);
        scene.cameras.main.startFollow(player);
    }
}
class StaticColliderGroup extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
    }
}
// You can write more code here
class Birdman extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
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
    level = this.scene;
    start() {
        console.log('start birdman');
        // add this enemy to Scene-Enemy Group
        this.level.enemies.add(this);
    }
    update() {
        this.setVelocityX(30);
    }
    // Update this Sprite's animations.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.anims.play(ANIM_BIRDMAN_WALK, true);
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
class ColliderBox extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, frame) {
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
    level = this.scene;
    start() {
        this.level.staticColliderGroup.add(this);
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
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
    level = this.scene;
    startZone;
    endZone;
    start() {
        this.setStartAndEndPoints();
    }
    // Update this Sprite's animations.
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        switch (this.body.onFloor()) {
            case true: {
                if (this.body.velocity.x !== 0) {
                    this.anims.play(ANIM_PLAYER_WALK, true);
                }
                else {
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
    setStartAndEndPoints() {
        this.startZone = this.level.player_zones.getByName('startZone');
        this.endZone = this.level.player_zones.getByName('endZone');
        this.x = this.startZone.x;
        this.y = this.startZone.y;
    }
    addCollider(gameObject) {
        this.scene.physics.add.collider(this, gameObject);
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Level extends Phaser.Scene {
    constructor() {
        super("Level");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorCreate() {
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
        const endZone = this.add.rectangle(1582, -11, 128, 128);
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
    plattforms_1;
    player_zones;
    player;
    grounds;
    crystal_world_map;
    groundList;
    /* START-USER-CODE */
    config = new OwnConfig();
    enemies = new Enemies(this);
    staticColliderGroup = new StaticColliderGroup(this);
    create() {
        this.editorCreate();
        this.crystal_world_map.addTilesetImage('sandy_tilesheet_64_64', 'sandy_tilesheet_64_64_extruded', 64, 64, 1, 2);
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
        let endZone = this.player_zones.getByName('endZone');
        // Creates a new Arcade Physics Collider Overlap object.
        const overlap = this.physics.add.overlap(this.player, endZone, () => {
            // Whether the collider is active. So this will collide only 1 time
            overlap.active = false;
            console.log('Player has won!');
        });
    }
    configCollidingGameObjects() {
        this.physics.add.collider(this.enemies);
        // adds all enemies in this group to given gameobject
        this.enemies.addCollider(this.player);
        // TODO: Alle Grounds in eine Group um weniger collider zu haben ?
        this.groundList.forEach(ground => {
            this.player.addCollider(ground);
            this.enemies.addCollider(ground);
        });
    }
}
/* END OF COMPILED CODE */
// You can write more code here
// You can write more code here
/* START OF COMPILED CODE */
class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }
    editorPreload() {
        this.load.pack("asset-pack", "assets/asset-pack.json");
    }
    editorCreate() {
        // text_1
        const text_1 = this.add.text(406.93814427529605, 320.0357731833181, "", {});
        text_1.setOrigin(0.5, 0.5);
        text_1.text = "PRELOAD STATIC\n";
        text_1.setStyle({ "align": "center", "fontSize": "80px" });
        this.events.emit("scene-awake");
    }
    /* START-USER-CODE */
    // Write your code here
    preload() {
        this.editorCreate();
        this.editorPreload();
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
    }
}
/* END OF COMPILED CODE */
// You can write more code here
