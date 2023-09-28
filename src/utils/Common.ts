import axios from "axios";
import { basename } from "path";

const short = (addr?: string) => {
  if (!addr) return null;

  return `${addr.slice(0, 5)}…${addr.slice(-4)}`;
};

const formatFileName = (url: string) => {
  if (!url) return null;

  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;
  const filename = basename(pathname);
  
  return filename;
} 
const fetchLocations = async () => {
  const res = await axios.get("/api/location");
  const locations = res.data.data;

  return locations;
};

const fetchJobTypes = async () => {
  const res = await axios.get('/api/jobType');
  const jobTypes = res.data.data;

  return jobTypes;
}

export { short, formatFileName, fetchLocations, fetchJobTypes };
