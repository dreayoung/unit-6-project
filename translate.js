
    console.log("new lang me")

    const {Translate} = require('@google-cloud/translate').v2;
    require('dotenv').config();

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});


const translateText = async (text, targetLanguage) => {

    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};

// let heading = document.getElementById("testL").innerText

translateText('welcome to watch party', 'fr')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
