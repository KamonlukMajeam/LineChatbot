const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const textOnly = async (prompt) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
};

const multimodal = async (imageBinary) => {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "ช่วยบรรยายภาพนี้ให้หน่อย";
    const mimeType = "image/png";

    // Convert image binary to a GoogleGenerativeAI.Part object.
    const imageParts = [
        {
            inlineData: {
                data: Buffer.from(imageBinary, "binary").toString("base64"),
                mimeType
            }
        }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const text = result.response.text();
    return text;
};

const chat = async (prompt) => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
        history: [
           // {
           //     role: "user",
           //     parts: [{ text: "สวัสดีจ้า" }],
           // }, {
           //     role: "model",
           //     parts:
           //       "Answer the question using the text below. Respond with only the text provided. If you cannot answer, you must answer ขออภัยครับ ไม่พบข้อมูลดังกล่าว คุณสามารถถามคำถามต่อไป หรือหากต้องการตั้งค่าเริ่มต้น เพื่อเลือกสอบถาม Staff ให้พิมพ์ reset \nQuestion: " +
            //      prompt 
                  //"\nText: " +
                 // information,
            //  },
        ]
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
};

module.exports = { textOnly, multimodal, chat };