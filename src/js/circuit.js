class Circuit
{
    constructor(scene) {
        // Referencia a cena
        this.scene = scene;

        // Gráficos para desenhar os polígonos da estrada nele
        this.graphics = scene.add.graphics(0, 0);

        // Array de segmentos da estrada
        this.segments = []
        // Segmento da estrada único
        this.segmentLength = 100;

        // numero do total de segmentos da estrada
        this.total_segments = null;

        // Número de segmentos visíveis pra serem desenhados
        this.visible_segments = 200;

        // Tamanho da estrada (na verdade é metade da estrada)
        this.roadWidth = 1000;

        // tamanho total da estrada
        this.roadLength = null
    };

    // Cria todo o ambiente com os objetos da estrada e a beira de estrada
    create() {
        // Limpa arrays
        this.segments = [];

        // Cria a estrada
        this.createRoad();

        // Loja do numero total de segmentos
        this.total_segments = this.segments.length;

        // Calcula o tamanho da estrada
        this.roadLength = this.total_segments * this.segmentLength;
    };

    // Cria a estrada (como a estrada é reta, ela pode ser constituída de apenas uma seção)
    createRoad() {
        this.createSection(1000);
    }

    /*
        Cria a seção da estrada. Parâmetros:
            nSegments = número de segmentos que compõe essa seção
    */
   createSection(nSegments) {
    for (let i = 0; i < nSegments; i++) {
        this.createSegment();
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

    // Retorna o segmento dada a posição Z
    getSegment(positionZ) {
        if (positionZ < 0) {
            positionZ += this.roadLength;
            var index = Math.floor(positionZ / this.segmentLength) % this.total_segments;
            return this.segments[index];
        }
    }

    // projeta um ponto de suas coordenadas mundo para as coordenadas da tela (visualização 2D)
    project2D(point) {
        point.screen.x = SCREEN_CX;
        point.screen.y = SCREEN_H - point.world.z;
        point.screen.w = this.roadWidth;
    }
    // Projeta um ponto nas coordenadas do mundo para as coordenadas da tela (visualização pseudo 3D)
    project3D(point, cameraX, cameraY, cameraZ, cameraDepth) {
        // COnvertendo as coordenadas do mundo para as coordenadas da camera
        var transX = point.world.x - cameraX;
        var transY = point.world.y - cameraY;
        var transZ = point.world.z - cameraZ;

        // dimensionando o fator baseado na regra de triângulos semelhantes
        point.scale = cameraDepth/transZ; // a divisão da Zero!! 

        // Projetando as coordenadas da câmera em um plano de projeção base
        var projectedX = point.scale * transX;
        var projectedY = point.scale * transY;
        var projectedW = point.scale * this.roadWidth;

        // dimensionando as coordenadas projetadas para as coordenadas da tela
        point.screen.x = Math.round((1 + projectedX) * SCREEN_CX);
        point.screen.y = Math.round((1 + projectedY) * SCREEN_CY);
        point.screen.w = Math.round(projectedW * SCREEN_CX);
    }
    // Renderiza a estrada desenhando o segmento por segmento (visualização pseudo 3D)
    render3D() {
        this.graphics.clear();
        // Pega a cameta
        var camera = this.scene.camera;

        // Pega a base do segmento
        var baseSegment = this.getSegment(camera.z);
        var baseIndex = baseSegment.index;

        for (let n = 0; n < this.visible_segments; n++) {
            // Pega o segmento atual
            var currIndex = (baseIndex + n) % this.total_segments;
            var currSegment = this.segments[currIndex];
            // projeta o segmento no espaço da tela
            this.project3D(currSegment.point, camera.x, camera.y, camera.z, camera.distToPlane);
            
            if (n > 0) {
                var prevIndex = (currIndex > 0) ? currIndex - 1 : this.total_segments - 1;
                var prevSegment = this.segments[prevIndex];
                var p1 = prevSegment.point.screen;
                var p2 = currSegment.point.screen;
                
                this.drawSegment(
                    p1.x, p1.y, p1.w,
                    p2.x, p2.y, p2.w,
                    currSegment.color
                );
            }
        }
    }

    // Desenha o segmento.
    drawSegment(x1, y1, w1, x2, y2, w2, color) {
        this.drawPolygon(x1-w1, y1, x1+w1, y1, x2+w2, y2, x2-w2, y2, color.road);
    }

    // Desenha o poligno denfinido com quatro pontos e a cor
    drawPolygon(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        this.graphics.fillStyle(color, 1);
        this.graphics.beginPath();

        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.lineTo(x3, y3);
        this.graphics.lineTo(x4, y4);

        this.graphics.closePath();
        this.graphics.fill();
    }
} 