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

    let singlePreg = getTargetChild(e.target.parentElement, 'single-preg')
    if(singlePreg.children[singlePreg.selectedIndex].value == 'pregnt'){
        createQuestion(pregnantQuestionEl(key))
    }else{
        let qType = getTargetChild(e.target.parentElement, 'q-type')
        let selected = qType.children[qType.selectedIndex].value
        let parent = getTargetParent(e.target, 'pregnant-question--container') 
        if(parent.classList.contains('pregnant-question--container')){
            let questionList = getTargetChild(parent, 'pregnant-question--list')
            let question;
            if(selected == 'theo'){
                question = theoryQuestionEl(key)
            }else if(selected == 'obj'){
                question = objectiveQuestionEl(key)
            }else if(selected == 'subj'){
                question = subjectiveQuestionEl(key)
            }
            append([
                [[question], questionList]
            ])
        }else{
            if(selected == 'theo'){
                createQuestion(theoryQuestionEl(key))
            }else if(selected == 'obj'){
                createQuestion(objectiveQuestionEl(key))
            }else if(selected == 'subj'){
                createQuestion(subjectiveQuestionEl(key))
            }
        }
    }
}

export {
    newQuestion
}