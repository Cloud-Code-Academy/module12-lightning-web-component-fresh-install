import { LightningElement, track } from 'lwc';

const devFundWeight = 0.23;
const processAutoWeight = 0.30;
const userIntWeight = 0.25;
const testDebugWeight = 0.22;
const passingScore = 68;


export default class PlatformDevCertCalculator extends LightningElement {

    //individual sections
    devFundamentalScore = 50;
    processAutoScore =   50;
    userInterfaceScore = 50;
    testDebugDeployScore = 50;

    //list
    @track attemptHistory = [
        {Id: 1, Score: 50},
        {Id: 2, Score: 68},
        {Id: 3, Score: 70},
        {Id: 4, Score: 90},
    ];

    //final score
    certificationScore = 90;

    numberOfQuestions = 60;

    //conditional statment for template reactivity
    showResources = false;

    currentHistoryId = 0;

    showGoodJob = false;

    calculateScore(){

        let devFundWeightScore = this.devFundamentalScore * devFundWeight;
        let procAutoWeightScore = this.processAutoScore * processAutoWeight;
        let userIntWeightScore = this.userInterfaceScore * userIntWeight; 
        let devDebugWeightScore = this.testDebugDeployScore * testDebugWeight;


        this.certificationScore =   devFundWeightScore + 
                                    procAutoWeightScore + 
                                    userIntWeightScore + 
                                    devDebugWeightScore;

        this.showResouceIfFailed();  

        this.addAttemptHistory(this.certificationScore);                   
    }

    handleChange(event){
        console.log(event.target.name, event.target.value);

        const inputName = event.target.name;
        let value = Number(event.target.value)

            if (inputName === 'devFundamentals'){
                this.devFundamentalScore = value;
            } else if (inputName === 'processAuto'){
                this.processAutoScore = value;
            } else if (inputName === 'userInterface'){
                this.userInterfaceScore = value;
            } else if (inputName === 'testDebugDeploy'){
                this.testDebugDeployScore = value;
            }
        }
    
    showResouceIfFailed(score){
        if (this.certificationScore < passingScore) {
            this.showResources = true;
        } else{
            this.showResources = false; 
        }
        this.showGoodJob = !this.showResources;
    }

    addAttemptHistory(Score){

        this.currentHistoryId ++;

        const attempt =
            {
                Id: this.currentHistoryId, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt]   
    }
        
    deleteAttemptHandler(event){

        console.log('this is called from parent to handle delete', event.detail);

        let attemptId = event.detail;

        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);

        console.log('New attempt history' + this.attemptHistory);
    }

    connectedCallback(){
        this.currentHistoryId = this.attemptHistory.length;
    }
}