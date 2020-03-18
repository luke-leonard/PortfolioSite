import { Drawable } from './Drawable';
import { Vector2D } from './Vector2D';
import { BZRCurve } from './BZRCurve';
import { Timeable } from './Timeable';
import { TimeKeeper } from './TimeKeeper';

export class Wave implements Drawable{
timeTracker : Timeable = TimeKeeper.getInstance().register();

size:number;
points:Vector2D[] = [];
color: string = "#66fcf1";
maxHeight:number;
maxWidth:number;
center: number;
dampenRate: number = (Math.random() * 6) + 4;
position:number ;


constructor(){

}

buildCurves(size ?:number){
  this.points = [];
  if(size){
    this.size = size;
  }
  this.points = this.getRandomDist(this.size);

}
draw(ctx:CanvasRenderingContext2D){

  ctx.beginPath();
  ctx.moveTo(
    this.points[0].getXPosition(),
    this.points[0].getYPosition() * Math.sin(TimeKeeper.getInstance().getDeltaTime()/(50 * this.dampenRate)) + this.position
    );
  for (let i = 0; i < this.size + 1; i++) {
    ctx.bezierCurveTo(
      this.points[3*i + 1].getXPosition(),
      this.points[3*i + 1].getYPosition() * Math.sin(TimeKeeper.getInstance().getDeltaTime()/(50 * this.dampenRate)) + this.position,
      this.points[3*i + 2].getXPosition(),
      this.points[3*i + 2].getYPosition() * Math.sin(TimeKeeper.getInstance().getDeltaTime()/(50 * this.dampenRate)) + this.position,
      this.points[3*i + 3].getXPosition(),
      this.points[3*i + 3].getYPosition() * Math.sin(TimeKeeper.getInstance().getDeltaTime()/(50 * this.dampenRate)) + this.position
      )
  }
  ctx.strokeStyle =this.color;
  ctx.stroke();
}




getRandomDist(numberOfBZRCurves:number) : Vector2D[]{
  let points : Vector2D[] = [];
  let xcords : number[]   = [];

  for (let i = 0; i < numberOfBZRCurves * 9 + 9; i++) {
    let width = this.maxWidth * Math.random();
    xcords.push(width);
  }
  xcords.sort((a,b)=>a-b);


  let xcord0 = 0;
  let ycord0 = 0;
  let xcord1 = xcords[1];
  let ycord1 = 0;
  let xcord2 : number;
  let ycord2 : number;
  let xcord3 : number;
  let ycord3 : number;
  let xcord4 : number;
  let ycord4 : number;

  points.push(new Vector2D(xcord0,ycord0));
  points.push(new Vector2D(xcord1,ycord1));

  let sign = (Math.random() > 0.5)?1:-1;
  console.log(sign);


  for (let i = 0; i < (xcords.length /9) -1 ; i++) {

    xcord2 = xcords[i*9 + 7];
    xcord4 = xcords[i*9 + 13];

    if(xcord2 < this.center){
      ycord2 =  (sign * (this.maxHeight * (xcord2/this.center )));
    }else{
      ycord2 = (sign * (this.maxHeight * ((this.maxWidth - xcord2)/this.center)));
    }

    if(xcord4 < this.center){
      ycord4 = - (sign * (this.maxHeight * (xcord4/this.center )));
    }else{
      ycord4 = - (sign * (this.maxHeight * ((this.maxWidth - xcord4)/ this.center)));
    }
    xcord3 =  (-ycord2)/((ycord4 - ycord2)/(xcord4-xcord2)) + xcord2;

    ycord3 =  0;

    points.push(new Vector2D(xcord2,ycord2));
    points.push(new Vector2D(xcord3,ycord3));
    points.push(new Vector2D(xcord4,ycord4));
    xcord1 = xcord4;
    xcord1 = xcord4;


  }

  points.push(new Vector2D(xcords[xcords.length - 2],0));
  points.push(new Vector2D(this.maxWidth,0));


  return points;
}




}
