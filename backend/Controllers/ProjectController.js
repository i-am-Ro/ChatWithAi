const ProjectModel = require("../Models/Project");

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user._id;

        const newProject = new ProjectModel({
            name,
            description,
            userId
        });
        await newProject.save();
        res.status(201).json({ message: "Project created successfully", success: true, project: newProject });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false, error: err });
    }
}

const getProjects = async (req, res) => {
    try {
        const userId = req.user._id;
        const projects = await ProjectModel.find({ userId });
        res.status(200).json({ message: "Projects fetched successfully", success: true, projects });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false, error: err });
    }
}

module.exports = {
    createProject,
    getProjects
}
