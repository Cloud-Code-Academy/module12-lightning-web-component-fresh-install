import { LightningElement, api } from 'lwc';

export default class ScoreInformation extends LightningElement {

    @api score = 99;
    @api attemptId;
    @api numberOfQuestions;

    get numberOfQuestionsCorrect(){

        return Math.floor((this.score / 100) * this.numberOfQuestions);
    }

    get numberOfQuestionsIncorrect(){

        return this.numberOfQuestions - this.numberOfQuestionsCorrect;
    }

    handleDeleteAttempt(){

        console.log('handleDeleteAttempt', this.attemptId);

        //events generally always are lowercase and have zero spaces inbetween
        const deleteEvent = new CustomEvent('deleteattempt',{
            detail: this.attemptId
        }); 

        // to send the event up to the Parent use the dispatchEvent method
        this.dispatchEvent(deleteEvent);  
    }
}