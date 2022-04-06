import * as React from 'react';
import { Document, Packer } from "docx";
import { saveAs } from "file-saver";
import * as fs from "fs";
// class RedocxComponent extends Component {
//     render() {
//         return (
//             <div>
//                 <Document>
//                     <Text>Hello World</Text>
//                 </Document>
//             </div>
//         );
//     }
// }

// var unoconv = require('unoconv');

const RedocxComponent = () => {
    const saveDocumentToFile = (doc, fileName) => {
        const packer = new Packer();
        const mimeType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        packer.toBlob(doc).then(blob => {
            const docblob = blob.slice(0, blob.size, mimeType);
            saveAs(docblob, fileName);
        });
    }

    const generateWordDocument = (event) => {
        event.preventDefault();
        let doc = new Document();
        doc.createParagraph(`Hello World`);
        saveDocumentToFile(doc, "New Document.docx");
    }

    // const pdfFile = new File('/home/harsha/Downloads/billWithWhiteBAckAndHighDenImage.pdf');
    // console.log('pdfFile', pdfFile);
    //
    // const convert = () => {
    //
    //     unoconv.convert(pdfFile, 'docx', function (err, result) {
    //         // result is returned as a Buffer
    //         fs.writeFile('converted.docx', result);
    //     });
    // }

    console.log('SSSSSSSSSSSSS');

    return (
        <div className="App">
            <p>Hello</p>
            <button onClick={generateWordDocument}>Generate Word Document</button>
            {/*<button onClick={convert}>Convert</button>*/}
        </div>
    );
}

// render(<RedocxComponent />, `${__dirname}/example.docx`)

export default RedocxComponent;
