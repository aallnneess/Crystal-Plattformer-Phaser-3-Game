

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: document.body.offsetWidth >= OwnConfig.WORLD_WIDTH ? OwnConfig.WORLD_WIDTH : document.body.offsetWidth,		// Dyn. maximale Breite des Browser Fensters
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
