import { TimeKeeper } from './TimeKeeper';
import { Timeable } from './Timeable';
import { Drawable } from "./Drawable";
import { Vector2D } from './Vector2D';

export class BZRCurve implements Drawable{
  /**************************************************************************************************************
  Fields
  ***************************************************************************************************************/
  timeTracker : Timeable = TimeKeeper.getInstance().register();
  previous    : BZRCurve;
  point0      : Vector2D;
  point1      : Vector2D;
  point2      : Vector2D;
  point3      : Vector2D;


  /**************************************************************************************************************
  Constructors
  ***************************************************************************************************************/
  constructor(){

  }

  buildCurve(
    prev    : BZRCurve,
    point1  : Vector2D,
    point2  : Vector2D,
    point3  : Vector2D,
    point0 ?: Vector2D){

      this.previous = prev;
      this.point1   = point1;
      this.point2   = point2;
      this.point3   = point3;

      if(this.previous == null){
        if(point0 != null){
          this.point0 = point0;
        }else{
          console.error("invalid BZR Curve construction");
        }
      }else{
        point0 = prev.point3;
      }
  }


  /**************************************************************************************************************
  Draw
  ***************************************************************************************************************/
  draw(ctx:CanvasRenderingContext2D){
    let dt = this.timeTracker.getDeltaTime();


  }
}
