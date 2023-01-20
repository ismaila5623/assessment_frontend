import { Question } from "./question.js";

export class Subjective extends Question{
    constructor(parent = null){
        super(1, parent)
    }
}