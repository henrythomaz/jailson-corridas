class Circuit
{
    constructor(scene) {
        // Referencia a cena
        this.scene = scene;

        // Array de segmenntos da estrada
        this.segmentLength = 100;

        // Tamanho da estrada (na verdade é metade da estrada)
        this.roadWidth = 1000;
    };

    // Cria todo o ambiente com os objetos da estrada e a beira de estrada
    create() {
        // Limpa arrays
        this.segments = [];

        // Cria a estrada
        this.createRoad();
    };

    // Cria a estrada (como a estrada é reta, ela pode ser constituída de apenas uma seção)
    createRoad() {
        this.createSection(10);
    }

    /*
        Cria a seção da estrada. Parâmetros:
            nSegments = número de segmentos que compõe essa seção
    */
   createSection(nSegments) {
    for (let i = 0; i < nSegments; i++) {
        this.createSegment();
        console.log("segmento criado:", this.segments[i]);
    }
   }
    // Cria um nvo segmento
    createSegment() {
        // Pega o número atual de segmentos
        var n = this.segments.length;

        // Adiciona um novo segmento
        this.segments.push({
            index: n,
            point: {
                world: {x: 0, y: 0, z: n*this.segmentLength},
                screen: {x:0, y: 0, z: 0},
                scale: -1
            },
            color: {road: '0x888888'}
        })
    }
} 