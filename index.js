import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const essays = [];

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/" , (req , res) => {
    res.sendFile(__dirname + "/public/index.html");

})

app.get("/essays", (req, res) => {
    res.render("essays.ejs", { essays: essays });
});

app.get("/form", (req , res) => {
    const date = new Date();
    res.render("form.ejs" , {
        date : date.toDateString()
    }); 
    
});

app.post("/submit", (req, res) => {
    const { topic, essay } = req.body;
    const date = new Date().toDateString();
    essays.push({
        title: topic,
        date: date,
        content: essay
    });
    res.redirect("/essays");
});

app.get("/about" , (req , res) => {
    res.render("about.ejs");
})

app.get("/contact" , (req , res) => {
    res.render("contact.ejs");
})

app.get("/quotes" , (req , res) => {
    res.render("quotes.ejs");
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}.`);
})