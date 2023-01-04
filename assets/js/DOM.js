import {
    questionSetup,
    handleNewQuestionBtn,
    handleQuestion
} from './event-handler.js'

import { addClass, setAttribute, append, addEvents } from './functions.js'
import { questionsContainer, pregnantQuestionList} from './app.js';

function loadPage(){
    questionsContainer.append(addNewQuestionButton())    
}
function createQuestion(type){
    let questionContainer = questionsContainer.lastElementChild;
    questionsContainer.insertBefore(type, questionContainer)
}


// add new question button
function addNewQuestionButton(qType = ''){
    let addQuestionContainer = document.createElement('div')
    let questionTypeContainer = document.createElement('div')
    let questionTypeLabel = document.createElement('span')
    let questionTypeSelect = document.createElement('select')
    let addQuestionSymbol = document.createElement('div')

    // addQuestionSymbol.addEventListener('click', handleNewQuestionBtn)
    addEvents([
        {
            el:addQuestionSymbol,
            type: 'click',
            handler: handleNewQuestionBtn
        }
    ])
    // addQuestionSymbol.addEventListener('click', handleNewQuestionBtn)

    questionTypeLabel.textContent = 'q type?'

    let options = []

    if(qType == 'pregnant-question'){
        options = [
            {value : "single", text: 'single'},
        ]
    }else{
        options = [
            {value : "single", text: 'single'},
            {value : "pregnant", text: 'pregnant'}
        ]
    }

    for(let i = 0; i<options.length; i++){
        let opt = document.createElement('option')
        opt.value = options[i].value
        opt.textContent = options[i].text
        questionTypeSelect.append(opt)
    }

    addClass(
        [
            addQuestionContainer, questionTypeContainer, 
            questionTypeLabel, questionTypeSelect, addQuestionSymbol
        ],
        [
            'add-question--container', 'question-type--container',
            'question-type--label', 'question-type--select', 'add-question--symbol'
        ]
    )

    append([
        [[questionTypeLabel, questionTypeSelect], questionTypeContainer],
        [[questionTypeContainer, addQuestionSymbol], addQuestionContainer]
    ])

    return addQuestionContainer;
}
/* --------------- PREGNANT QUESTION CREATION - BEGIN -----------*/
function pregnantQuestionEl(){
    let pregnantQuestionContainer = document.createElement('div')
    let pregnantQuestionList = document.createElement('div')

    addClass(
        [pregnantQuestionContainer, pregnantQuestionList],
        ['pregnant-question--container', 'pregnant-question--list']
    )

    append([
        [
            [
                setupPregnantQuestion(), pregnantQuestionList, 
                addNewQuestionButton('pregnant-question')
            ], 
            pregnantQuestionContainer
        ]
    ])

    return pregnantQuestionContainer;
}

function setupPregnantQuestion(){
    let type = 'pregnant-question'
    let pregnantQuestionSetupContainer = document.createElement('div')

    addClass([pregnantQuestionSetupContainer], ['pregnant-question--setup-container'])

    append([
        [[questionTop(type), viewMode(type)], pregnantQuestionSetupContainer]
    ])

    return pregnantQuestionSetupContainer;
}
function editModePregnantQ(){
    let editMode = document.createElement('form')
    let pregnantQuestionBottom = document.createElement('div')
    let questionImgInput = document.createElement('input')
    let questionRangeContainer = document.createElement('div')
    let rangeDescLabel = document.createElement('span')
    let range = document.createElement('div')
    let fromContainer = document.createElement('div')
    let fromLabel = document.createElement('span')
    let fromNumber = document.createElement('input')
    let toContainer = document.createElement('div')
    let toLabel = document.createElement('span')
    let toNumber = document.createElement('input')

    setAttribute(questionImgInput, 'type', 'file')
    setAttribute(fromNumber, 'type', 'number')
    setAttribute(toNumber, 'type', 'number')

    rangeDescLabel.textContent = '(set question Start and End)'
    fromLabel.textContent = 'from'
    toLabel.textContent = 'to'

    addClass(
        [
            editMode, pregnantQuestionBottom, questionImgInput, 
            questionRangeContainer, rangeDescLabel, range, fromContainer,
            fromLabel, fromNumber, toContainer, toLabel, toNumber
        ],
        [
            'form pregnant-question--form edit-mode', 'pregnant-question--bottom',
            'question-img--input', 'question-range--container',
            'range-desc--label', 'range', 'from-container', 'from-label',
            'from-input', 'to-container', 'to-label', 'to-input'
        ]
    )

    append([
        [[fromLabel, fromNumber], fromContainer],
        [[toLabel, toNumber], toContainer],
        [[fromContainer, toContainer], range],
        [[rangeDescLabel, range], questionRangeContainer],
        [[questionImgInput, questionRangeContainer], pregnantQuestionBottom],
        [[questionInputContainer(), pregnantQuestionBottom], editMode]
    ])

    addEvents([
        {el:fromNumber, type:'change', handler:handleQuestion},
        {el:toNumber, type:'change', handler:handleQuestion},
        {el:questionImgInput, type:'change', handler:handleQuestion}
    ])

    return editMode;
}

