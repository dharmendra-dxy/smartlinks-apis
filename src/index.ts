import app from "./app";

const PORT = 3000;

app.listen(PORT, ()=> {
  console.log(`The server is running at : http://localhost:${PORT}`);
})