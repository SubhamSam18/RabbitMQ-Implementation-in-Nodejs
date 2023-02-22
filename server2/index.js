const express = require('express')
const app = express();
const amqp = require("amqplib");
var channel, connection;

connect();
async function connect(){
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("rabbit");

        //Retrieving Data from RabbitMQ
        channel.consume("rabbit",data =>{
            console.log(`Recieved ${Buffer.from(data.content)}`);
            channel.ack(data);
        });
    }catch(err){
        console.log(err);
    }
}


app.listen(5002, () => {
    console.log(`Server running at 5002`);
});

//How to Run
// node index.js
