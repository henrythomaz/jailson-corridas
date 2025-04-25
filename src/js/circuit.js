class Circuit
{
    constructor(scene) {
        // Referencia a cena
        this.scene = scene;

        // Gráficos para desenhar os polígonos da estrada nele
        this.graphics = scene.add.graphics(0, 0);

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

    // projeta um ponto de suas coordenadas mundo para as coordenadas da tela (visualização 2D)
    project2D(point) {
        point.screen.x = SCREEN_CX;
        point.screen.y = SCREEN_H - point.world.z;
        point.screen.w = this.roadWidth;
    }

    // Renderiza a estrada (visualização 2D)
    render2D() {
        this.graphics.clear();

        // obtem os segmentos atuais e anteriores
        var currSegment = this.segments[1];
        var prevSegment = this.segments[0];

        this.project2D(currSegment.point);
        this.project2D(prevSegment.point);

        var p1 = prevSegment.point.screen;
        var p2 = currSegment.point.screen;

        this.drawSegment(
            p1.x, p1.y, p1.w,
            p2.x, p2.y, p2.w,
            currSegment.color
    );
        // console.log("Ponto da tela do segmento anterior: ", p1)
        // console.log("Ponto da tela do segmento atual: ", p2)
    }

    // Desenha o segmento.
    drawSegment(x1, y1, w1, x2, y2, w2, color) {
        this.drawPolygon(x1-w1, y1, x1+w1, y1, x2+w2, y2, x2-w2, y2, color.road);
    }

    // Desenha o poligno denfinido com quatro pontos e a cor
    drawPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        this.graphics.fillStyle(color, 1);
        this.graphics.begginPath();

        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.lineTo(x3, y3);
        this.graphics.lineTo(x4, y4);

        this.graphics.closePath();
        this.graphics.fill();
    }
} 