function previewModePregnantQ(){
    let previewMode = document.createElement('div')
    let pregnantQuestionImg = document.createElement('img')
    let answerPreview = document.createElement('p')

    // setAttribute(pregnantQuestionImg, 'src', './assets/images/sample.png')
    answerPreview.innerHTML = `from question <strong>(-)</strong> to <strong>(-)</strong>`

    addClass(
        [previewMode, pregnantQuestionImg, answerPreview],
        ['preview-mode hidden', 'pregnant-question--img', 'answer-preview answer-preview--text']
    )

    append([
        [[pregnantQuestionImg, questionPreviewText(), answerPreview], previewMode]
    ])

    return previewMode;
}
/* --------------- PREGNANT QUESTION CREATION - END ---------------*/


/* ---------------- THEORY QUESTION CREATION - BEGIN ------------ */
function theoryQuestionEl(){
    let question = document.createElement('div')
    
    addClass(
        [question],
        ['question theory']
    )
    append([
        [[questionTop(), viewMode('theory')], question]
    ])

    return question;
}

function editModeTheory(){
    let editMode = document.createElement('form')
    let answerInputContainer = document.createElement('div')
    let answerTextarea = document.createElement('textarea')

    setAttribute(answerTextarea, 'placeholder', 'type your answer here')
    setAttribute(answerTextarea, 'cols', '30')
    setAttribute(answerTextarea, 'rows', '10')

    addClass(
        [editMode, answerInputContainer, answerTextarea],
        ['form question-form edit-mode', 'answer-input--container', 'answer-textarea']
    )
    append([
        [[answerTextarea], answerInputContainer],
        [[questionInputContainer(), answerInputContainer], editMode],
    ])

    addEvents([
        {el: answerTextarea, type: 'keyup', handler: handleQuestion},
    ])


    return editMode;
}
function previewModeTheory(){
    let previewMode = document.createElement('div')
    let answerPreview = document.createElement('p')

    // answerPreview.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor est, nam explicabo voluptas sequi ut!'

    addClass(
        [previewMode, answerPreview],
        ['preview-mode hidden', 'answer-preview answer-preview--text']
    )
    append([
        [[questionPreviewText(), answerPreview], previewMode]
    ])

    return previewMode;
}
/* ---------------- THEORY QUESTION CREATION - END ------------ */


/* ---------------- OBJECTIVE & SUBJECTIVE QUESTION CREATION - BEGIN ------------ */
// objective
function objectiveQuestionEl(){
    let question = document.createElement('div')
    
    addClass(
        [question],
        ['question objective']
    )
    append([
        [[questionTop('objective'), viewMode('objective')], question]
    ])

    return question;
    
}

function answerInputObjective(){
    let options = document.createElement('ul')    

    addClass(
        [options],
        ['options']
    )

    for(let i = 0; i<4; i++){
        append([
            [[answerInputOption()], options]
        ])
    }

    return options
}

function answerInputOption(){
    let optionItem = document.createElement('li')
    let chooseAnswer = document.createElement('input')
    let optionInput = document.createElement('input')
    let remove = document.createElement('span')

    setAttribute(chooseAnswer, 'type', 'radio')
    setAttribute(chooseAnswer, 'name', 'correct-answer')
    setAttribute(optionInput, 'type', 'text')
    setAttribute(optionInput, 'placeholder', 'option')

    remove.textContent = 'x'

    addClass(
        [optionItem, chooseAnswer, optionInput, remove],
        ['option-item', 'choose-answer', 'option-input', 'remove']
    )

    append([
        [[chooseAnswer, optionInput, remove], optionItem],
    ])

    addEvents([
        {el: chooseAnswer, type: 'click', handler: handleQuestion},
        {el: optionInput, type: 'keyup', handler: handleQuestion},
        {el: remove, type: 'click', handler: handleQuestion},
    ])

    return optionItem;
}

