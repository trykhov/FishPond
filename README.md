Setup

• Make sure webpack is installed
  * If not, run `npm install -g webpack webpack-cli`
• Have a `dist` and `src` folder in the root of the project
• Inside the `src` folder, have a file called `index.js` (this is the entry point for webpack)
• Run `webpack --watch --mode=development` in your directory in the terminal and a `dist/main.js` file will be generated.
• Make sure the `index.html` is in the `dist` folder and then link the `main.js` as a script tag in it