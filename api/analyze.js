export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    return res.status(200).json({ result: data[0] });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
