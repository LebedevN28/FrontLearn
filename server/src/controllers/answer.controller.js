const answerService = require('../services/answer.service');

module.exports = {
  async getAllAnswers(req, res) {
    try {
      const answers = await answerService.getAllAnswers();
      res.status(200).json(answers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching answers' });
    }
  },

  async getAnswerById(req, res) {
    try {
      const { id } = req.params;
      const answer = await answerService.getAnswerById(id);
      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
      res.status(200).json(answer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching answer' });
    }
  },

  async createAnswer(req, res) {
    try {
      const answerData = req.body;
      const newAnswer = await answerService.createAnswer(answerData);
      res.status(201).json(newAnswer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating answer' });
    }
  },

  async updateAnswer(req, res) {
    try {
      const { id } = req.params;
      const answerData = req.body;
      const updatedAnswer = await answerService.updateAnswer(id, answerData);
      if (!updatedAnswer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
      res.status(200).json(updatedAnswer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating answer' });
    }
  },

  async deleteAnswer(req, res) {
    try {
      const { id } = req.params;
      const deletedAnswer = await answerService.deleteAnswer(id);
      if (!deletedAnswer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
      res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting answer' });
    }
  },
};
