import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import MOBILE_PHONE_FIELD from '@salesforce/schema/Lead.MobilePhone';
import FIRST_NAME_FIELD from '@salesforce/schema/Lead.FirstName';
import sendMessage from '@salesforce/apex/LeadWhatsUpCntrl.sendMessage';

const fields = [MOBILE_PHONE_FIELD, FIRST_NAME_FIELD];


export default class LeadWhatsUpMessenger extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: '$recordId', fields })
    lead;

    messageBody;
    key;
    channelId;
    showStatus;
    messageStatus;
    showSpinner;
    mobilePhone;

    renderedCallback() {
        this.messageBody = 'Hi ' + getFieldValue(this.lead.data, FIRST_NAME_FIELD);
        this.mobilePhone = getFieldValue(this.lead.data, MOBILE_PHONE_FIELD);
    }

    get defaultMessage() {
        return 'Hi ' + getFieldValue(this.lead.data, FIRST_NAME_FIELD);
    }

    handleMessageChange(event) {
        this.messageBody = event.target.value;
        console.log('this.messageBody ' + this.messageBody);
    }

    handleKeyChange(event) {
        this.key = event.target.value;
    }

    handleChannelIDChange(event) {
        this.channelId = event.target.value;
    }

    handleSend(){

        this.showSpinner = true;

        sendMessage({accessKey: this.key, channelId: this.channelId,
                                toNumber : this.mobilePhone,
                                msgBody : this.messageBody})
                    .then(result => {
                        this.messageStatus = result
                        this.showStatus = true;
                        this.showSpinner = false;

                    })
                    .catch(error => {
                        this.messageStatus = 'Error happened';
                        this.showStatus = true;
                        this.showSpinner = false;
                    });
    }


}