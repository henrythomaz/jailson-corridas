// Constantes globais

    // tamanho do tela
    const SCREEN_W = 1920;
    const SCREEN_H = 1080;

    // cordenadas do centro da tela
    const SCREEN_CX = SCREEN_W / 2;
    const SCREEN_CY = SCREEN_H / 2;

    // Estados do jogo
    const STATE_INIT = 1;
    const STATE_RESTART = 2;
    const STATE_PLAY = 3;
    const STATE_GAMEOVER =4;

// Variáveis globais
var state = STATE_INIT;

// Cenas

    // Cena Principal
    class MainScene extends Phaser.Scene
    {
        constructor() {
            super({key: 'SceneMain'});
        }

        // Carrega todos os assets
        preload() {
            // Carrega a imagem do fundo
            this.load.image('imgBack', '../../assets/img_back.png')
        }

        // Cria todos os objetos
        create() {
            // Cria um obj da imagem
            this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, 'imgBack');

            // Instancias
            this.circuit = new Circuit(this);
            this.settings = new Settings(this);

            // Funcionalidade de pausar
            this.input.keyboard.on('keydown-P', function() {
                this.settings.txtPause.text = "[P] Resume"
                this.scene.pause();
                this.scene.launch('ScenePause');
            }, this);
            
            // Funcionalidade de despausar    
            this.events.on('resume', function() {
                this.settings.show();
            }, this);
        };


        // Atualiza a cena (loop Principal do jogo)
        update(time, delta) {
            switch(state) {
                case STATE_INIT:
                    console.log('Init game.');
                    state = STATE_RESTART;
                    break;

                case STATE_RESTART:
                    console.log('Restart game.');
                    this.circuit.create();
                    state = STATE_PLAY;
                    break;
                
                case STATE_PLAY:
                    console.log('Playing game.');
                    state = STATE_GAMEOVER;
                    break;

                case STATE_GAMEOVER:
                    console.log('Game over.');
                    break;
            }
        }
    }

    // Cena de Pausa
    class PauseScene extends Phaser.Scene
    {
        constructor() {
            super({key: 'ScenePause'});
        }

        create() {
            this.input.keyboard.on('keydown-P', function() {
                this.scene.resume('SceneMain');
                this.scene.stop();
            }, this)
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

        scene: [MainScene, PauseScene],

        audio: {
            noAudio: true
        }
    };

// Instância do Jogo

var game = new Phaser.Game(config);