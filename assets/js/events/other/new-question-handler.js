import { 
    randomKey,
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

import { Entry } from '../../blueprint/entry.js';

let entry = new Entry()

function newQuestion(e){
    //generate random string for each question container
    let key = ''
    key = randomKey()

    if(key in entry.questions || key.startsWith('UNDEFINED-')){
        console.log('try again')
    }else{
        let singlePreg = getTargetChild(e.target.parentElement, 'single-preg')
        if(singlePreg.children[singlePreg.selectedIndex].value == 'pregnt'){
            //creates a pregnant question
            createQuestion(pregnantQuestionEl(key))
            entry.createQuestion(key, 'pregnant-question')
            console.log(entry.getQNumbers())
        }else{
            let qType = getTargetChild(e.target.parentElement, 'q-type')
            let selected = qType.children[qType.selectedIndex].value
            let parent = getTargetParent(e.target, 'pregnant-question--container') 
            if(parent.classList.contains('pregnant-question--container')){
                //creates single question under pregnant question
                let questionList = getTargetChild(parent, 'pregnant-question--list')
                let question;
                if(selected == 'theo'){
                    question = theoryQuestionEl(key)
                    entry.createQuestion(key, 'theory', parent.dataset.id)
                    entry.addQuestion(parent.dataset.id, key)
                }else if(selected == 'obj'){
                    question = objectiveQuestionEl(key)
                    entry.createQuestion(key, 'objective', parent.dataset.id)
                    entry.addQuestion(parent.dataset.id, key)
                }else if(selected == 'subj'){
                    question = subjectiveQuestionEl(key)
                    entry.createQuestion(key, 'subjective', parent.dataset.id)
                    entry.addQuestion(parent.dataset.id, key)
                }
                append([
                    [[question], questionList]
                ])
                console.log(entry.getQNumbers())
            }else{
                //creates single questions only
                if(selected == 'theo'){
                    createQuestion(theoryQuestionEl(key))
                    entry.createQuestion(key, 'theory')
                }else if(selected == 'obj'){
                    createQuestion(objectiveQuestionEl(key))
                    entry.createQuestion(key, 'objective')
                }else if(selected == 'subj'){
                    createQuestion(subjectiveQuestionEl(key))
                    entry.createQuestion(key, 'subjective')
                }
                console.log(entry.getQNumbers())
            }
        }
    }
}

export {
    newQuestion,
    entry
}