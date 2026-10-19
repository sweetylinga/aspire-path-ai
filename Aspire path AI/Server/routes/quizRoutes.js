import express from "express";
import Quiz from "../model/Quiz.js";

const router = express.Router();

// CREATE QUIZ (Admin)
router.post("/", async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    // Return both top-level and nested quiz for frontend compatibility
    res.status(201).json({
      success: true,
      quiz,
      ...quiz.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL QUIZZES (User + Admin)
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET QUIZ BY ID
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE QUIZ BY ID
router.put("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({
      success: true,
      quiz,
      ...quiz.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE QUIZ BY ID
router.delete("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD QUESTION TO QUIZ
router.post("/:quizId/questions", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    quiz.questions.push(req.body);
    await quiz.save();
    const createdQuestion = quiz.questions[quiz.questions.length - 1];
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE QUESTION IN QUIZ
router.put("/:quizId/questions/:questionId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const question = quiz.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    Object.assign(question, req.body);
    await quiz.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE QUESTION FROM QUIZ
router.delete("/:quizId/questions/:questionId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    quiz.questions = quiz.questions.filter(
      (q) => q._id.toString() !== req.params.questionId
    );
    await quiz.save();
    res.json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;