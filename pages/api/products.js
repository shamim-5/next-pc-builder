const { MongoClient, ServerApiVersion } = require("mongodb");
const { DB_USERNAME, DB_PASS } = process.env;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASS}@cluster0.7vfzqgg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  try {
    await client.connect();
    const productCollection = client.db("next_pc_builder").collection("products");

    if (req.method === "GET") {
      const products = await productCollection.find({}).toArray();
      res.send({ message: "success", status: 200, data: products });
    }

    if (req.method === "POST") {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.json(result);
    }
  } finally {
    //  await client.close();
  }
}

export default run;
