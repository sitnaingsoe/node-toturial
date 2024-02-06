import express, {Request, Response, text} from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  const method = req.method;
  console.log(req.url);
  const data = fs.readFileSync("data.json");
  res.send(data);
});

app.post("/", (req: Request, res: Response) => {
  const method = req.method;
  console.log(req.url);
  const reqData = req.body;
  const existData = fs.readFileSync("data.json").toString();
  const existArray = JSON.parse(existData);
  const newArray = [...existArray, reqData];
  console.log(newArray);
  const newfile = fs.writeFileSync("data.json", JSON.stringify(reqData));
  res.send("your file is updated");
});
app.put("/", (req: Request, res: Response) => {
  const method = req.method;
  res.send(method);
});
app.delete("/", (req: Request, res: Response) => {
  const method = req.method;
  const {filename} = req.query;
  console.log(filename);
//  fs.unlink(filename as string, (error) => {
//    if (error) throw error;
//    console.log("file error");
//  });
  res.send("file deleted");
});

app.listen(PORT, () => console.log(`Server started listening on: ${PORT}`));
