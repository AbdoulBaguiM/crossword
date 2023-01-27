import inquirer from "inquirer";
import elasticsearch from "elasticsearch";

// Create an Elasticsearch client
const client = new elasticsearch.Client({
  host: "http://localhost:9200", // Change to your Elasticsearch host
});

// Define the index and type to search
const index = "crossword";

// Search for a specific word
const searchWord = async (word) => {
  try {
    // Perform a search query
    const response = await client.search({
      index: index,
      body: {
        query: {
          match: {
            word: word,
          },
        },
      },
    });

    if (response.hits.total.value === 0) {
      console.log("No results found");
      return;
    }

    // Extract the word, definition, and clue from the search results
    const searchWord = response.hits.hits[0]._source.word;
    const definition = response.hits.hits[0]._source.definition;
    const clue = response.hits.hits[0]._source.clue;

    // Return the word, definition, and clue
    return {
      word: searchWord,
      definition: definition,
      clue: clue,
    };
  } catch (err) {
    console.log(err);
  }
};

const displayGrid = () => {
  const grid = [];
  const words = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  client
    .search({
      index: "crossword",
      body: {
        query: {
          match_all: {},
        },
        size: 100,
      },
    })
    .then(
      (response) => {
        response.hits.hits.forEach((hit) => {
          words.push(hit._source.word);
        });

        // create an empty grid with a specific size
        for (let i = 0; i < 15; i++) {
          grid[i] = [];
          for (let j = 0; j < 15; j++) {
            grid[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }

        // insert words in the grid
        words.forEach((word) => {
          let x = Math.floor(Math.random() * 15);
          let y = Math.floor(Math.random() * 15);
          let direction =
            Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";

          if (direction === "horizontal") {
            for (let i = 0; i < word.length; i++) {
              if (x + i < 15) {
                grid[y][x + i] = word[i];
              }
            }
          } else {
            for (let i = 0; i < word.length; i++) {
              if (y + i < 15) {
                grid[y + i][x] = word[i];
              }
            }
          }
        });

        // print the grid in the console
        for (let i = 0; i < 15; i++) {
          let row = "";
          for (let j = 0; j < 15; j++) {
            row += grid[i][j] + " ";
          }
          console.log(row);
        }
      },
      (err) => {
        console.trace(err.message);
      }
    );
};

// Function to play the game
const playGame = async () => {
  displayGrid();
  // Ask the user to enter a word
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "word",
      message: "Enter a word to search for:",
    },
  ]);
  // Search for the word
  const searchResults = await searchWord(answers.word);

  // Display the word, definition, and clue

  if (searchResults) {
    console.log(`Word: ${searchResults.word}`);
    console.log(`Definition: ${searchResults.definition}`);
    console.log(`Clue: ${searchResults.clue}`);
  }
};

// Start the game
playGame();
