import { Question } from "./question.js";

export class Theory extends Question{
    constructor(parent = null){
        super(1, parent)
    }
}