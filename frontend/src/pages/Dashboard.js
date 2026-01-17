import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const url = "http://localhost:8080/api/projects";
            const response = await fetch(url, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const result = await response.json();
            if (result.success) {
                setProjects(result.projects);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/projects";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ name, description })
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setName('');
                setDescription('');
                fetchProjects();
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("Logged out");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>Dashboard</h1>
                <button onClick={logout} className="secondary">Logout</button>
            </div>

            <div className="card">
                <h3>Create New Agent</h3>
                <form onSubmit={handleCreateProject}>
                    <div>
                        <label>Agent Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Coding Assistant"
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <input 
                            type="text" 
                            placeholder="What does this agent do?"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>
                    <button type="submit">Create Agent</button>
                </form>
            </div>

            <h2>My Projects</h2>
            <div className="projects-grid">
                {projects.map(p => (
                    <div key={p._id} className="card" onClick={() => navigate(`/project/${p._id}`)} style={{ cursor: 'pointer' }}>
                        <h3 style={{ marginTop: 0 }}>{p.name}</h3>
                        <p style={{ color: '#666' }}>{p.description || "No description"}</p>
                        <small style={{ color: '#999' }}>Created: {new Date(p.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
                {projects.length === 0 && <p>No projects yet. Create one above!</p>}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Dashboard;
