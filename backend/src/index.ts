import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const bodyParser = require('body-parser');
const pdf = require('html-pdf');

const facturePdfTemplate = require('../documents/facture')
const devisPdfTemplate = require('../documents/devis')

// const PDFDocument = require('pdfkit');
// const blobStream = require('blob-stream');
dotenv.config();
import { addPdfGenereted , getPdfGenereteds, deletePdfGenereted} from "../database";
var cors = require('cors')
const fs = require('fs');

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// function generateurFacture() {
//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream('devis.pdf'));

//     // Ajouter les champs de texte interactifs pour le devis
//     doc.fontSize(12).text('Client:', 100, 100);
//     doc.rect(200, 85, 200, 20).stroke();
//     doc.fontSize(12).text('Date:', 100, 150);
//     doc.rect(200, 135, 200, 20).stroke();
//     doc.fontSize(12).text('Montant:', 100, 200);
//     doc.rect(200, 185, 200, 20).stroke();

//     // Finaliser le document PDF
//     doc.end();

//     // Sauvegarder le document sur le disque
// }

//  function generateurDevis( ) {
//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream('facture.pdf'));

//     // Ajouter les champs de texte interactifs pour la facture
//     doc.fontSize(12).text('Client:', 100, 100);
//     doc.rect(200, 85, 200, 20).stroke();
//     doc.fontSize(12).text('Date:', 100, 150);
//     doc.rect(200, 135, 200, 20).stroke();
//     doc.fontSize(12).text('Numéro de facture:', 100, 200);
//     doc.rect(200, 185, 200, 20).stroke();
//     doc.fontSize(12).text('Montant:', 100, 250);
//     doc.rect(200, 235, 200, 20).stroke();

//     // Finaliser le document PDF
//     doc.end();

//     // Sauvegarder le document sur le disque
//  }

app.get("/", async (req: Request, res: Response) => {
    
    const pdfs = await getPdfGenereteds()

    res.json(pdfs)
});

app.post("/add", (req: Request, res: Response) => {
//     const PDFDocument = require('pdfkit');

// const doc = new PDFDocument();

// doc.pipe(fs.createWriteStream('output.pdf'));

// doc

// .fontSize(25)
//   .text('Some text with an embedded font!', 100, 100);

// doc
//   .addPage()
//   .fontSize(25)
//   .text('Here is some vector graphics...', 100, 100);

// doc
//   .save()
//   .moveTo(100, 150)
//   .lineTo(100, 250)
//   .lineTo(200, 250)
//   .fill('#FF3300');

// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();

// doc
//   .addPage()
//   .fillColor('blue')
//   .text('Here is a link!', 100, 100)
//   .underline(100, 100, 160, 27, { color: '#0000FF' })
//   .link(100, 100, 160, 27, 'http://google.com/');

// doc.end();

if (req.body.type === "Facture") {

    pdf.create(facturePdfTemplate(req.body), {}).toFile(`${__dirname}/resultat.pdf`, (err:any) => {
        if(err) {
            res.send(Promise.reject());
        }
        console.log(`${__dirname}/resultat.pdf`);
        addPdfGenereted(req.body.type,"Default")
    
        res.send(Promise.resolve());
    })

} else {
    pdf.create(devisPdfTemplate(req.body), {}).toFile( `${__dirname}/resultat.pdf`, (err:any) => {
    if(err) {
        res.send(Promise.reject());
    }
    console.log(`${__dirname}/resultat.pdf`);

    addPdfGenereted(req.body.type,"Default")
    res.send(Promise.resolve());
    console.log("ok");
})
}

;
});


app.get('/getPdf', (req, res) => {
    console.log(`${__dirname}/resultat.pdf`);
    
    res.sendFile(`${__dirname}/resultat.pdf`)
})

 app.delete("/:id", async (req: Request, res: Response) => {
    try {
        deletePdfGenereted(req.params.id)
        res.json({succes : true})
    } catch (error) {
        res.json({succes : false, error})
    }
    
});
app.listen(port, () => {
    
  console.log(`go go go on http://localhost:${port}`);
});