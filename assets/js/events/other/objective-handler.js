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

import { entry } from "./new-question-handler.js"

function questionInput(target, parent){
    let questionPreview = getElementByClass('.preview-mode .question-preview', parent)
    setTextContent(questionPreview, target.value)
    entry.setQuestion(parent.dataset.id, target.value)
}
function optionInput(target, parent){
    let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parent)
    let index = getIndex(getTargetParent(target, 'option-item'))
    setTextContent(optionsPreview.children[index].lastElementChild, target.value)
    entry.setOption(parent.dataset.id, index, target.value)
}
function answerSelection(target, parent){
    let optionItem = getTargetParent(target, 'option-item')
    let optionInput = getElementByClass('.option-input', optionItem)
    let index = getIndex(getTargetParent(target, 'option-item'))
    chooseCorrectOption(parent, target)
    entry.setAnswer(parent.dataset.id, optionInput.value, index)
}
function optionRemoval(target, parent){
    let index = getIndex(getTargetParent(target, 'option-item'))
    removeOptionItem(parent, target)
    entry.removeOption(parent.dataset.id, index)
}
function addMoreOption(target, parent){
    let optionsInput = getElementByClass('.edit-mode .options', parent)
    let optName = getTargetChild(optionsInput, 'choose-answer').getAttribute('name')
    let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parent)
    append([
        [[answerInputOption(optName)], optionsInput],
        [[answerPreviewOption()], optionsPreview]
    ])
    entry.addOption(parent.dataset.id)
}

export {
    questionInput,
    optionInput,
    answerSelection,
    optionRemoval,
    addMoreOption,
}