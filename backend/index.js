const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express();
const port = 5000;

app.use(cors({
  origin: ["https://my-notebook-frontend.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  // Additional headers
  exposedHeaders: ["Access-Control-Allow-Origin"],
}));

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`my-notebook backend listening at http://localhost:${port}`)
})