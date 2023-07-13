import { Component } from "@angular/core";
import Sprite from "openfl/lib/openfl/display/Sprite";
import Event from "openfl/lib/openfl/events/Event";
import MouseEvent from "openfl/lib/openfl/events/MouseEvent";

import { Shape } from "./shape";
import { ShapeType } from "./shape.type";

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
    this.addEvents();
  }

  private initGame(): void {
    const shape = new Shape();
    this.shapesOnView.set(shape.instance.name, shape);

    this.addShapes();
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

  private addShapes(): void {
    setInterval(() => {
      const params: ShapeType = {
        rectX: Math.floor(Math.random() * 500),
        gravity: Math.floor(Math.random() * 5)
      };
      const newShape = new Shape(params);
      this.shapesOnView.set(newShape.instance.name, newShape);
    }, this.shapesPerSecond * 1000);
  }
}
