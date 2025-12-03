export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const response = await fetch(
      "https://router.huggingface.co/j-hartmann/emotion-english-distilroberta-base",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: text,
          options: { use_cache: false }   // optional but recommended
        }),
      }
    );

    const data = await response.json();

    // HF router returns an error object sometimes
    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    return res.status(200).json({ result: data[0] });

  } catch (err) {
    return res.status(500).json({ error: "Server Error: " + err.message });
  }
}