function answerPreviewObjective(){
    let optionsPreview = document.createElement('ul')

    addClass(
        [optionsPreview],
        ['options-preview objective-options--preview']
    )

    for(let i = 0; i<4; i++){
        append([
            [[answerPreviewOption()], optionsPreview]
        ])
    }

    return optionsPreview;
}

function answerPreviewOption(){
    let optionPreviewItem = document.createElement('li')
    let optionPreviewCheckbox = document.createElement('input')
    let optionPreviewText = document.createElement('p')

    setAttribute(optionPreviewCheckbox, 'type', 'checkbox')
    setAttribute(optionPreviewCheckbox, 'disabled')

    // optionPreviewText.textContent = 'HyperText Markup Language'

    addClass(
        [optionPreviewItem, optionPreviewCheckbox, optionPreviewText],
        ['option-preview--item', 'option-preview--checkbox', 'option-preview--text answer-preview--text']
    )

    append([
        [[optionPreviewCheckbox, optionPreviewText], optionPreviewItem],
    ])

    return optionPreviewItem;
}
// subjective
function subjectiveQuestionEl(){
    let question = document.createElement('div')
    
    addClass(
        [question],
        ['question subjective']
    )
    append([
        [[questionTop('subjective'), viewMode('subjective')], question]
    ])

    return question;
}
function answerInputSubjective(){
    let options = document.createElement('ul')    

    addClass(
        [options],
        ['options']
    )

    for(let i = 0; i<1; i++){
        let optionItem = document.createElement('li')
        let chooseAnswer = document.createElement('input')
        let optionInput = document.createElement('input')

        setAttribute(chooseAnswer, 'type', 'radio')
        // setAttribute(chooseAnswer, 'name', 'correct-answer')
        setAttribute(optionInput, 'type', 'text')
        setAttribute(optionInput, 'placeholder', 'answer')
        setAttribute(chooseAnswer, 'checked')

        addClass(
            [optionItem, chooseAnswer, optionInput],
            ['option-item', 'choose-answer', 'option-input']
        )

        append([
            [[chooseAnswer, optionInput], optionItem],
            [[optionItem], options]
        ])

        addEvents([
            {el: chooseAnswer, type: 'click', handler: handleQuestion},
            {el: optionInput, type: 'keyup', handler: handleQuestion},
        ])
    }

    return options
}
function answerPreviewSubjective(){
    let optionsPreview = document.createElement('ul')

    addClass(
        [optionsPreview],
        ['options-preview objective-options--preview']
    )

    for(let i = 0; i<1; i++){
        let optionPreviewItem = document.createElement('li')
        let optionPreviewCheckbox = document.createElement('input')
        let optionPreviewText = document.createElement('p')

        setAttribute(optionPreviewCheckbox, 'type', 'checkbox')
        setAttribute(optionPreviewCheckbox, 'disabled')
        setAttribute(optionPreviewCheckbox, 'checked')

        // optionPreviewText.textContent = 'HyperText Markup Language'

        addClass(
            [optionPreviewItem, optionPreviewCheckbox, optionPreviewText],
            ['option-preview--item', 'option-preview--checkbox', 'option-preview--text answer-preview--text']
        )


        append([
            [[optionPreviewCheckbox, optionPreviewText], optionPreviewItem],
            [[optionPreviewItem], optionsPreview]
        ])
    }

    return optionsPreview;
}
// re-usable functions (objective & subjective only)
function editModeObjective(type = ''){
    let editMode = document.createElement('div')
    let answerInputContainer = document.createElement('div')

    addClass(
        [editMode, answerInputContainer],
        ['form question-form edit-mode', 'answer-input--container']
    )

    append([
        [[type == 'subjective' ? answerInputSubjective() : answerInputObjective()], answerInputContainer],
        [[questionInputContainer(), answerInputContainer], editMode]
    ])

    if(type != 'subjective'){
        let addOption = document.createElement('a')

        setAttribute(addOption, 'href', '')

        addClass([addOption], ['add-more--opt'])

        addOption.textContent = 'add more opts'

        append([
            [[addOption], answerInputContainer],
        ])

        addEvents([
            {el: addOption, type: 'click', handler: handleQuestion},
        ])
    }

    return editMode;
}
function previewModeObjective(type = ''){
    let previewMode = document.createElement('div')
    let answerPreview = document.createElement('div')

    addClass(
        [previewMode, answerPreview],
        ['preview-mode hidden', 'answer-preview']
    )


    append([
        [[type == 'subjective' ? answerPreviewSubjective() : answerPreviewObjective()], answerPreview],
        [[questionPreviewText(), answerPreview], previewMode]
    ])

    return previewMode;
}
/* ---------------- OBJECTIVE & SUBJECTIVE QUESTION CREATION - END ------------ */

