import Sprite from "openfl/lib/openfl/display/Sprite";
import Lib from "openfl/lib/openfl/Lib";
import { ShapeType } from "./shape.type";
import { shapeDefaultValues } from "./constants";

export class Shape {
  private rectX: number;
  private rectY: number;
  private width: number;
  private height: number;
  private color: number;
  private gravity: number;

  public instance: Sprite;
  public generatedAt;

  constructor (params?: ShapeType) {
    this.rectX = params?.rectX ?? shapeDefaultValues.rectX;
    this.rectY = params?.rectY ?? shapeDefaultValues.rectY;
    this.width = params?.width ?? shapeDefaultValues.width;
    this.height = params?.height ?? shapeDefaultValues.height;
    this.color = params?.color ?? shapeDefaultValues.color;
    this.gravity = params?.gravity ?? shapeDefaultValues.gravity;

    this.instance = new Sprite();
    this.generatedAt = Lib.getTimer();
  }

  public update() {
    this.instance.graphics.clear()
    this.instance.graphics.beginFill(this.color);

    this.rectY += this.gravity;
    this.instance.graphics.drawRect(this.rectX, this.rectY, this.width, this.height);
  }
}
