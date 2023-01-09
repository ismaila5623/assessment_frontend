import { 
    removeEl,
    getElementByClass,
    hide,
    show
} from "../../functions/functions.js";

import { 
    viewMode
} from "../../DOM/DOM.js";


function questionType(target, parent){
    let selectedOpt = target.children[target.selectedIndex].value
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
}

export {
    questionType
}