import {
    getTargetParent,
    removeEl,
    getElementByClass,
 } from '../functions/functions.js'
import { viewEditMode, viewPreviewMode } from '../functions/DOM-functions.js';

import {
    descriptionInput,
    questionRangeInput,
    pregnantQuestionImg,
} from './other/preg-question-handler.js'

import { 
    questionInput as questionInputTheory,
    answerInput as answerInputTheory,
} from './other/theory-handler.js';

import { 
    addMoreOption, 
    answerSelection, 
    optionInput, 
    optionRemoval, 
    questionInput as questionInputObj
} from './other/objective-handler.js';

import { 
    questionInput as questionInputSubj,
    answerInput as answerInputSubj
} from './other/subjective-handler.js';
import { newQuestion } from './other/new-question-handler.js';
import { questionType } from './other/others.js';


//handles add new question button
function handleNewQuestionBtn(e){
    newQuestion(e)
}
//handles theory
function handleTheory(target, parent){
    switch(true){
        case target.classList.contains('question-input'):
            questionInputTheory(target, parent)
        break;
        case target.classList.contains('answer-textarea'):
            answerInputTheory(target, parent)
        break;
    }
}
//handles objective
function handleObjective(target, parent){
    switch(true){
        case target.classList.contains('question-input'):
            questionInputObj(target, parent)
            break;
        case target.classList.contains('choose-answer'):
            answerSelection(target, parent)
            break;    
        case target.classList.contains('option-input'):
            optionInput(target, parent)    
            break;
        case target.classList.contains('remove'):
            optionRemoval(target, parent)
            break;    
        case target.classList.contains('add-more--opt'):
            addMoreOption(target, parent)
            break;
    }
}
//handles subjective
function handleSubjective(target, parent){
    switch(true){
        case target.classList.contains('question-input'):
            questionInputSubj(target,parent)
        break;
        case target.classList.contains('option-input'):
            answerInputSubj(target, parent)
        break;
    }
}
//handles pregnant-question
function handlePregnantQuestion(target, parent){
    if(target.classList.contains('question-input')){
        descriptionInput(target, parent)
    }else if(target.classList.contains('from-input') || target.classList.contains('to-input')){
        questionRangeInput(target, parent)
    }else if(target.classList.contains('question-img--input')){
        pregnantQuestionImg(target, parent)
    }
}
//MAIN HANDLER
function handleQuestion(e){
    let parent;
    if(!e.target.classList.contains('choose-answer')){
        e.preventDefault();
    }if(e.target.classList.contains('submit-btn')){

    }else if(getTargetParent(e.target, 'question').classList.contains('question')){
        parent = getTargetParent(e.target, 'question');
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
                questionType(e.target, parent)
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
    handleNewQuestionBtn,
    handleQuestion,
}