import fetch from 'node-fetch';

export default async function handler(req,res){
  try{
    const ORS_KEY = process.env.ORS_API_KEY;
    const body = {
      coordinates:[[30.5592,36.5983],[30.7262,36.9634]],
      profile:"cycling-regular",
      format:"geojson"
    };

    const response = await fetch('https://api.openrouteservice.org/v2/directions/cycling-regular',{
      method:'POST',
      headers:{
        'Authorization': ORS_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if(!response.ok){
      const text = await response.text();
      console.error("ORS Error:", text);
      return res.status(500).send("ORS API hatası: " + text);
    }

    const data = await response.json();
    res.status(200).json(data.features[0].geometry);
  } catch(err){
    console.error("Route fetch error:", err);
    res.status(500).send("Server tarafında hata: "+err.message);
  }
}
