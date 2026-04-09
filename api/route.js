// api/route.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/cycling-regular",
      {
        method: "POST",
        headers: {
          "Authorization": process.env.ORS_API_KEY, // API key buradan okunacak
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          coordinates: [
            [30.5592, 36.5983], // Kemer
            [30.7262, 36.9634]  // Varsak
          ]
        })
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server fetch failed" });
  }
}
