import express, { Response, Request } from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()

app.use(cors());
app.use(bodyParser.json());

const port = 4000

let lists: any[] = [];

app.post("/save", (req: Request, res: Response) => {
    console.log(req.body)
    lists = req.body.lists
    return res.json({ success: true })
})

app.get("/load", (req: Request, res: Response) => res.json({ lists }))

app.listen(port, () =>
    console.log(`Backend running on http://localhost:${port}!`)
)
