'strict'
const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('express')();
const Mongodb = require('mongodb').MongoClient;

const port = 5000;
const DBname = 'myDB';
const CollectionName = "users";
const connectionString = 'mongodb://127.0.0.1:27017';
const pr = console.log;

//const client = new Mongodb(connectionString);
//app.use(bodyParser.json());
app.use(cors());
app.param('email', (req, res, next, email) => {

    req.email = email;
    next();
})


//create new user
app.post('/users/:email', async (req, res) => {

    await Mongodb.connect(connectionString, async (err, client) => {
        if (err) res.send("Error");
        else {

            if (req.email && req.body.name && req.body.phone) {



                const users = client.db(DBname).collection(CollectionName);
                const x = await users.findOne({ email: req.email }, { _id: 0 });
                pr(x)
                if (x === null) {


                    const x = await (await users.insertOne({ name: req.body.name, email: req.email, phone: req.body.phone })).acknowledged;
                    if (x == true)
                        res.send(`user with email ${req.email} created successfully `);
                    else res.send('unsuccessfull')

                } else res.send("User aleady exists ");



            } else res.send("Error >> To create new user \nURL must contain email \nBody must contain name and phone fields");


        }

        client.close();
    });


});
//Get a specific user
app.get('/users/:email', async (req, res) => {


    await Mongodb.connect(connectionString, async (err, client) => {
        if (err) res.send("Error");
        else {

            const users = client.db(DBname).collection(CollectionName);
            const x = await users.findOne({ email: req.email }, { _id: 0 });
            res.send(x);

        }

        client.close();
    });

});


//update a specific user
app.put('/users/:email', (req, res) => {

    //pr(req.email);

    if (req.body) {
        if (req.body.name || req.body.phone) {

            Mongodb.connect(connectionString, async (err, client) => {
                if (err) res.send("Error");
                else {

                    const users = client.db(DBname).collection(CollectionName);
                    let fields = 0;

                    let response = "";
                    if (req.body.name) {
                        fields++;
                        const x = await (await users.updateOne({ email: req.email }, { $set: { name: req.body.name } })).modifiedCount;
                        if (x !== 0) response += "name updated successfully \n";
                        else response += "name : unsuccessfull update  \n";

                    }
                    if (req.body.phone) {
                        fields++;
                        const x = await (await users.updateOne({ email: req.email }, { $set: { phone: req.body.phone } })).modifiedCount;
                        if (x !== 0) response += "phone updated successfully \n";
                        else response += "phone : unsuccessfull update  \n";

                    }
                    res.send(response);

                }

                client.close();
            });


        } else res.send("Unsuccessfull update");

    }

});

//delete a specific user
app.delete('/users/:email', (req, res) => {

    if (req.email) {

        Mongodb.connect(connectionString, async (err, client) => {
            if (err) res.send("Error");
            else {

                const users = client.db(DBname).collection(CollectionName);
                const x = await users.deleteOne({ email: req.email }, { _id: 0 });

                res.send('Successfull');

            }

            client.close();
        });


    } else {
        res.send('URL must contain email');
    }
});
//Get all users
app.get('/users', (req, res) => {


    Mongodb.connect(connectionString, async (err, client) => {
        if (err) res.send("Error");
        else {

            const users = client.db(DBname).collection(CollectionName);
            const x = await users.find({}, { _id: 0 }).toArray();
            res.send(x);

        }

        client.close();
    });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
