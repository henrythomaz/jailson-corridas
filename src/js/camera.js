class Camera
{
    constructor(scene) {
        // Referencia a cena
        this.scene = scene;

        // Camera das coordenadas do mundo
        this.x = 0;
        this.y = 1000;
        this.z = 0;

        // distância Z entre a camera e o jogador
        this.distToPlayer = 500;

        // distância Z entre a camera e a projeção base do plano
        this.distToPlane = null;
    }

    // Inicia a camera (deve ser chamado quando o jogo começar ou quando as configurações forem alteradas)
    init() {
        this.distToPlane = 1 / -(this.y / this.distToPlayer);
    }

    // Atualiza a posição da camêra atrás do player 
    update() {
        // Plano da câmera o player e 
        this.z = -this.distToPlayer
    }
}