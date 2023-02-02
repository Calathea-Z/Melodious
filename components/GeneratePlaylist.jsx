import { useState } from "react";

export default function GeneratePlaylist() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bands: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setUserInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <main className={styles.main}>
        <h6>Enter in a prompt</h6>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="ex. - Atmospheric, Purple, Mountainside, Down-tempo"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate Suggestions" />
        </form>
        <div>{result}</div>
      </main>
    </div>
  );
}
