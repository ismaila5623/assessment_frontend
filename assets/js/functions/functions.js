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
function getElementByClass(className, parent = document){
    return parent.querySelector(className)
}
function removeChild(parent, childIndex){
    removeEl(parent.children[childIndex])
}


function randomKey(length = 15){
    return shuffle(length)
}
function shuffle(length){
    let len = 6
    let tempArr = []
    let finalRand = ''
    randomLowerLetters(len).forEach( rand => {
        tempArr.push(rand)
    })
    randomUpperLetters(len).forEach( rand => {
        tempArr.push(rand)
    })
    randomNumbers(len).forEach( rand => {
        tempArr.push(rand)
    })
    randomSymbols(len).forEach( rand => {
        tempArr.push(rand)
    })
    for(let i = 0; i<length; i++){
        finalRand += tempArr[getRandom(tempArr)]
    }
    tempArr = []
    return finalRand;
}
function randomLowerLetters(length){
    let arr = []
    for(let i = 0; i < length; i++){
        arr.push(generateRandom('letter-lower'))
    }
    return arr
}
function randomUpperLetters(length){
    let arr = []
    for(let i = 0; i < length; i++){
        arr.push(generateRandom('letter-upper'))
    }
    return arr
}
function randomNumbers(length){
    let arr = []
    for(let i = 0; i < length; i++){
        arr.push(generateRandom('number'))        
    }
    return arr
}
function randomSymbols(length){
    let arr = []
    for(let i = 0; i < length; i++){
        arr.push(generateRandom('symbol'))        
    }
    return arr;
}
function generateRandom(type){
    let letterLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let letterUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let symbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '/', '?', ',', '<', '.', '>', '[', '{', ']', '}']
    switch(type){
        case 'letter-lower':
            return letterLower[getRandom(letterLower)]
        case 'letter-upper':
            return letterUpper[getRandom(letterUpper)]
        case 'number':
            return num[getRandom(num)]
        case 'symbol':
            return symbol[getRandom(symbol)]
        default:
            console.log('type invalid')
    }
}
function getRandom(list){
    return Math.floor(Math.random()*list.length)
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
    removeChild,
    getElementByClass,
    randomKey,
}