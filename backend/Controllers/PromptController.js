const PromptModel = require("../Models/Prompt");
const ProjectModel = require("../Models/Project");

const addPrompt = async (req, res) => {
    try {
        const { projectId, title, content } = req.body;
        const userId = req.user._id;

        const project = await ProjectModel.findOne({ _id: projectId, userId });
        if (!project) {
            return res.status(403).json({ message: "Project not found or unauthorized", success: false });
        }

        const newPrompt = new PromptModel({
            projectId,
            title,
            content
        });
        await newPrompt.save();
        res.status(201).json({ message: "Prompt added successfully", success: true, prompt: newPrompt });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false, error: err });
    }
}

const getPrompts = async (req, res) => {
    try {
        const projectId = req.query.projectId;
        const userId = req.user._id;

        if (!projectId) {
             return res.status(400).json({ message: "Project ID is required", success: false });
        }

        const project = await ProjectModel.findOne({ _id: projectId, userId });
        if (!project) {
            return res.status(403).json({ message: "Project not found or unauthorized", success: false });
        }

        const prompts = await PromptModel.find({ projectId });
        res.status(200).json({ message: "Prompts fetched successfully", success: true, prompts });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false, error: err });
    }
}

module.exports = {
    addPrompt,
    getPrompts
}
