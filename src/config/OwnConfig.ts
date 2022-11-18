
class OwnConfig {

    public static WORLD_WIDTH = 1600;

    setupWorldBoundsAndCamera(player: Player, scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, zoom: number) {

        // TODO : Zomm anhand des document.body.offsetWidth einstellen ?

        scene.physics.world.setBounds(0,0,OwnConfig.WORLD_WIDTH,600);
        scene.cameras.main.setBounds(0,0,OwnConfig.WORLD_WIDTH,600).setZoom(zoom);
        scene.cameras.main.startFollow(player);
    }

}
