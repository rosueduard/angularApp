import Sprite from "openfl/lib/openfl/display/Sprite";
import Lib from "openfl/lib/openfl/Lib";
import Graphics from "openfl/lib/openfl/display/Graphics";
import { ShapeType, ShapeDefaultValues } from "."

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
    this.rectX = params?.rectX ?? ShapeDefaultValues.rectX;
    this.rectY = params?.rectY ?? ShapeDefaultValues.rectY;
    this.width = params?.width ?? ShapeDefaultValues.width;
    this.height = params?.height ?? ShapeDefaultValues.height;
    this.color = params?.color ?? ShapeDefaultValues.color;
    this.type = params?.type ?? ShapeDefaultValues.type;
    this.gravity = params?.gravity ?? ShapeDefaultValues.gravity;

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

  public removeShape() {
    this.instance.graphics.clear();
  }
}
