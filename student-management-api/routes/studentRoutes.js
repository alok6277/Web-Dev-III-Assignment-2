const express = require("express");
const router = express.Router();

const students = require("../data/students");

// GET /students
// Get all students
router.get("/", (req, res) => {
    res.status(200).json(students);
});


// GET /students/:id
// Get student by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid student ID"
        });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            error: "Student not found"
        });
    }

    res.status(200).json(student);
});


// POST /students
// Add new student
router.post("/", (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            error: "Name and course are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name: name,
        course: course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});


// PUT /students/:id
// Update student
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid student ID"
        });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            error: "Student not found"
        });
    }

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            error: "Name and course are required"
        });
    }

    student.name = name;
    student.course = course;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// DELETE /students/:id
// Delete student
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid student ID"
        });
    }

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


module.exports = router;