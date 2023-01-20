import { Theory } from '../blueprint/structure/theory.js'
import { Objective } from '../blueprint/structure/objective.js'
import { Subjective } from '../blueprint/structure/subjective.js'
import { PregnantQuestion } from '../blueprint/structure/pregnant-question.js'

export class Entry{
    constructor(type){
        this.questions = {}
        this.type = type
        this.numOfQuestion = 0
        this.qNumbers = []
    }
    createQuestion(id, type, parent = null){
        if(type == 'theory'){
            this.questions[id] = {
                type: type,
                question: new Theory(parent)
            }
        }else if(type == 'objective'){
            this.questions[id] = {
                type: type,
                question: new Objective(parent)
            }
        }else if(type == 'subjective'){
            this.questions[id] = {
                type: type,
                question: new Subjective(parent)
            }
        }else if(type == 'pregnant-question'){
            this.questions[id] = {
                type: type,
                question: new PregnantQuestion()
            }
        }
        if(type != 'pregnant-question'){
            //adding single question inside a pregnant question
            if(this.questions[id].question.parent != null){
                let parent = this.questions[this.questions[id].question.parent]
                let index = parent.question.getRangeEnd()
                let reserve = parent.question.reserve
                //moves any question infront one-step forward if any inorder to add the newly added question
                if(index != this.numOfQuestion && parent.question.reserve == -1){
                    this.updateQNumbers(index, 'forward')
                }
                //uses reserve var to determine if a question preg-question has question(s) or not
                if(reserve >= 0){
                    parent.question.reserve = -1
                    this.questions[id].question.setQNoIndex(index)
                    this.qNumbers[index] = id
                }else{
                    this.questions[id].question.setQNoIndex(index)
                    this.qNumbers[index] = id
                    this.numOfQuestion++
                }
                //points randEnd one-step ahead to determine where the next question is going to start from
                this.questions[this.questions[id].question.parent].question.setRangeEnd(index + 1)
            }else{
                //adding single question that is not part of pregnant question
                this.questions[id].question.setQNoIndex(this.numOfQuestion)
                this.qNumbers[this.numOfQuestion] = id
                this.numOfQuestion++
            }
        }else{
            //adding pregnant question container
            this.questions[id].question.setQuestionRange(this.numOfQuestion, this.numOfQuestion)
            this.questions[id].question.reserve = this.numOfQuestion
            this.qNumbers[this.numOfQuestion] = `UNDEFINED-${id}`
            this.numOfQuestion++
         }
    }
    deleteQuestion(id){
        //deletes single question including questions part of a pregnant question
        if(this.questions[id].type != 'pregnant-question'){
            let index = this.questions[id].question.getQNoIndex()
            this.updateQNumbers(index, 'backward')
            this.numOfQuestion--
        }
        //deletes single question from a pregnant question (questions list from pregnant question)
        if(this.questions[id].question.parent != null){
            delete this.questions[this.questions[id].question.parent].question.questions[id]
        }
        //deletes all questions in pregnant-question when the pregnant question is deleted
        if(this.questions[id].type == 'pregnant-question'){
            //if preg-q has no questions it will remove it from qNumber list
            if(this.qNumbers[this.questions[id].question.getRangeStart()].startsWith('UNDEFINED-')){
                this.updateQNumbers(this.questions[id].question.getRangeStart(), 'backward')
                this.numOfQuestion--
            }
            Object.keys(this.questions[id].question.questions).forEach( key => { 
                this.deleteQuestion(key)
            })
        }
        //deletes the key from the questions container in entry class
        delete this.questions[id]
    }
    //updates questions when added or deleted by shifting forward or backward
    updateQNumbers(index, type){
        if(type == 'forward'){
            this.shiftForward(index)
        }else{
            this.shiftBackward(index)
        }
    }
    //shifts questions forward start from index
    shiftForward(index){
        let i = this.numOfQuestion
        while(i > index){
            this.qNumbers[i] = this.qNumbers[i-1]
            if(this.qNumbers[i].startsWith('UNDEFINED-')){
                    this.questions[this.qNumbers[i].slice(10)].question.setRangeStart(this.questions[this.qNumbers[i].slice(10)].question.getRangeStart() + 1)
                    this.questions[this.qNumbers[i].slice(10)].question.setRangeEnd(this.questions[this.qNumbers[i].slice(10)].question.getRangeEnd() +  1)

                    this.questions[this.qNumbers[i].slice(10)].question.reserve = i
            }else{
                this.questions[this.qNumbers[i]].question.setQNoIndex(i)
                if(this.questions[this.qNumbers[i]].question.parent != null){
                    if(this.questions[this.questions[this.qNumbers[i]].question.parent].question.isMoved == false){
                        this.questions[this.questions[this.qNumbers[i]].question.parent].question.setRangeStart(this.questions[this.questions[this.qNumbers[i]].question.parent].question.getRangeStart() +  1)
                        this.questions[this.questions[this.qNumbers[i]].question.parent].question.setRangeEnd(this.questions[this.questions[this.qNumbers[i]].question.parent].question.getRangeEnd() +  1)
                        this.questions[this.questions[this.qNumbers[i]].question.parent].question.isMoved = true
                    }
                    if(this.questions[this.questions[this.qNumbers[i]].question.parent].question.getRangeStart() == i){
                        this.questions[this.questions[this.qNumbers[i]].question.parent].question.isMoved = false
                    }
                }
            }
            i--
        }
    }
    //shifts questions backward starting from index
    shiftBackward(index){
        let i = index
        let updatePregnantQ = {}
        if(!this.qNumbers[i].startsWith('UNDEFINED-')){
            this.questions[this.qNumbers[i]].question.setQNoIndex(-1)
        }
        while(i < this.numOfQuestion){
            if(!this.qNumbers[i].startsWith('UNDEFINED-')){
                let parentId = this.questions[this.qNumbers[i]].question.parent
                if( parentId != null){
                    updatePregnantQ[parentId] = {visited:false}
                }
            }
            if(this.numOfQuestion - i <= 1){
                this.qNumbers[i] = undefined
                break;
            }
            this.qNumbers[i] = this.qNumbers[i+1]
            if(!this.qNumbers[i].startsWith('UNDEFINED-')){
                this.questions[this.qNumbers[i]].question.setQNoIndex(i)
            }else{
                this.questions[this.qNumbers[i].slice(10)].question.setRangeStart(this.questions[this.qNumbers[i].slice(10)].question.getRangeStart() - 1)
                this.questions[this.qNumbers[i].slice(10)].question.setRangeEnd(this.questions[this.qNumbers[i].slice(10)].question.getRangeEnd() - 1)
            }
            i++
        }
        Object.keys(updatePregnantQ).forEach( key => {
            if(updatePregnantQ[key].visited == false){
                this.updatePregnantQRange(key)
                updatePregnantQ[key].visited = true
            }
        })
        // this.updatePregnantQRange(i, updatePregnantQ)
    }
    getQNumbers(){
        return this.qNumbers;
    }
    getAllQuestion(){
        return this.questions
    }
    printAllQuestions(){
        let parentID = ''
        this.qNumbers.forEach( key => {
            if(key.startsWith('UNDEFINED-')){
                this.printDescription(key.slice(10))
            }else{
                if(this.questions[key].question.parent != null){
                    if(parentID != this.questions[key].question.parent){
                        this.printDescription(this.questions[key].question.parent)
                        parentID = this.questions[key].question.parent
                    }
                    this.printQuestion(key)
                    if(this.questions[key].type == 'objective'){
                        console.log(this.questions[key].question.getOptions())
                    }
                    this.printAnswer(key)
                }else{
                    this.printQuestion(key)
                    if(this.questions[key].type == 'objective'){
                        console.log(this.questions[key].question.getOptions())
                    }
                    this.printAnswer(key)
                }
            }
        })
    }
    updatePregnantQRange(key){
        this.questions[key].question.setRangeEnd(this.questions[key].question.getRangeEnd() - 1)
    }
    setDescription(id, value){
        this.questions[id].question.setDescription(value)
    }
    getDescription(id){
        return this.questions[id].question.getDescription()
    }
    setQuestionRange(from, to){
        this.setRangeStart(id, from)
        this.setRangeEnd(id, to)
    }
    setRangeStart(id, from){
        this.questions[id].question.setRangeStart(from)
    }
    setRangeEnd(id, to){
        this.questions[id].question.setRangeEnd(to)
    }
    addQuestion(parentID, childID){
        this.questions[parentID].question.addQuestion(childID, this)
    }
    setQuestion(id, value){
        this.questions[id].question.setQuestion(value)   
    }
    setAnswer(id, value, indx = -1){
        if(this.questions[id].type == 'objective'){
            this.questions[id].question.setAnswer(value, indx)
        }else{
            this.questions[id].question.setAnswer(value)
        }
    }
    addOption(id){
        this.questions[id].question.addOption()
    }
    numOfOptions(id){
        return this.questions[id].question.numOfOptions()
    }
    setOption(id, index, value){
        this.questions[id].question.setOption(index, value)
    }
    removeOption(id, index){
        this.questions[id].question.removeOption(index)
    }
    getQuestion(id){
        return this.questions[id].question.getQuestion()
    }
    getAnswer(id){
        return this.questions[id].question.getAnswer()
    }
    getOptions(id){
        return this.questions[id].question.getOptions()
    }
    printQAndA(id){
        this.printQuestion(id)
        this.printAnswer(id)
    }
    printDescription(id){
        console.log(this.questions[id].question.getDescription())
    }
    printQuestion(id){
        console.log(this.questions[id].question.getQuestion())
    }
    printAnswer(id){
        console.log(this.questions[id].question.getAnswer())
    }
}