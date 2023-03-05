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
        this.circleImage.src = "/images/bg/bg-circle2.png";

        this.bgCircles = [
            new Circle(84, 45, 9, 0.7),
            new Circle(105, 8, 2, 0.6),
        ]
        this.circles = [
            new Circle(45, 90, 35, 0.4),
            new Circle(55, 35, -22, 0.2),
            new Circle(120, 85, 0 - 104/2, 0.4),
            new Circle(64, -16, 10, 0.7),
            new Circle(64, -13, -10, 0.3),
            new Circle(60, -10, 75, 0.1),
            new Circle(67, 45, 80, 0.1),
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

    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    render() {
        this.context.fillStyle = "#1D201F";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.bgCircles.forEach((circle: Circle) => {
            this.context.drawImage(
                this.circleImage,
                (circle.x - ((this.mouseX / 250) * (1 - circle.depth))) * (this.canvas.width / 100),
                (circle.y - (((this.mouseY / 250) + (this.scroll / 75)) * (1 - circle.depth))) * (this.canvas.height / 100),
                circle.size * (this.canvas.height / 100), circle.size * (this.canvas.height / 100)
            );
        })
        this.context.fillStyle = "#1D201F6C"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.circles.forEach((circle: Circle) => {
            this.context.drawImage(
                this.circleImage,
                (circle.x - ((this.mouseX / 250) * (1 - circle.depth))) * (this.canvas.width / 100),
                (circle.y - (((this.mouseY / 250) + (this.scroll / 75)) * (1 - circle.depth))) * (this.canvas.height / 100),
                circle.size * (this.canvas.height / 100), circle.size * (this.canvas.height / 100)
            );
        })
    }
}


const renderer = new Renderer();

document.addEventListener("mousemove", (ev) => {
    renderer.handleMouseMovement(ev);
    size = container.getBoundingClientRect() as DOMRect;
    renderer.resize(size.width, size.height);
    renderer.render();
});

document.addEventListener("scroll", (ev) => {
    renderer.handleScroll(ev);
    size = container.getBoundingClientRect() as DOMRect;
    renderer.resize(size.width, size.height);
    renderer.render();
});