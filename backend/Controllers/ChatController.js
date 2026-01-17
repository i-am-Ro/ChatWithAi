const ProjectModel = require("../Models/Project");
const PromptModel = require("../Models/Prompt");
const MessageModel = require("../Models/Message");

const chat = async (req, res) => {
    try {
        const { projectId, message } = req.body;
        const userId = req.user._id;

        const project = await ProjectModel.findOne({ _id: projectId, userId });
        if (!project) {
            return res.status(403).json({ message: "Project not found or unauthorized", success: false });
        }

        // Save USER message to DB
        const userMessage = new MessageModel({
            projectId,
            role: 'user',
            content: message
        });
        await userMessage.save();

        const prompts = await PromptModel.find({ projectId });
        const systemPrompt = prompts.map(p => p.content).join("\n\n");

        // Fetch recent history (e.g., last 10 messages) to provide context
        const history = await MessageModel.find({ projectId })
                                        .sort({ createdAt: 1 })
                                        .limit(20); // Limit context window
        
        // Map history to OpenRouter format
        const historyMessages = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant', // Map 'assistant' correctly
            content: msg.content
        }));

        // Construct final messages array: System -> History -> New User Message (already in history? No, wait.)
        // Actually, if I just saved the user message, 'history' will include it if I fetched sorted by time?
        // Yes, await userMessage.save() happened before find().
        // So historyMessages includes the latest user message.
        
        const messages = [
            { role: "system", content: systemPrompt || "You are a helpful assistant." },
            ...historyMessages
        ];

        const apiKey = process.env.OPEN_API || process.env.OPENROUTER_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ message: "OpenRouter API Key is missing", success: false });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: messages
            })
        });

        const data = await response.json();
        
        if (data.error) {
             return res.status(500).json({ message: "OpenRouter API Error", success: false, error: data.error });
        }

        const aiResponseContent = data.choices[0].message.content;

        // Save AI message to DB
        const aiMessage = new MessageModel({
            projectId,
            role: 'assistant', // OpenRouter usually returns 'assistant'
            content: aiResponseContent
        });
        await aiMessage.save();

        res.status(200).json({ message: "Success", success: true, response: aiResponseContent });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false, error: err.message });
    }
}

const getHistory = async (req, res) => {
    try {
        const { projectId } = req.query; // Expect params/query
        const userId = req.user._id;

        // Verify access (optional but recommended)
        const project = await ProjectModel.findOne({ _id: projectId, userId });
        if (!project) {
            return res.status(403).json({ message: "Project not found or unauthorized", success: false });
        }

        const messages = await MessageModel.find({ projectId }).sort({ createdAt: 1 });
        res.status(200).json({ message: "History fetched", success: true, messages });

    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false, error: err.message });
    }
}

module.exports = {
    chat,
    getHistory
}
