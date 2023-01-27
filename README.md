# Crossword Game

This game is a crossword game based on Elasticsearch and JavaScript. It allows you to populate a crossword puzzle from a pre-populated Elasticsearch index with words and definitions.

## Installation

1. Make sure you have a local deployment of Elasticsearch running on your machine.
2. Download the source code file of this game.
3. Open a terminal in the directory where the downloaded file is located.
4. Install dependencies by running the `npm install` command.
5. Populate the Elasticsearch index according to this [article](https://medium.com/@mhdabdel151/building-a-simple-crossword-game-with-elasticsearch-3c1f4bf51e0).
6. Run the game using the `node index.js` command.
7. Follow the instructions in the console to complete the crossword puzzle.

## Use

- Enter a word from the grid to get its definition from the Elasticsearch index.
- Use the letters from the definition to complete the crossword puzzle.
- If you do not find a result for a given word, a message will inform you that there is no result.

## Remark

This game is a simple example of what can be done with Elasticsearch and JavaScript. There are many possible enhancements, such as adding more graphics and gameplay features. Feel free to explore and experiment to create your own improved version of the game.
