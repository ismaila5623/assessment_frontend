export class PregnantQuestion{

    constructor(){
        this.questions = {}
        this.questionRange = {from:-1, to:-1}
        this.reserve = -1
        this.isMoved = false
    }
    setDescription(desc){
        this.description = desc
    }
    getDescription(){
        return this.description
    }
    setImage(img){
        this.image = img
    }
    getImage(){
        return this.image
    }
    setQuestionRange(from, to){
        this.setRangeStart(from)
        this.setRangeEnd(to)
    }
    getQuestionRange(){
        return this.questionRange
    }
    setRangeStart(from){
        this.questionRange.from = from
    }
    getRangeStart(){
        return this.questionRange.from
    }
    setRangeEnd(to){
        this.questionRange.to = to
    }
    getRangeEnd(){
        return this.questionRange.to
    }
    addQuestion(qId, entry){
        this.questions[qId] = entry.questions[qId]
    }
    getQuestions(){
        return this.questions
    }
}