import GameObject = Phaser.GameObjects.GameObject;

class Enemies extends Phaser.GameObjects.Group {

    // Es kann auch eine leere Gruppe erstellt werden - und diese bereits mit anderen gruppen oder Objekten
    // ein "collide" erstellt werden....dies wird trotzdem funktionieren !

    constructor(scene: Phaser.Scene) {
        super(scene);
    }

    addCollider(obj1: GameObject) {
        console.log('add Enemies collider');
        // this = Enemies = All objects in enemy group
       return this.scene.physics.add.collider(this,obj1);
    }
}

