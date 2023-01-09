import { 
    getElementByClass,
    setTextContent,
    getIndex,
    getTargetParent,
    getTargetChild,
    append,
} from "../../functions/functions.js"

import { 
    removeOptionItem,
    chooseCorrectOption,
} from "../../functions/DOM-functions.js"

import { answerInputOption, answerPreviewOption } from "../../DOM/DOM.js"
function questionInput(target, parent){
    let questionPreview = getElementByClass('.preview-mode .question-preview', parent)
    setTextContent(questionPreview, target.value)
}
function optionInput(target, parent){
    let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parent)
    let index = getIndex(getTargetParent(target, 'option-item'))
    setTextContent(optionsPreview.children[index].lastElementChild, target.value)
    console.log(index)
}
function answerSelection(target, parent){
    let optionItem = getTargetParent(target, 'option-item')
    let optionsInput = getElementByClass('.option-input', optionItem)
    let index = getIndex(getTargetParent(target, 'option-item'))
    chooseCorrectOption(parent, target)
}
function optionRemoval(target, parent){
    let index = getIndex(getTargetParent(target, 'option-item'))
    removeOptionItem(parent, target)
}
function addMoreOption(target, parent){
    let optionsInput = getElementByClass('.edit-mode .options', parent)
    let optName = getTargetChild(optionsInput, 'choose-answer').getAttribute('name')
    let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parent)
    append([
        [[answerInputOption(optName)], optionsInput],
        [[answerPreviewOption()], optionsPreview]
    ])
}

export {
    questionInput,
    optionInput,
    answerSelection,
    optionRemoval,
    addMoreOption,
}