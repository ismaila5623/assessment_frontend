import {
    loadPage,
    createQuestion,
    pregnantQuestionEl,
} from './DOM.js'

let questionsContainer = document.querySelector('.questions-container')
let pregnantQuestionList = document.querySelector('.pregnant-question--list')

loadPage()
createQuestion(pregnantQuestionEl())

export {
    questionsContainer,
    pregnantQuestionList,
}