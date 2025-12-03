document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const text = document.getElementById("textInput").value.trim();
  const errorBox = document.getElementById("error");
  const resultBox = document.getElementById("result");

  errorBox.textContent = "";
  resultBox.innerHTML = "";

  if (!text) {
    errorBox.textContent = "Please enter some text.";
    return;
  }

  resultBox.innerHTML = "Analyzing...";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    if (data.error) {
      resultBox.innerHTML = "";
      errorBox.textContent = data.error;
      return;
    }

    resultBox.innerHTML = "<h3>Results:</h3>";
    data.result.forEach(emotion => {
      const item = document.createElement("p");
      item.textContent = `${emotion.label}: ${(emotion.score * 100).toFixed(2)}%`;
      resultBox.appendChild(item);
    });

  } catch (err) {
    errorBox.textContent = "Error connecting to server.";
  }
});
