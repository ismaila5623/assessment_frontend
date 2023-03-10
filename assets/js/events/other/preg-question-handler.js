import { 
    setTextContent,
    getElementByClass,
    getTargetParent
} from "../../functions/functions.js"
import { entry } from "./new-question-handler.js"

function descriptionInput(target, parent){
    let pregnantQuestionDesc = getElementByClass('.preview-mode .question-preview', getTargetParent(parent, 'view-mode'))
    setTextContent(pregnantQuestionDesc, target.value)
    entry.setDescription(parent.dataset.id, target.value)
}

function questionRangeInput(target, parent){
    let previewRangeDesc = getElementByClass('.preview-mode .answer-preview', getTargetParent(parent, 'view-mode'))
    let previewRangeItem = previewRangeDesc.querySelectorAll('strong')
    if(target.classList.contains('from-input')){
        setTextContent(previewRangeItem[0], target.value)
        entry.setRangeStart(parent.dataset.id, target.value)
    }else{
        setTextContent(previewRangeItem[1], target.value)
        entry.setRangeEnd(parent.dataset.id, target.value)
    }
}
function pregnantQuestionImg(target, parent){
    let pregnantQuestionImg = getElementByClass('.preview-mode .pregnant-question--img', getTargetParent(parent, 'view-mode'))
    let fileReader = new FileReader()
    fileReader.readAsDataURL(target.files[0])
    fileReader.onload = function(){
        pregnantQuestionImg.src = fileReader.result
    }
}

export {
    descriptionInput,
    questionRangeInput,
    pregnantQuestionImg,
}