// weatherChatbot
module.exports.ChatbotReply = function(message) {
  this.botname = "WeatherBot";
  this.botversion = "1.0";
  this.botlocation = "Global";

  message = message.toLowerCase();

  if (message.includes("hello")|| message.includes("hi")) {
    return "Hello! I can tell you about the weather. Ask me for it.";
  }
  else if (message.includes("today weather") || message.includes("weather today")) {
    return "The weather today is sunny with a high of 25°C.";
  }
  else if (message.includes("tomorrow weather") || message.includes("weather tomorrow")) {
    return "Tomorrow looks rainy .";
  }
  else if (message.includes("your version") || message.includes("version")) {
    return `I am version ${this.botversion}.`;
  }
  else if (message.includes("location") || message.includes("where are you")) {
    return `My location is ${this.botlocation}.`;
  }
   else if (message.includes("your name") || message.includes("name")) {
    return `My name is ${this.botname}.`;
  }
  else {
    return "Sorry, I can only answer the questions about the weather.";
  }
}
