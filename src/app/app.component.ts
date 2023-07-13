import { Component } from "@angular/core";
import Sprite from "openfl/lib/openfl/display/Sprite";
import Graphics from "openfl/lib/openfl/display/Graphics";
import Stage from "openfl/lib/openfl/display/Stage";

import Lib from "openfl/lib/openfl/Lib";
import Event from "openfl/lib/openfl/events/Event";

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
    this.addEventListener(Event.ENTER_FRAME, this.onEnterFrame);
  }

  private initGame() {
    const shape = new Shape();
    this.shapesOnView.push(shape);

    setInterval(() => {
      const params: ShapeType = {
        rectX: Math.floor(Math.random() * 500),
      };
      const newShape = new Shape(params);
      this.shapesOnView.push(newShape);
    }, this.shapesPerSecond * 1000);
  }

  private onEnterFrame = (event: Event) => {
    this.shapesOnView.forEach((shape) => {
      // TODO -
      if (shape.rectY > 400) {
        this.shapesOnView.shift();
      }

      shape.update();
      this.addChild(shape.instance);
    });
  };
}

var stage = new Stage(650, 400, 0xffffff, AppComponent);
document.body.appendChild(stage.element);
