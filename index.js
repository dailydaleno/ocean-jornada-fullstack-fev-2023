//cria uma aplicação utilizando o pacote express
const express = require('express');
const app = express()

const { MongoClient, Collection, ObjectId } = require('mongodb');

//var de conexao com o BD
//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:S85d6xuFa1JmikJO@cluster0.ofxo8tg.mongodb.net/";
const DB_NAME = "ocean-bancodedados-09022023";

async function main(){

//Conexão com o BD
console.log("Conectando com o BD....");
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("BD conectado com sucesso!!!");

//Habilita uso do json. O que vier no body da requesição, está em JSON
app.use(express.json());

//----------------------------------------------------------------------------------
//Lista de dados
const itens = ["Daily", "Daleno", "Adelaide", "Alice", "Pedro"]

//Endpoint read all -> [GET]/item
app.get("/item", async function (req, res){
    const documentos = await collection.find().toArray();
    res.send(documentos);
})

//Endpoint read single by ID -> [GET]/item/:id
app.get("/item/:id", async function (req, res){
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id)});    
    res.send(item);
})

//pesquisando por nome n lista
//Endpoint read single by id -> [GET]/item/:id
app.get("/item/:nome", function(req, res){
    /*
    for(let i = 0; i < itens.length; i++){
        if(req.params.nome == itens[i]){
            res.send(itens[i]);
        }
    }
    res.send("Não encontrado");

    */
});

//----------------------------------------------------------------------------------

//insere dados em uma coleção
//Endpoint update -> [post]/item:id
app.post("/item", async function(req, res){
    //console.log(req.body); //pega o conteúdo do Json Content no body 
    const item = req.body;
    await collection.insertOne(item);   //insere dados no mongoDB dentro da coleção
    //itens.push(item.nome);
    //res.send("Item criado com sucesso");
    res.send(item); //mostra item inserido
});

//altera dados de um registro em uma coleção
//Endpoint delete -> [DELETE]/item

//aplicação ouvindo na porta
app.listen(3000)
console.log("servidor rodando em http://127.0.0.1:3000")
}

main();