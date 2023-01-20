import { 
    getElementByClass,
    setTextContent
} from "../../functions/functions.js"
import { entry } from "./new-question-handler.js"

function questionInput(target,parent){
    let questionPreview = getElementByClass('.preview-mode .question-preview', parent)
    setTextContent(questionPreview, target.value)
    entry.setQuestion(parent.dataset.id, target.value)
}
function answerInput(target, parent){
    let answerPreview = getElementByClass('.preview-mode .answer-preview', parent)
    setTextContent(answerPreview, target.value)
    entry.setAnswer(parent.dataset.id, target.value)
}

export {
    questionInput,
    answerInput,
}