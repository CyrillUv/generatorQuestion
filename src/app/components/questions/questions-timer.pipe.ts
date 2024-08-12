import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: "questionsTimer",
  standalone:true
})


export class QuestionsTimerPipe implements PipeTransform {
  transform(count:number): string {
    let min = '00';
    let sec = '00'
    if(count<10){
      sec ='0'+count
    }
    if((count<=60&&count>=10)){
      sec =count+''
    }
    if(count>=60){
      min = '0'+Math.floor((count/60))
      sec = +count-(+min*60)+''
    }
    if(+sec<10){
      sec = '0'+(+count-(+min*60))
    }
    if(+min>=10){
      min = ''+Math.floor((count/60))
    }
    return `${min}:${sec} `;
  }

}
