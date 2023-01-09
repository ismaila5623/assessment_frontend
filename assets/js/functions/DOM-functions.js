import {
    getElementByClass,
    getIndex,
    removeChild,
    show,
    hide,
    setAttribute,
    removeAttribute,
    getTargetChild,
    getTargetParent,
    append
} from '../functions/functions.js'
import { 
    addNewQuestionButton,
    submitBtn,
} from '../DOM/DOM.js'
import { questionsContainer } from '../app.js'

//dom functions
function loadPage(){
    append([
        [[addNewQuestionButton(), submitBtn()], questionsContainer]
    ])
}

function chooseCorrectOption(parent, target){
    let optionsInput = getElementByClass('.edit-mode .options', parent)
    let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parent)
    let index = getIndex(getTargetParent(target, 'option-item'))
    for(let i = 0; i<optionsPreview.children.length; i++){
        removeAttribute(optionsInput.children[i].firstElementChild, 'checked')
        removeAttribute(optionsPreview.children[i].firstElementChild, 'checked')
    }
    setAttribute(optionsInput.children[index].firstElementChild, 'checked')
    setAttribute(optionsPreview.children[index].firstElementChild, 'checked')
}

function removeOptionItem(parentFilter, target){
    let optionsInput = getElementByClass('.edit-mode .options', parentFilter)
    let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parentFilter)
    let index = getIndex(getTargetParent(target, 'option-item'))
    removeChild(optionsInput, index)
    removeChild(optionsPreview, index)
}

function viewEditMode(parent){
    show([getElementByClass('.view-mode .edit-mode', parent), getElementByClass('.question-top .tools .preview', parent)])
    hide([getElementByClass('.view-mode .preview-mode', parent), getElementByClass('.question-top .tools .edit', parent)])
}
function viewPreviewMode(parent){
    show([getElementByClass('.view-mode .preview-mode', parent), getElementByClass('.question-top .tools .edit', parent)])
    hide([getElementByClass('.view-mode .edit-mode', parent), getElementByClass('.question-top .tools .preview', parent)])
}

export {
    loadPage,
    chooseCorrectOption,
    removeOptionItem,
    viewEditMode,
    viewPreviewMode,
}