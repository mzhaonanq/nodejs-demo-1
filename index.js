const db = require("./db");
const inquirer = require("inquirer");

module.exports.add = async (title, path) => {
  const list = await db.read(path);
  list.push({
    title,
    done: false,
  });
  await db.write(list, path);
};

module.exports.clear = async () => {
  await db.write([]);
};

function done(list, index) {
  list[index].done = true;
  db.write(list);
}

function unDone(list, index) {
  list[index].done = false;
  db.write(list);
}

function remove(list, index) {
  list.splice(index, 1);
  db.write(list);
}

function updateTitle(list, index) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "新的标题",
      default: list[index].title,
    })
    .then((answer3) => {
      list[index].title = answer3.title;
      db.write(list);
    });
}

function askForCreateTasks(list) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "创建任务的标题",
    })
    .then((answer4) => {
      list.push({
        title: answer4.title,
        done: false,
      });
      db.write(list);
    });
}

function askForActions(list, index) {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "请选择操作",
      choices: [
        {
          name: "退出",
          value: "quit",
        },
        {
          name: "删除",
          value: "remove",
        },
        {
          name: "已完成",
          value: "done",
        },
        {
          name: "未完成",
          value: "unDone",
        },
        {
          name: "修改任务名",
          value: "updateTitle",
        },
      ],
    })
    .then((answer2) => {
      const actions = {
        remove,
        updateTitle,
        done,
        unDone,
      };
      const action = actions[answer2.action];
      action && action(list, index);
    });
}

function printTasks(list) {
  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择任务",
      choices: [
        {
          name: "退出",
          value: "-1",
        },
        {
          name: "创建任务",
          value: "-2",
        },
        ...list.map((task, index) => {
          return {
            name: `${task.done ? "[x]" : "[_]"} ${index + 1} - ${task.title}`,
            value: index.toString(),
          };
        }),
      ],
    })
    .then((answer) => {
      const index = parseInt(answer.index);
      if (index >= 0) {
        askForActions(list, index);
      } else if (index === -2) {
        askForCreateTasks(list);
      }
    });
}

module.exports.showAll = async () => {
  let list = await db.read();
  printTasks(list);
};
