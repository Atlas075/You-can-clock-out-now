
const express = require("express");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

const consoleTables = require("console.table");
const { removeAllListeners } = require("process");

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var manager = [''];
var roles = [''];
var employees = [''];
var department = [''];

const PORT = process.env.PORT || 3001;



const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "choosetype",
        message: "Please select fom the following.",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "View All Roles",
          "View All Departments",
          "Add An Employee",
          "Remove An Employee",
          "Add A Role",
          "Add A Department",
          "Exit",

        ],
      },
    ])
    .then((userinput) => {
      switch (userinput.choosetype) {
        case "View All Employees":
          promptAllEmployees();
          break;

        case "View All Employees By Department":
          promptAllEmployeesByDepartment();
          break;

        case "View All Employees By Manager":
          promptAllEmployeesByManager();
          break;

        case "View All Roles":
          promptAllRoles();
          break;

        case "View All Departments":
          promptAllDepartments();
          break;

        case "Add An Employee":
          promptAddEmployee();
          break;

        case "Remove An Employee":
          promptRemoveEmployee();
          break;

        case "Add A Role":
          promptAddRole();
          break;

        case "Add A Departments":
          promptAddDepartments();
          break;

        case "Exit":
          process.exit(0);

        default:
          connection.end();
      }
    });
};

// const promptManager = () => {
//   connection.query(`SELECT`)
// }

const promptAllDepartments = () => {
  console.log(`
  ===========================
  Now viewing all Departments
  ===========================
  `);
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

const promptAddDepartments = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "dep_name",
        message: "Enter a new department name",
      },
    ])
    .then((answer) => {
      connection.query(`INSERT INTO department dep_name`);
      values(`${answer.dep_name}`),
        (err, res) => {
          if (err) throw err;
          promptUser();
        };
    });
};

const promptAllRoles = () => {
  console.log(`
  =====================
  Now viewing all Roles
  =====================
  `);
  connection.query(`SELECT * FROM roles`, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
  // connection.query(`SELECT * FROM roles`, (err, res) => {
  //   if (err) throw err;
  //   roles = [];
  //   for (let i = 0; i < res.length; i++) {
  //     const job = res[i].job_id;
  //     const title = res[i].job_title;
  //     const department = res[i].dep_id;
  //     const salary = res[i].salary;
  //     var newRole = {
  //       name: title,
  //       value: job,
  //     };
  //     roles.push(newRole);
  //   }
  //   return roles;
  // });
};

const promptAddRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "job_title",
        message: "Enter a new role",
      },
      {
        type: "input",
        name: "job_id",
        message: "Enter a new role id ",
      },
      {
        type: "list",
        name: "dep_name",
        message: "Enter the department for this role",
        choices: department,
      },
      {
        type: "input",
        name: "salary",
        message: "Enter a new department name",
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO roles job_title, job_id, dep_name, salary)
      Values('${answer.job_title}', '${answer.job_id}', '${answer.dep_name}', ${answer.salary})`,
        (err, res) => {
          if (err) throw err;
          promptUser();
        }
      );
    });
};

const promptAllEmployees = () => {
  console.log(`
  =========================
  Now viewing all Employees
  =========================
  `);
  connection.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser();
  });
};

const promptAllEmployeesByDepartment = () => {
  console.log(`
=======================================
Now viewing all Employees by Department
=======================================
`);
  return inquirer
    .prompt({
      type: "list",
      name: "manager",
      message: "choose a department id",
      choices: department,
    })
    .then((answer) => {
      connection.query(
        `SELECT first_name, last_name FROM employee WHERE dep_id = ${answer.manager};`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        }
      );
    });
};

const promptAllEmployeesByManager = () => { 
   let managerArray = []

  connection.query(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((managerName,) => {
      managerArray.push(managerName.last_name)
    })
    return managerArray
   })
  console.log(`
  ====================================
  Now viewing all Employees by Manager
  ====================================
  `);

  return inquirer
    .prompt({
      type: "list",
      name: "manager",
      message: "choose a manager",
      choices: managerArray,
    })
    .then((answer) => {
      connection.query(
        `SELECT first_name, last_name FROM employee WHERE job_id = ${answer.last_name};`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        }
      );
    });
};

const promptAddEmployee = () => {
   let roleArray = []
   let managerArray = []

   connection.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((roleName) => {
      roleArray.push(roleName.job_title)
    })
    return roleArray
   })

   connection.query(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((managerName,) => {
      managerArray.push(managerName.last_name)
    })
    return managerArray
   })

  return inquirer
  .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter a first name. ",
      },

      {
        type: "input",
        name: "last_name",
        message: "Enter a last name. ",
      },

      {
        type: "list",
        name: "role",
        message: "Select a position. ",
        choices: roleArray,
      },

      {
        type: "list",
        name: "manager",
        message: "Select a manager. ",
        choices: managerArray,
      },
    ])
    .then((answer) => {
      if (answer.manager === "none") {
        connection.query(
          `INSERT INTO employee (First_Name, Last_Name, job_title, last_name)
      Values ('${answer.first_name}', '${answer.last_name}', '${answer.job_title}', '${answer.last_name}')`,
          (err, res) => {
            if (err) throw err;
            promptUser();
          }
        );
      } else {
        connection.query(
          `INSERT INTO employee (First_Name, Last_Name, job_title, last_name)
          Values ('${answer.First_Name}', '${answer.Last_Name}', '${answer.job_title}', '${answer.last_name}')`,
          (err, res) => {
            if (err) throw err;
            promptUser();
          }
        );
      }
    });
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).end();
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    promptUser()
  });
});

