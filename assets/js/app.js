import {
    createQuestion,
    pregnantQuestionEl,
} from './DOM/DOM.js'

import { loadPage } from './functions/DOM-functions.js'

let questionsContainer = document.querySelector('.questions-container')
let pregnantQuestionList = document.querySelector('.pregnant-question--list')


loadPage()
// createQuestion(pregnantQuestionEl('alk2938aljdf->'))

export {
    questionsContainer,
    pregnantQuestionList,
}