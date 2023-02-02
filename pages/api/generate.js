import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured properly",
      },
    });
    return;
  }

  const bands = req.body.bands || "";
  if (bands.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid request",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(bands),
      temperature: 0.4,
      max_tokens: 150,
      n: 3,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(bands) {
  return `Please give me suggestions of new music to listen to in the form of a list of a max of five bands based on these words or feelings: ${bands}. Tell me where they are from also with the city and the country. Please include the squiggly line after each suggestion.
  1.(Artist 1) - two word summary - location ~

  2.(Artist 2 ) - two word summary - location ~

  3.(Artist 3 ) - two word summary - location ~

  only a short summary of each band three words max.
`;
}
