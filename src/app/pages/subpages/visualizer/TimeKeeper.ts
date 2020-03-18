import { Timeable } from './Timeable';
export class TimeKeeper{
  /**************************************************************************************************************
  Singlton Declaration
  ***************************************************************************************************************/
  private static instance :TimeKeeper;

  static getInstance() : TimeKeeper {
    if (!TimeKeeper.instance) {
      TimeKeeper.instance = new TimeKeeper();
    }
    return TimeKeeper.instance;
  }

  /**************************************************************************************************************
  Fields
  ***************************************************************************************************************/
  registeredObjects :Timeable[] = [];
  startTime:number;


  /**************************************************************************************************************
  Constructors
  ***************************************************************************************************************/
  private constructor(){
    this.startTime = Date.now();
  }

  /**************************************************************************************************************
  Getters
  ***************************************************************************************************************/
  getDeltaTime():number{
    return Date.now() - this.startTime;
  }
  getTimeSince(time:number):number{
    return Date.now() - time;
  }

  /**************************************************************************************************************
  Register
  ***************************************************************************************************************/
  register(): Timeable{
    let newTimeable = new Timeable( this.getDeltaTime());
    newTimeable.setUpdateFunction(this);
    this.registeredObjects.push(newTimeable);
    return newTimeable;
  }




}

