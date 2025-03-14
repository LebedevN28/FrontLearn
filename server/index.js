const { User, Task, Progress } = require('./db/models');

const pretty = (obj) => JSON.parse(JSON.stringify(obj));

async function main() {
  try {
    const userId = 3;
    const moduleId = 1;
    const userModuleProgress = await Task.findAll({
      where: { moduleId },
      include: [
        {
          model: Progress,
          where: { userId },
          required: true, // Только задачи с прогрессом
        },
      ],
    });


    console.dir(pretty(userModuleProgress), { depth: null });
  } catch (error) {
    console.log(error);
  }
}

main();
