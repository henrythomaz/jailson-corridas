// Constantes locais

    // tamanho do tela
    const SCREEN_W = 1920;
    const SCREEN_H = 1080;

    // cordenadas do centro da tela
    const SCREEN_CX = SCREEN_W / 2;
    const SCREEN_CY = SCREEN_H / 2;

// Cenas
    // Cena Principal
    class MainScene extends Phaser.Scene
    {
        constructor() {
            super({key: 'SceneMain'});
        }
    }

    // Cena de Pausa
    class PauseScene extends Phaser.Scene
    {
        constructor() {
            super({key: 'ScenePause'});
        }
    }

// Iniciando o jogo Phaser 

    // Configuração do jogo
    var config = {
        type: Phaser.AUTO,
        width: SCREEN_W,
        height: SCREEN_H,

        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },

        scene: [MainScene, PauseScene]
    };

// Instância do Jogo

var game = new Phaser.Game(config);