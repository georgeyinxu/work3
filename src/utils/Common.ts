import axios from "axios";

const short = (addr?: string) => {
  if (!addr) return null;

  return `${addr.slice(0, 5)}…${addr.slice(-4)}`;
};

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

export { short, fetchLocations, fetchJobTypes };
