import express, {Request, Response} from "express";

const app = express();

// Middleware to parse JSON Bodies
app.use(express.json());


app.get("/api/health", (req: Request, res:Response) => {
  return res.status(200).json({
    success: true,
    message: "Smart Link is working fine",
  })
})

export default app;