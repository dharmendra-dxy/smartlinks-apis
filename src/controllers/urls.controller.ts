import 'dotenv/config';

import { Request, Response } from "express";
import { generateUniqueShortId, readUrls, writeUrls } from "../utils/urls";


const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

/* 
-------------------------
@get
Get All urls
-------------------------
*/

export const getAllUrls = (req: Request, res: Response) => {
  const urls = readUrls();
  
  // Transform data for better readability
  const urlList = Object.entries(urls).map(([shortId, longUrl]) => ({
    shortId,
    shortUrl: `${BASE_URL}/${shortId}`,
    longUrl
  }));
  
  res.json({
    count: urlList.length,
    urls: urlList
  });
};

/* 
------------------------- 
@post
generate new redirections
---------------------------
*/

export const generateRedirection = (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  // Read existing URLs and generate unique shortId:
  const urls = readUrls();
  const shortId = generateUniqueShortId(urls);

  // Save mapping
  urls[shortId] = url;
  writeUrls(urls);

  // Return response
  res.status(201).json({
    shortId,
    shortUrl: `${BASE_URL}/${shortId}`,
    longUrl: url,
  });
};
