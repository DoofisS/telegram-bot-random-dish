const { Telegraf } = require("telegraf");
require("dotenv").config();

const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(`Hello mr. Human 
  My name is roBOT a.k.a random dish giver :D
If you want to get a random dish that u can cook this evening then just simply write 
/dish <- or click here`)
);
bot.help((ctx) => ctx.reply("Help"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.command("dish", (ctx) => {
  axios
    .request("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(function (response) {
      const apiResponse = response.data.meals[0];
      bot.telegram.sendMessage(ctx.chat.id, {
        text: `${apiResponse.strMeal}
        ${apiResponse.strInstructions}
        Have a great day Human`,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
