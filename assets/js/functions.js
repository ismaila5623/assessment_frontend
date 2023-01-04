/* ------------------ HELPER METHODS - BEGIN ------------------*/
function addClass(elements, classes){
    for(let i = 0; i<elements.length; i++){
        setAttribute(elements[i], 'class', classes[i])
    }
}
function setAttribute(el, key, value){
    el.setAttribute(key, value)
}
function removeAttribute(el, key){
    el.removeAttribute(key)
}
function append(list){
    for(let i = 0; i<list.length; i++){
        for(let j = 0; j < list[i].length; j++){
            if(j == 0){
                for(let k = 0; k < list[i][j].length; k++){
                    list[i][1].append(list[i][j][k])
                }
            }else{
                break;
            }
        }
    }
}
function show(elements){
    elements.forEach(element => {
        element.classList.remove('hidden')
    });
}
function hide(elements){
    elements.forEach(element => {
        element.classList.add('hidden')
    });
}
function getTargetParent(el, parentClass){
    let element = el
    while(!element.classList.contains(parentClass)){
        if(element.classList.contains('page')){
            break;
        }
        element = element.parentElement;
    }
    return element;
}
function getTargetChild(el, childClass){
    let element = el
    let queue = []
    queue.push(el)
    while(queue.length > 0){
        let current = queue.pop()
        if(current.classList.contains(childClass)){
            element = current
            break;
        }
        if(current.children.length > 0){
            for(let i = 0; i<current.children.length; i++){
                queue.push(current.children[i])
            }
        }
    }
    queue = []
    return element;
}

function addEvents(elements){
    elements.forEach( element => {
        element.el.addEventListener(element.type, element.handler)
    })
}

function getIndex(el){
    for(let i = 0; i < el.parentElement.children.length; i++){
        if(el.parentElement.children[i] == el){
            return i;
        }
    }
    return -1;
}
function setTextContent(el, value){
    el.textContent = value
}
function removeEl(el){
    el.remove()
}
//dom functions
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
function removeChild(parent, childIndex){
    removeEl(parent.children[childIndex])
}
function getElementByClass(className, parent = document){
    return parent.querySelector(className)
}
function viewEditMode(parent){
    show([getElementByClass('.view-mode .edit-mode', parent), getElementByClass('.question-top .tools .preview', parent)])
    hide([getElementByClass('.view-mode .preview-mode', parent), getElementByClass('.question-top .tools .edit', parent)])
}
function viewPreviewMode(parent){
    show([getElementByClass('.view-mode .preview-mode', parent), getElementByClass('.question-top .tools .edit', parent)])
    hide([getElementByClass('.view-mode .edit-mode', parent), getElementByClass('.question-top .tools .preview', parent)])
}
/* ---------------- HELPER METHODS - END ------------ */

export {
    addClass,
    setAttribute,
    removeAttribute,
    append,
    show,
    hide,
    getTargetParent,
    getTargetChild,
    addEvents,
    getIndex,
    setTextContent,
    removeEl,
    chooseCorrectOption,
    removeOptionItem,
    removeChild,
    getElementByClass,
    viewEditMode,
    viewPreviewMode,
}