/* ------------- re-usable functions - THEORY, OBJECTIVE & SUBJECTIVE -------------- */
function questionTop(type = ''){
    let questionTop = document.createElement('div')

    if(type == 'objective' || type == 'subjective'){
        let selectContainer = document.createElement('div')
        let qType = document.createElement('select')

        addClass([selectContainer, qType], ['select-container', 'q-type'])
        let options = []
        if(type == 'objective'){
            options = [
                {value : "objective", text: 'objective'},
                {value : "subjective", text: 'subjective'}
            ]
        }else{
            options = [
                {value : "subjective", text: 'subjective'},
                {value : "objective", text: 'objective'}
            ]
        }

        for(let i = 0; i<options.length; i++){
            let opt = document.createElement('option')
            opt.value = options[i].value
            opt.textContent = options[i].text
            qType.append(opt)
        }

        addEvents([
            {el: qType, type: 'change', handler: handleQuestion},
        ])

        selectContainer.append(qType)
        questionTop.append(selectContainer)
    }

    if(type != 'pregnant-question'){
        let qNumber = document.createElement('span')
        qNumber.textContent = '1'

        addClass(
            [qNumber],
            ['q-number']
        )
        append([
            [[qNumber], questionTop],
        ])
    }


    addClass(
        [questionTop],
        ['question-top']
    )
    append([
        [[tools()], questionTop],
    ])

    return questionTop;
}
function tools(){
    let tools = document.createElement('div')
    let save = document.createElement('span')
    let edit = document.createElement('span')
    let preview = document.createElement('span')
    let del = document.createElement('span')

    save.textContent = 'save'
    edit.textContent = 'edit'
    preview.textContent = 'preview'
    del.textContent = 'delete'

    addClass(
        [tools, save, edit, preview, del],
        ['tools', 'save', 'edit hidden', 'preview', 'delete']
    )
    append([
        [[save, edit, preview, del], tools], 
    ])

    addEvents([
        {el: save, type: 'click', handler: handleQuestion},
        {el: edit, type: 'click', handler: handleQuestion},
        {el: preview, type: 'click', handler: handleQuestion},
        {el: del, type: 'click', handler: handleQuestion},
    ])

    return tools;
}
function viewMode(qType){
    let viewMode = document.createElement('div')

    addClass(
        [viewMode],
        ['view-mode']
    )
    if(qType == 'theory'){
        append([
            [[editModeTheory(), previewModeTheory()], viewMode]
        ])
    }else if(qType == 'objective'){
        append([
            [[editModeObjective(), previewModeObjective()], viewMode]
        ])
    }else if(qType == 'subjective'){
        append([
            [[editModeObjective(qType), previewModeTheory(qType)], viewMode]
        ])
    }else if(qType == 'pregnant-question'){
        append([
            [[editModePregnantQ(), previewModePregnantQ()], viewMode]
        ])
    }

    return viewMode;
}

function questionInputContainer(){
    let questionInputContainer = document.createElement('div')
    let questionInput = document.createElement('input')

    setAttribute(questionInput, 'type', 'text')
    setAttribute(questionInput, 'placeholder', 'type your question here')

    addClass(
        [questionInputContainer, questionInput],
        ['question-input--container', 'question-input']
    )

    append([
        [[questionInput], questionInputContainer]
    ])

    addEvents([
        {el: questionInput, type: 'keyup', handler: handleQuestion},
    ])

    return questionInputContainer;
}
function questionPreviewText(){
    let questionPreview = document.createElement('p')

    // questionPreview.textContent = 'What is HTML?'

    addClass(
        [questionPreview],
        ['question-preview']
    )

    return questionPreview;
}


export {
    loadPage,
    createQuestion,
    pregnantQuestionEl,
    theoryQuestionEl,
    objectiveQuestionEl,
    subjectiveQuestionEl,
    answerInputOption,
    answerPreviewOption,
    viewMode,
}