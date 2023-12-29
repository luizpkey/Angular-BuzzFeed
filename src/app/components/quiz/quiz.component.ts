import { Component, OnInit } from '@angular/core';

import quizz_questions from '../../../assets/data/quizz_questions.json'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title:string="";
  questions:any[]=[]
  questionSelected:any

  answers:string[]=[]
  answerSelected:string=""

  questionIndex:number=0
  questionMaxIndex:number=0

  finished:boolean=false

  constructor() { }

  ngOnInit(): void {
    this.finished=false
    this.questionIndex=0
    this.title=quizz_questions.title
    this.questions=quizz_questions.questions
    this.questionSelected=this.questions[this.questionIndex]
    this.questionMaxIndex=this.questions.length
  }
  playerChoose(option:string){
    this.answers.push(option)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1
    if(this.questionMaxIndex>this.questionIndex){
      this.questionSelected=this.questions[this.questionIndex]
      this.questionSelected.options=this.shuffle(this.questionSelected.options)
    }else{
      this.finished=true
      const finalAnswer:string = await this.checkResult(this.answers)
      this.answerSelected=quizz_questions.results[ finalAnswer as keyof typeof quizz_questions.results]
    }
  }
  async checkResult(answers:string[]){
    const answersReduce = answers.filter(item=>item!="")
    const result = answersReduce.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item=>item===previous).length >
        arr.filter(item=>item===current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }

  shuffle(array:any[]) {
  var limit = array.length, atual, positionSubstitute;

  // While there remain elements to shuffle…
  while (limit) {

    // Pick a remaining element…
    positionSubstitute = Math.floor(Math.random() * limit--);

    // And swap it with the current element.
    atual = array[limit];
    array[limit] = array[positionSubstitute];
    array[positionSubstitute] = atual;
  }

  return array;
}
}

