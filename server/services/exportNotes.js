import 'node-self';
import * as quillToWord from 'quill-to-word';
import pkg from 'quill-to-pdf';
const { pdfExporter } = pkg;

const processDelta = async function (delta, purpose) {
    if(delta && purpose === 'docx') {
        try {
            const quillToWordConfig = {
                exportAs: 'blob'
            };

            // console.log(quillToWord);
            const docAsBlob = await quillToWord.default.generateWord(delta, quillToWordConfig);
            return docAsBlob;        
        }
        catch(e) {
            console.error(`Kuch toh gadbad hai in async-function-processDelta docx ${e}`);
        }
    }
    else if(delta && purpose === 'pdf') {
        try {
            const quillToWordConfig = {
                exportAs: 'blob'
            };

            // console.log(quillToWord);
            const pdfBlob = await pdfExporter.generatePdf(delta);
            return pdfBlob;        
        }
        catch(e) {
            console.error(`Kuch toh gadbad hai in async-function-processDelta pdf ${e}`);
        }

    }
    else {
        console.error(`Galat purpose bhejing`);
    }
};

export {processDelta};