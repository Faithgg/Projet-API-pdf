import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const pdf = require('html-pdf');

const facturePdfTemplate = require('../templates/facture')
const devisPdfTemplate = require('../templates/devis')

dotenv.config();
import { addPdfGenereted , getPdfGenereteds, deletePdfGenereted} from "../database";
var cors = require('cors')

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Récupération des pdfs
app.get("/", async (req: Request, res: Response) => {
    
    const pdfs = await getPdfGenereteds()

    res.json(pdfs)
});

//Génération du PDF
app.post("/add", (req: Request, res: Response) => {

if (req.body.type === "Facture") {

    pdf.create(facturePdfTemplate(req.body), {}).toFile(`${__dirname}/doc/resultat.pdf`, (err:any) => {
        if(err) {
            res.send(Promise.reject());
        }
        
        addPdfGenereted(req.body.type,`Facture de ${req.body.name}`)
    
        res.send(Promise.resolve());
    })

} else {
    pdf.create(devisPdfTemplate(req.body), {}).toFile( `${__dirname}/doc/resultat.pdf`, (err:any) => {
    if(err) {
        res.send(Promise.reject());
    }
    addPdfGenereted(req.body.type,`Devis de ${req.body.name}`)
    res.send(Promise.resolve());
})
}

;
});

// Récupération du pdf
app.get('/getPdf', (req, res) => {    
    res.sendFile(`${__dirname}/doc/resultat.pdf`)
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