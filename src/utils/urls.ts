import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/urls.json');


// Type for URL mapping
export interface UrlMapping {
  [shortId: string]: string;
}

// Read URLs from JSON file
export function readUrls(): UrlMapping {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log("Unable to read data :", error);
    return {};
  }
}

// Write URLs to JSON file
export function writeUrls(urls: UrlMapping): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(urls, null, 2));
}


// Generate a unique 6-character short ID
export function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortId = '';
  
  for (let i = 0; i < 6; i++) {
    shortId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return shortId;
}

// Generate a unique short ID that doesn't already exist
export function generateUniqueShortId(existingUrls: UrlMapping): string {
  let shortId: string;
  
  do {
    shortId = generateShortId();
  } while (existingUrls[shortId]);
  
  return shortId;
} 