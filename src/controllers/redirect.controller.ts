import { Request, Response } from "express";
import { readUrls } from "../utils/urls";


/* 
-------------------------
@get
redirect: shortUrl --> largeUrl
---------------------------
*/
export const redirectUls = (req: Request, res: Response) => {
  const { id } = req.params;

  if (id.length !== 6) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  // Read URLs
  const urls = readUrls();

  // Check if short ID exists
  const longUrl = urls[id];

  if (!longUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  // Redirect to long URL
  res.redirect(longUrl);
};
