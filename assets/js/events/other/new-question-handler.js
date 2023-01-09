import { 
    append,
    getTargetParent,
    getTargetChild
} from "../../functions/functions.js"

import { createQuestion,
    pregnantQuestionEl,
    theoryQuestionEl,
    objectiveQuestionEl,
    subjectiveQuestionEl,
} from '../../DOM/DOM.js'
import { questionsContainer } from '../../app.js';

function newQuestion(e){
    //generate random string for each question container
    let key = 'raldj-1eroa-91jerf-adlfj'
    let select = getTargetChild(getTargetParent(e.target, 'add-question--container'), 'question-type--select')
    if(select.children[select.selectedIndex].value == 'single'){
        let parent = getTargetParent(e.target, 'pregnant-question--container') 
        if(parent.classList.contains('pregnant-question--container')){
            let questionList = getTargetChild(parent, 'pregnant-question--list')
            let question = theoryQuestionEl(key)
            append([
                [[question], questionList]
            ])
        }else{
            createQuestion(objectiveQuestionEl(key))
        }
    }else{
        createQuestion(pregnantQuestionEl(key))
    }
}

export {
    newQuestion
}