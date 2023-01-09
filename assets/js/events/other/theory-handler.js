import { 
    setTextContent,getElementByClass
} from "../../functions/functions.js"


function questionInput(target, parent){
    let questionPreview = getElementByClass('.preview-mode .question-preview', parent)
    setTextContent(questionPreview, target.value)
}
function answerInput(target, parent){
    let answerPreview = getElementByClass('.preview-mode .answer-preview', parent)
    setTextContent(answerPreview, target.value)
}


export {
    questionInput,
    answerInput
}