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
  public shapesOnView = [];

  public constructor() {
    super();

    this.initGame();
    this.addEvents();
  }

  private initGame() {
    const shape = new Shape();
    this.shapesOnView.push(shape);

    this.addShapes();
  }

  private addEvents() {
    this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
    this.addEventListener(MouseEvent.CLICK, this.onShapeClicked);
  }

  private onEnterFrame = (event: Event) => {
    this.shapesOnView.forEach((shape) => {
      // TODO - moves spahes to map in order to remove specific one
      // let it for now
      if (shape.rectY > 1000) {
        this.shapesOnView.shift();
      }

      shape.update();
      this.addChild(shape.instance);
    });
  };

  private onShapeClicked = ({ target }: TouchEvent) => {
    const shapeClickedName = target["__name"];
    this.shapesOnView = this.shapesOnView.filter((shape) => {
      if (shape.instance.name !== shapeClickedName) return true;

      shape.removeShape();
      return false;
    });
  };

  private addShapes() {
    setInterval(() => {
      const params: ShapeType = {
        rectX: Math.floor(Math.random() * 500),
      };
      const newShape = new Shape(params);
      this.shapesOnView.push(newShape);
    }, this.shapesPerSecond * 1000);
  }
}
