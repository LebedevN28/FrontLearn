const { Answer } = require('../../db/models');
module.exports = {
  async getAllAnswers() {
    return await Answer.findAll();
  },

  async getAnswerById(id) {
    return await Answer.findByPk(id);
  },

  async createAnswer(answerData) {
    return await Answer.create(answerData);
  },

  async updateAnswer(id, answerData) {
    const answer = await Answer.findByPk(id);
    if (!answer) return null;
    return await answer.update(answerData);
  },

  async deleteAnswer(id) {
    const answer = await Answer.findByPk(id);
    if (!answer) return null;
    await answer.destroy();
    return answer;
  },
};
