import { Wave } from './Wave';
import { Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { TimeKeeper } from "./TimeKeeper";

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  requestId;

  timeKeeper : TimeKeeper;
  waves : Wave[] =[];
  x=0;
  y=0;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sizeCanvas();
  }
  // @HostListener('window:', ['$event'])
  // onScroll(event) {
  //   console.log("here");

  //   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  //   this.currentStyle = "style1";
  //   let section = document.getElementById("about-section");
  //   section.classList.remove("slide");
  //   if (winScroll >= window.innerHeight){

  //     section.classList.add("slide");
  //     this.currentStyle = "style2";
  //   }
  // }



  private ctx: CanvasRenderingContext2D;

  constructor(){

  }

  colorStyles = {
    style2: { bg:"#0b0c1011",fg:"#66fcf1"},
    style3: { bg:"#66fcf111",fg:"#0b0c10"},
    style4: { bg:"#0b0c1011",fg:"#66fcf1"},
    style1: { bg:"#66fcf111",fg:"#0b0c10"},
    // style3: { bg:"#6e665811",fg:"#ee4c7c"},
    // style4: { bg:"#ee4c7c11",fg:"#0b0c10"},


  }
  currentStyle = "style1";


  sizeCanvas(){
    this.waves = [];
    this.canvas.nativeElement.width=window.innerWidth;
    this.canvas.nativeElement.height=window.innerHeight;
    TimeKeeper.getInstance();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.moveTo(0,0);
    this.ctx.fillStyle = this.colorStyles[this.currentStyle]["fg"];
    this.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    for (let i = 0; i < 20; i++) {
      let wave = new Wave();
      wave.position = window.innerHeight/2;
      wave.maxHeight = (window.innerHeight/2) * Math.random();
      wave.maxWidth = window.innerWidth;
      wave.center = (window.innerWidth/4  * Math.random())  +(3 * window.innerWidth/8);
      wave.color=this.colorStyles[this.currentStyle]["fg"];
      wave.buildCurves(7);
      this.waves.push(wave);

    }
    this.singleFrame();
  }

  ngOnInit(): void {
    this.sizeCanvas();

  }
  ngAfterViewInit(){
    let div = document.getElementById("scroll-con");
    div.onscroll = (event)=>{

    this.currentStyle = "style1";
    let section = document.getElementById("about-section");
    section.classList.remove("slide");
    if (div.scrollTop >= window.innerHeight - 200){

      section.classList.add("slide");
      this.currentStyle = "style2";
    }
    if (div.scrollTop >= window.innerHeight*2 - 200){
      this.currentStyle = "style3";
    }
    if (div.scrollTop >= window.innerHeight*3 - 200){
      this.currentStyle = "style4";
    }
  }
  }

  singleFrame() {

    this.ctx.fillStyle = this.colorStyles[this.currentStyle]["bg"];
    this.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    for (let i = 0; i < this.waves.length; i++) {
      this.waves[i].draw(this.ctx);
      this.waves[i].color=this.colorStyles[this.currentStyle]["fg"];
    }
    requestAnimationFrame(this.singleFrame.bind(this));
  }
  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
  }

  pause(){
    cancelAnimationFrame(this.requestId);
  }
  play(){
    this.singleFrame();
  }




}
