const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// ======================================================
// GET ALL STUDENTS
// IMPORTANT: This must come BEFORE /students/:id
// ======================================================
router.get("/students", async (req, res, next) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

// ======================================================
// GET ONE STUDENT BY ID
// ======================================================
router.get("/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: "Invalid student ID",
      error: error.message
    });
  }
});

// ======================================================
// CREATE STUDENT
// ======================================================
router.post("/students", async (req, res, next) => {
  try {
    const student = new Student(req.body);

    const savedStudent = await student.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create student",
      error: error.message
    });
  }
});

// ======================================================
// UPDATE STUDENT
// ======================================================
router.put("/students/:id", async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update student",
      error: error.message
    });
  }
});

// ======================================================
// DELETE STUDENT
// ======================================================
router.delete("/students/:id", async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete student",
      error: error.message
    });
  }
});

module.exports = router;
