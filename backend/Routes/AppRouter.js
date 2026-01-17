const router = require('express').Router();
const ensureAuthenticated = require('../Middlewars/Auth');
const { createProject, getProjects } = require('../Controllers/ProjectController');
const { addPrompt, getPrompts } = require('../Controllers/PromptController');
const { chat, getHistory } = require('../Controllers/ChatController');

// Project Routes
router.post('/projects', ensureAuthenticated, createProject);
router.get('/projects', ensureAuthenticated, getProjects);

// Prompt Routes
router.post('/prompts', ensureAuthenticated, addPrompt);
router.get('/prompts', ensureAuthenticated, getPrompts);

// Chat Route
router.post('/chat', ensureAuthenticated, chat);
router.get('/chat/history', ensureAuthenticated, getHistory);

module.exports = router;
