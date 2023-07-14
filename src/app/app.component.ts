import { Component } from "@angular/core";
import Sprite from "openfl/lib/openfl/display/Sprite";
import Event from "openfl/lib/openfl/events/Event";
import MouseEvent from "openfl/lib/openfl/events/MouseEvent";
import { Shape, ShapeType, ShapeColor } from "./shape/index";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent extends Sprite {
  private shapesPerSecond = 1;
  private shapesOnView: Map <String , Shape> = new Map();

  public constructor() {
    super();

    this.initGame();
  }

  private initGame(): void {
    this.addShapes();
    this.addEvents();
  }

  private addShapes(): void {
    setInterval(() => {
      const params  = {
        rectX: Math.floor(Math.random() * 500),
        type: this.getRandomFromEnum(ShapeType),
        color: this.getRandomFromEnum(ShapeColor),
      };
      const shape = new Shape(params);
      this.shapesOnView.set(shape.instance.name, shape);
      this.addChild(shape.instance);
    }, this.shapesPerSecond * 1000);
  }

  private addEvents(): void {
    this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
    this.addEventListener(MouseEvent.CLICK, this.onShapeClicked);
  }

  private onEnterFrame = ({ target }: Event) => {
    this.shapesOnView.forEach((shape) => {      
      if (shape.getRectY > target.parent.stageHeight) {
        this.shapesOnView.delete(shape.instance.name);
      }
      shape.update();
      this.addChild(shape.instance);
    });
  };

  private onShapeClicked = ({ target }: TouchEvent) => {
    const shapeClicked = target["__name"];
    this.shapesOnView.get(shapeClicked).removeShape();
    this.shapesOnView.delete(shapeClicked);
  };

  private getRandomFromEnum = (en) => {
    const keys = Object.keys(en).filter((e) => typeof e === 'string');
    const enumVal = keys[Math.floor(Math.random() * keys.length)]
    return en[enumVal];
  }
}
