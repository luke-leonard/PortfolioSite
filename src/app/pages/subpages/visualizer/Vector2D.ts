import { Drawable } from './Drawable';

export class Vector2D{
  /**************************************************************************************************************
  Fields
  ***************************************************************************************************************/
  private xpos : number;
  private ypos : number;


  /**************************************************************************************************************
  Constructor
  ***************************************************************************************************************/
  constructor(
    xpos     ?: number,
    ypos     ?: number){
    this.xpos = xpos;
    this.ypos = ypos;
  }


  /**************************************************************************************************************
  Setters
  ***************************************************************************************************************/
  setXPosition(xpos:number){
    this.xpos = xpos;
  }
  setYPosition(ypos:number){
    this.ypos = ypos;
  }

  /**************************************************************************************************************
  Getters
  ***************************************************************************************************************/
  getXPosition():number{
    return this.xpos;
  }
  getYPosition():number{
    return this.ypos;
  }

  /**************************************************************************************************************
  Updaters
  ***************************************************************************************************************/
  updatePositionByVec2D(vec2:Vector2D){
    this.xpos += vec2.getXPosition();
    this.ypos += vec2.getYPosition();
  }
  updatePositionByRaw(xpos:number, ypos:number){
    this.xpos += xpos;
    this.ypos += ypos;
  }
}
