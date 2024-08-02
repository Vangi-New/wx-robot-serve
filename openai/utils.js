import OpenAI from "openai";
// const {OpenAI,Configuration} = require("openai");



class AiUtils{
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: "https://api.openai-proxy.com/v1/",
            // baseURL: "https://127.0.0.1:7890/",
        });
    }

    async main() {
        const completion = await this.openai.chat.completions.create({
          messages: [{ role: "system", content: "You are a helpful assistant." }],
          model: "gpt-4o-mini",
        });
      
        console.log(completion.choices[0]);
    }
}



// module.exports = main;
export default new AiUtils();