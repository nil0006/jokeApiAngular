import { Component, ElementRef, ViewChild } from '@angular/core';
import { JokeService } from './joke.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  @ViewChild('button') button!: ElementRef;
  title = 'jokeApi';
  public voices:any=[]
  jokeData: any;
  constructor(private joke:JokeService){
    
    let utterance = new SpeechSynthesisUtterance("wanna listen to some jokes ?");
    utterance.pitch=3
    speechSynthesis.speak(utterance);
  }
  speak(speech:any,text:string){
    this.jokeData=text
    speechSynthesis.speak(speech)
     }
  tellJoke(res:any){
    let setup = new SpeechSynthesisUtterance (res.setup)
    setup.pitch=3
    let punchLine = new SpeechSynthesisUtterance (res.punchline)
    punchLine.pitch=3
    setup.addEventListener('start',(e)=>{
      this.button.nativeElement.disabled=true;
      
    })
    setup.addEventListener('end',(event)=>{
      setTimeout(()=>{
        this.speak(punchLine,res.punchline)
       }, 1000);
    })
   this.speak(setup,res.setup)
   punchLine.addEventListener('end',(event)=>{
    this.button.nativeElement.disabled=false;
    this.jokeData=''
   })
   
  }
  public getJoke(){
    this.joke.getJoke().subscribe((res:any)=>{
      if(res){
        this.tellJoke(res)
      }
    })
  }
  
}