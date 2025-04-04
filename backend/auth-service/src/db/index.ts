import express from "express";
import { createUser } from "db/user";


const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await createUser(username, email, password);
  res.json(user);
});

app.listen(3001, () => console.log("Auth service running on 3001"));
