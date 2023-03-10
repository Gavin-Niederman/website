const container = document.getElementById('container') as HTMLElement;
let size = container.getBoundingClientRect() as DOMRect;
console.log(size)

class Circle {
    public size: number;
    public x: number;
    public y: number;
    public depth: number;

    constructor(size: number, x: number, y: number, depth: number) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.depth = depth;
    }
}

class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private circleImage: HTMLImageElement;
    private circleShadowImage: HTMLImageElement;
    private circles: Circle[];
    private bgCircles: Circle[];
    private mouseX: number;
    private mouseY: number;
    private scroll: number;

    constructor() {
        this.canvas = document.getElementById("background") as HTMLCanvasElement;
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.mouseX = 0;
        this.mouseY = 0;
        this.scroll = 0;

        this.circleImage = new Image();
        this.circleImage.addEventListener(
            "load",
            () => {
                renderer.render();
            },
            false
        );
        this.circleImage.src = "/bg/bg-circle.png";
        this.circleShadowImage = new Image();
        this.circleShadowImage.addEventListener(
            "load",
            () => {
                renderer.render();
            },
            false
        );
        this.circleShadowImage.src = "/bg/bg-circle-shadow.png";


        this.bgCircles = [
            new Circle(84, 45, 9, 0.75),
            new Circle(105, 8, 2, 0.7),
        ]
        this.circles = [
            new Circle(45, 90, 35, 0.5),
            new Circle(55, 35, -22, 0.2),
            new Circle(120, 85, -52, 0.3),
            new Circle(64, -16, 10, 0.7),
            new Circle(64, -13, -10, 0.3),
            new Circle(60, -10, 75, 0.1),
            new Circle(67, 45, 80, 0.3),
            new Circle(78, 80, 75, 0.1),
        ]
    }

    handleMouseMovement(event: MouseEvent) {
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;
    }

    handleScroll(event: Event) {
        this.scroll = window.scrollY;
    }

    updateSize() {
        size = container.getBoundingClientRect() as DOMRect;
        this.canvas.width = size.width;
        this.canvas.height = size.height;
    }

    render() {
        this.updateSize();
        this.context.fillStyle = "#1D201F";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.bgCircles.forEach((circle: Circle) => {
            this.drawCircle(circle);
        })
        this.context.fillStyle = "#1D201F6C"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.circles.forEach((circle: Circle) => {
            this.drawCircle(circle);
        })
    }

    drawCircle(circle: Circle) {
        let x = (circle.x - ((this.mouseX / 250) * (1 - circle.depth))) * (this.canvas.width / 100);
        let y = (circle.y - (((this.mouseY / 250) + (this.scroll / 75)) * (1 - circle.depth))) * (this.canvas.height / 100);
        let size = circle.size * (this.canvas.height / 100);
        this.context.drawImage(
            this.circleShadowImage,
            x - 70/2,
            y - 70/2,
            size + 70,
            size + 70
        );
        this.context.drawImage(
            this.circleImage,
            x,
            y,
            size,
            size
        );
    }
}


const renderer = new Renderer();

if (!window.matchMedia("(max-width: 700px)").matches) {
    document.addEventListener("mousemove", (ev) => {
        renderer.handleMouseMovement(ev);
        renderer.render();
    });
}

document.addEventListener("scroll", (ev) => {
    renderer.handleScroll(ev);
    renderer.render();
});

window.addEventListener("resize", (ev) => {
    renderer.render();
});