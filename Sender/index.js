const express = require('express')
const app = express();
const amqp = require("amqplib");
var channel, connection;


//Establishing Connection with amqp server
connect();
async function connect(){
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("rabbit");
    }catch(err){
        console.log(err);
    }
}

app.get("/send",async (req, res) => {
    //Sample data
    const data = {
        name : "abc",
        company : "tesla"
    };

    //Sending Message To Queue
    await channel.sendToQueue("rabbit",Buffer.from(JSON.stringify(data)));
    // await channel.close();
    // await connection.close();
    return res.send("Done");
})

app.listen(5001, () => {
    console.log(`Server running at 5001`);
});


//How to Run
// node index.js
