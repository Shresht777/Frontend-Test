'use client'
import React from 'react';
import styles from './test.module.css';
import { useState, useEffect } from 'react';

// Your Test Starts Here

export default function TaskManager(): JSX.Element {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [priority, setPriority] = useState("");
    const [filter, setFilter] = useState("All");
    const [error, setError] = useState("");

    function addTask() {
        if (text.trim() === "") {setError("task cannot be empty!");
             return;
            } //to avoid inputting empty tasks

        const newTask = {
            id: Date.now(),
            title: text,
            priority: priority,
            completed: false
        };

        setTasks([...tasks, newTask]);
        setText("");
        setError("");
    }
    function deleteTask(idToDelete) {
        setTasks(tasks.filter((task) => task.id !== idToDelete));
    }
    function enterToAdd(e){
        if(e.key === "Enter") {
            addTask();
        }
    }

    function toggleComplete(idToToggle) {
        const updatedTasks = tasks.map((task) =>
        task.id === idToToggle
            ? { ...task, completed: !task.completed }
            : task
        );
        setTasks(updatedTasks);
    }

    function filters(filterType){
        setFilter(filterType);
    }

    let filteredTasks = tasks;

    if (filter === "Active") {
        filteredTasks = tasks.filter(task => task.completed === false);
    }

    if (filter === "Completed") {
        filteredTasks = tasks.filter(task => task.completed === true);
    }

    return <div className={styles.container}>

        <h3 className={styles.h3}>Title: </h3>
        <input  className={styles.input}type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={enterToAdd}/>{error && <p style={{ color: "red" }}>{error}</p>} <button className={styles.button} onClick={addTask}>Add Task</button> <br></br>
        <p className={styles.p}>Select Priority:</p>
        <input type="radio" name="priority" value="High" onChange={(e) => setPriority(e.target.value)}/> <label className={styles.p} htmlFor="High">High</label>
        <input type="radio" name="priority" value="Medium" onChange={(e) => setPriority(e.target.value)}/> <label className={styles.p} htmlFor="High">Medium</label>
        <input type="radio" name="priority" value="Low" onChange={(e) => setPriority(e.target.value)}/> <label className={styles.p} htmlFor="High">Low</label>

        <h3 className={styles.h3}>Tasks</h3>
        {filteredTasks.map((task,index) =>(
            <div key={task.id}>
                <p style={{textDecoration: task.completed ? "line-through" : "none", opacity: task.completed ? 0.5 : 1, margin: "5px 10px 5px  7px"}}>{task.title} - {task.priority}</p> <input className={styles.input} type="checkbox" checked = {task.completed} onChange={() => toggleComplete(task.id)} id={`complete-${task.id}`}/><label htmlFor={`complete-${task.id}`}>Complete</label>
                <button className={styles.button} onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
         ))}

        <h3 className={styles.h3}>Filter:</h3>
            <button className={styles.button} onClick={() => filters("All")}>All</button>
            <button className={styles.button} onClick={() => filters("Active")}>Active</button>
            <button className={styles.button} onClick={() => filters("Completed")}>Completed</button>
        
        

    </div>;
};