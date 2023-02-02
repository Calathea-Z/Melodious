import { useState } from "react";

export default function GeneratePlaylist() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState([]);

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
      const responseToFormat = data.result
      console.log(responseToFormat)
      const formattedResponse = responseToFormat.split('~');
      console.log(formattedResponse);
      setResult(formattedResponse);
      setUserInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }
  console.log("End Product", result)

  return (
    <div>
      <main className='p-5 fles'>
        <h6 className='text-greeen'>Enter in a prompt</h6>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="ex. - Atmospheric, Purple, Mountainside, Down-tempo"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input className='text-greeen' type="submit" value="Generate Suggestions" />
        </form>
        {/* <div className='text-greeen flex p-2 text-3xl font-bold'>{result}</div> */}
        <div className='text-greeen px-8 flex flex-col space-y-1 pb-28'>
          {result?.map((result, index) => (
              <div key={index}>
                 <ul>{result}</ul>
              </div>
          ))}
      </div>
      </main>
    </div>
  );
}
