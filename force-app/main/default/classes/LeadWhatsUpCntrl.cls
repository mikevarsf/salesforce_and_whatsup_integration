public with sharing class LeadWhatsUpCntrl {

    @AuraEnabled
    public static String sendMessage(String accessKey, String channelId, String toNumber, String msgBody){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://conversations.messagebird.com/v1/conversations/start');
        req.setMethod('POST');
        req.setHeader('Authorization', 'AccessKey ' + accessKey);
        req.setHeader('content-type' , 'application/json');
        req.setBody('{\n' +
                '      "to": "' + toNumber + '",\n' +
                '      "channelId": "' + channelId + '",\n' +
                '      "type": "text",\n' +
                '      "content":{"text": "' + msgBody + '"}\n' +
                '}');
        
        Http http = new Http();
        HTTPResponse res = http.send(req);

        return res.getStatusCode() + ' ' + res.getBody();
    }

}