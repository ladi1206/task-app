import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, InputLabel, MenuItem, Select, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {getTasks,createTask} from '../src/services/taskService';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState({});

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: name === 'completed' ? value === 'true' : value });
  };

  const handleCreateTask = async() => {
    // Placeholder for real API logic
    setTasks([...tasks, { ...newTask }]);
    setNewTask({ title: '', description: '', completed: false });
    // console.log("newTask,newTask",newTask)
    await createTask(newTask)
    handleCloseAddModal();
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditTask(tasks[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  const handleSaveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = editTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditTask({});
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Tasks</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddModal}>
          Add New Task
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL. No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField name="title" value={editTask.title} onChange={handleEditChange} size="small" />
                  ) : (
                    task.title
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField name="description" value={editTask.description} onChange={handleEditChange} size="small" />
                  ) : (
                    task.description
                  )}
                </TableCell>
                <TableCell>
                  {task.completed ? 'Completed' : 'Not Completed'}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Button size="small" variant="outlined" onClick={handleSaveEdit}>Save</Button>
                  ) : (
                    <IconButton onClick={() => handleEditClick(index)} color="primary">
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Task Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus fullWidth margin="dense" label="Title" name="title"
            value={newTask.title} onChange={handleNewTaskChange}
          />
          <TextField
            fullWidth margin="dense" label="Description" name="description"
            value={newTask.description} onChange={handleNewTaskChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="completed"
              value={newTask.completed.toString()}
              label="Status"
              onChange={handleNewTaskChange}
            >
              <MenuItem value="true">Completed</MenuItem>
              <MenuItem value="false">Not Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateTask}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;
