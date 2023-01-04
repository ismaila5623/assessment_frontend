import { createQuestion,
    pregnantQuestionEl,
    theoryQuestionEl,
    objectiveQuestionEl,
    subjectiveQuestionEl,
    answerInputOption,
    answerPreviewOption,
    viewMode,
} from './DOM.js'

import {
    hide,
    show,
    getTargetParent,
    getTargetChild,
    setAttribute,
    removeAttribute,
    getIndex,
    setTextContent,
    removeEl,
    append,
    chooseCorrectOption,
    removeOptionItem,
    removeChild,
    getElementByClass,
    viewEditMode,
    viewPreviewMode,
} from './functions.js'

import { questionsContainer } from './app.js';

function questionSetup(e){
    e.preventDefault();
    hide([getTargetParent(e.target, 'setup')])
    show([questionsContainer])
}
function handleNewQuestionBtn(e){
    let select = getTargetChild(getTargetParent(e.target, 'add-question--container'), 'question-type--select')
    if(select.children[select.selectedIndex].value == 'single'){
        let parent = getTargetParent(e.target, 'pregnant-question--container') 
        if(parent.classList.contains('pregnant-question--container')){
            append([
                [[theoryQuestionEl()], getTargetChild(parent, 'pregnant-question--list')]
            ])
        }else{
            createQuestion(objectiveQuestionEl())
        }
    }else{
        createQuestion(pregnantQuestionEl())
    }
}
function handleTheory(target, parent){
    let questionPreview = getElementByClass('.preview-mode .question-preview', parent)
    let answerPreview = getElementByClass('.preview-mode .answer-preview', parent)
    if(target.classList.contains('question-input')){
        setTextContent(questionPreview, target.value)
    }else if(target.classList.contains('answer-textarea')){
        setTextContent(answerPreview, target.value)
    }
}
function handleObjective(target, parent){
    if(target.classList.contains('question-input')){
        let questionPreview = getElementByClass('.preview-mode .question-preview', parent)
        setTextContent(questionPreview, target.value)
    }else if(target.classList.contains('choose-answer')){
        chooseCorrectOption(parent, target)
    }else if(target.classList.contains('option-input')){
        let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parent)
        let index = getIndex(getTargetParent(target, 'option-item'))
        setTextContent(optionsPreview.children[index].lastElementChild, target.value)
    }else if(target.classList.contains('remove')){
        removeOptionItem(parent, target)
    }else if(target.classList.contains('add-more--opt')){
        let optionsInput = getElementByClass('.edit-mode .options', parent)
        let optionsPreview = getElementByClass('.preview-mode .answer-preview .options-preview', parent)
        append([
            [[answerInputOption()], optionsInput],
            [[answerPreviewOption()], optionsPreview]
        ])
    }
}
function handleSubjective(target, parent){
    if(target.classList.contains('question-input')){
        let questionPreview = getElementByClass('.preview-mode .question-preview', parent)
        setTextContent(questionPreview, target.value)
    }else if(target.classList.contains('option-input')){
        let answerPreview = getElementByClass('.preview-mode .answer-preview', parent)
        setTextContent(answerPreview, target.value)
    }
    console.log('subjective event')
}
function handlePregnantQuestion(target, parent){
    if(target.classList.contains('question-input')){
        let pregnantQuestionDesc = getElementByClass('.preview-mode .question-preview', getTargetParent(parent, 'view-mode'))
        setTextContent(pregnantQuestionDesc, target.value)
    }else if(target.classList.contains('from-input') || target.classList.contains('to-input')){
        let previewRangeDesc = getElementByClass('.preview-mode .answer-preview', getTargetParent(parent, 'view-mode'))
        let previewRangeItem = previewRangeDesc.querySelectorAll('strong')
        if(target.classList.contains('from-input')){
            setTextContent(previewRangeItem[0], target.value)
        }else{
            setTextContent(previewRangeItem[1], target.value)
        }
    }else if(target.classList.contains('question-img--input')){
        let pregnantQuestionImg = getElementByClass('.preview-mode .pregnant-question--img', getTargetParent(parent, 'view-mode'))
        let fileReader = new FileReader()
        fileReader.readAsDataURL(target.files[0])
        fileReader.onload = function(){
            pregnantQuestionImg.src = fileReader.result
        }
    }
}
function handleQuestion(e){
    let parent;
    if(!e.target.classList.contains('choose-answer')){
        e.preventDefault();
    }
    if(getTargetParent(e.target, 'question').classList.contains('question')){
        parent = getTargetParent(e.target, 'question');
        console.log(parent)
        //handles single question
        switch(true){
            case e.target.classList.contains('save'):
                viewPreviewMode(parent)
                break;
            case e.target.classList.contains('edit'):
                viewEditMode(parent)                
                break;
            case e.target.classList.contains('preview'):
                viewPreviewMode(parent)
                break;
            case e.target.classList.contains('delete'):
                removeEl(parent)
                break;
            case e.target.classList.contains('q-type'):
                let selectedOpt = e.target.children[e.target.selectedIndex].value
                removeEl(getElementByClass('.view-mode', parent))
                parent.append(viewMode(selectedOpt))
                parent.classList.forEach( cls => {
                    if(cls != 'question'){
                        parent.classList.remove(cls) 
                    }
                });
                parent.classList.add(selectedOpt)
                hide([getElementByClass('.question-top .tools .edit', parent)])
                show([getElementByClass('.question-top .tools .preview', parent)])
                break;
            case parent.classList.contains('theory'):
                handleTheory(e.target, parent)
                break;
    
            case parent.classList.contains('objective'):
                handleObjective(e.target, parent)
                break;
    
            case parent.classList.contains('subjective'):
                handleSubjective(e.target, parent)
                break;
        }
        console.log('non-pregnant--question event handler')
        }else{
            //handles tools events for pregnant question
            parent = getTargetParent(e.target, 'pregnant-question--container');
            if(getTargetParent(e.target, 'tools').classList.contains('tools')){
                if(e.target.classList.contains('save')){

                }else if(e.target.classList.contains('edit')){
                    viewEditMode(parent)
                }else if(e.target.classList.contains('preview')){
                    viewPreviewMode(parent)
                }else if(e.target.classList.contains('delete')){
                    removeEl(parent)
                }
            }else{
                //other pregnant question events excluding tools events
                handlePregnantQuestion(e.target, getElementByClass('.view-mode .pregnant-question--form', parent))
            }
        }
}

export {
    questionSetup,
    handleNewQuestionBtn,
    handleQuestion,
}