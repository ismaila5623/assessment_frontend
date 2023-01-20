export class Question{
    constructor(ansLength, parent){
        this.ansLength = ansLength
        this.parent = parent
        this.qNoIndex = -1
        this.answers = new Array(this.ansLength)
    }
    setQuestion(question){
        this.question = question
    }
    getQuestion(){
        return this.question
    }
    setAnswer(answer){
        for(let i = 0; i<this.ansLength; i++){
            if(this.ansLength <= 1){
                this.answers[0] = answer
            }else{
                if(this.answers[i] == undefined){
                    this.answers[i] = answer
                    break;
                }
            }
        }
    }
    getAnswer(){
        return this.answers
    }
    setQNoIndex(index){
        this.qNoIndex = index
    }
    getQNoIndex(){
        return this.qNoIndex
    }
}

