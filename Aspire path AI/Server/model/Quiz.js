import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  questionText: String,
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed,
  expectedOutput: String,
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    topic: String,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    level: String,
    type: {
      type: String,
      enum: ["MCQ", "Code"],
      default: "MCQ",
    },
    isAIGenerated: {
      type: Boolean,
      default: false,
    },
    questions: [questionSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);