
const readline = require('readline');
const { ChatbotReply } = require('./chatbot');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You => '
});

console.log("WeatherBot ready! Type 'exit' to quit.");
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();
  if (input.toLowerCase() === 'exit') {
    console.log("Have a nice day!");
    process.exit(0);
  }

  const response = ChatbotReply(input);
  console.log('Bot => ' + response);

  rl.prompt();
}).on('close', () => {
  console.log('Have a nice day!');
  process.exit(0);
});
