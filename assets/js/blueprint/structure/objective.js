import { Question } from "./question.js";

export class Objective extends Question{
    constructor(parent = null){
        super(1, parent)
        this.optionLength = 4
        this.options = new Array(this.optionLength)
    }
    setOption(index, value){
        if(this.getAnswerIndex() == index){
            this.setAnswer(value, index)
        }
        this.options[index] = value
    }
    removeOption(index){
        this.options[index] = undefined
        this.optionLength--
        this.reposition(index)
    }
    getOptions(){
        return this.options
    }
    numOfOptions(){
        return this.optionLength;
    }
    addOption(){
        // this.reposition()
        let i = 0
        while(i < this.options.length){
            if(this.options[i] == undefined){
                break;
            }
            i++
        }
        if(this.options[i] != undefined){
            this.options.push(undefined)
        }
        this.optionLength++
    }
    setAnswer(answer, index){
        super.setAnswer(answer)
        this.setAnswerIndex(index)
    }
    setAnswerIndex(index){
        this.answerIndex = index
    }
    getAnswerIndex(){
        return this.answerIndex
    }
    reposition(indx){
        //moves every other value one-step to the left starting from the index
        let i = indx
        while(i < this.options.length){
            this.options[i] = this.options[i+1]
            i++
        }
        //this method moves all undefined values to the right side and non-undefined to the left side with their orders maintained
        // let i = 1;
        // let j = 0;
        // while(i <= this.options.length){
        //     if(this.options[i] != undefined && this.options[j] == undefined){
        //         let temp = this.options[j]
        //         this.options[j] = this.options[i]
        //         this.options[i] = temp
        //         j++
        //         i++
        //     }
        //     if(this.options[i] == undefined && this.options[j] == undefined){
        //         i++
        //     }
        //     if((this.options[i] != undefined && this.options[j] != undefined) || (this.options[i] == undefined && this.options[j] != undefined)){
        //         j++
        //         i++
        //     }
        // }
    }
}