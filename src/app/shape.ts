import Sprite from "openfl/lib/openfl/display/Sprite";
import Lib from "openfl/lib/openfl/Lib";
// import { ShapeType } from "./shape.type";
import { ShapeType } from "./shapes.enum";
import { shapeDefaultValues } from "./constants";
import Graphics from "openfl/lib/openfl/display/Graphics";

export class Shape {
  private rectX: number;
  private rectY: number;
  private width: number;
  private height: number;

  private color: number;
  private type: ShapeType;
  private gravity: number;

  public instance: Sprite;
  public generatedAt;

  constructor(params?) {
    this.rectX = params?.rectX ?? shapeDefaultValues.rectX;
    this.rectY = params?.rectY ?? shapeDefaultValues.rectY;
    this.width = params?.width ?? shapeDefaultValues.width;
    this.height = params?.height ?? shapeDefaultValues.height;
    this.color = params?.color ?? shapeDefaultValues.color;
    this.gravity = params?.gravity ?? shapeDefaultValues.gravity;

    this.type = this.getRandomShapeType()
    this.instance = new Sprite();
    this.instance.name = `ShapeNumber: ${Lib.getTimer()}`;
  }

  get getRectY(): number {
    return this.rectY;
  }

  public update() {
    this.instance.graphics.clear();
    this.instance.graphics.beginFill(this.color);
    this.instance.x = this.rectX;
    this.instance.y = this.rectY;
    this.rectY += this.gravity;    

    switch (this.type) {
      case ShapeType.Pentagon:
        this.drawPolygon(this.instance.graphics, 50, 50, 50, 5);
        break;
      case ShapeType.Hexagon:
        this.drawPolygon(this.instance.graphics, 50, 50, 50, 6);
        break;
      case ShapeType.Sqare:
        this.instance.graphics.drawRect( this.rectX, this.rectY, this.width, this.height);
        break;
      case ShapeType.Circle:
        this.instance.graphics.drawCircle(50, 50, 50);
        break;  
    }
  }

  private drawPolygon(
    graphics: Graphics,
    x: number,
    y: number,
    radius: number,
    sides: number
  ): void {
    var step = (Math.PI * 2) / sides;
    var start = 0.5 * Math.PI;

    graphics.moveTo(
      Math.cos(start) * radius + x,
      -Math.sin(start) * radius + y
    );

    for (var i = 0; i < sides; i++) {
      graphics.lineTo(
        Math.cos(start + step * i) * radius + x,
        -Math.sin(start + step * i) * radius + y
      );
    }
  }

  private getRandomShapeType = () => {
    const values = Object.values(ShapeType).filter((e) => typeof e === 'string');
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return ShapeType[enumKey];
  }

  public removeShape() {
    this.instance.graphics.clear();
  }
}
