const config = require(`../config.json`);


module.exports = {

    watsonAssistant: async function(AssistantV1, IamAuthenticator, message) {

        const assistant = new AssistantV1({
            authenticator: new IamAuthenticator({ apikey: config.ASSISTANT_APIKEY }),
            url: config.ASSISTANT_URL,
            version: '2019-02-01'
          });
          
          let watson = await assistant.message({
            workspaceId: config.SkillID,
            input: {'text': message.content},
            headers: {
              'Custom-Header': 'custom',
              'Accept-Language': 'custom'
            }
          })
            .then( async response => {
                // console.log(JSON.stringify(response.result, null, 2));
                return response.result;
            })
            .catch(err => {
                console.log('error: ', err);
            });
        
        // console.log("WATSON: ", watson.output.text[0]);
        return watson.output.text[0];
    },


    watsonTradutor: async function(LanguageTranslatorV3, IamAuthenticator, message) {
      
      const languageTranslator = new LanguageTranslatorV3({
        authenticator: new IamAuthenticator({ apikey: config.TRADUTOR_API_KEY }),
        url: config.TRADUTOR_URL,
        version: '2018-05-01',
      });
      
      let watson = await languageTranslator.translate(
        {
          text: message.content,
          source: 'en',
          target: 'pt-BR'
        })
        .then(response => {
          // console.log(JSON.stringify(response.result, null, 2));
          return response.result;
        })
        .catch(err => {
          console.log('error: ', err);
          let msgErr = `Tradutor Error: \`\`\`${err}\`\`\``;
          return msgErr;
        });

        return watson.translations[0].translation;
        
    }

}