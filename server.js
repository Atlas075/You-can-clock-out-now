const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const inquirer = require("inquirer");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const consoleTables = require("console.table");

var manager = [];
var roles = [];
var employees = [];

const PORT = process.env.PORT || 3001;
const app = express();

const getManager = () => {

}

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

        default:
          Connection.end();
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
  connection.query(`SELECT * FROM depertment`, (err, res) => {
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
      message: "Enter a new department name"
    }
  ]).then(answer) => {

  }
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

const promptAddRole = () => {};

const promptAllEmployees = () => {
  console.log(`
  =========================
  Now viewing all Employees
  =========================
  `);
  connection.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    console.table(res);
    promptUser()
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
      choices: managers,
    })
    .then((answer) => {
      connection.query(
        `SELECT first_name, last_name FROM employee WHERE dep_id = ${answer.manager};`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser()
        }
      );
    });
};

const promptAllEmployeesByManager = () => {
  console.log(`
  ====================================
  Now viewing all Employees by Manager
  ====================================
  `);
  return inquirer
    .prompt({
      type: "list",
      name: "manager",
      message: "choose a managers id",
      choices: managers,
    })
    .then((answer) => {
      connection.query(
        `SELECT first_name, last_name FROM employee WHERE job_id = ${answer.manager};`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser()
        }
      );
    });
};

const promptAddEmployee = () => {
  return inquirer
  .prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter a first name. "
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
      choices: roles
    },
    
    {
      type: "list",
      name: "manager",
      message: "Select a manager. ",
      choices: managers
    }

  ]).then((answer) => {
    if (answer.manager === "none") {
      connection.query(`INSERT INTO employee (first_name, last_name, dep_id, manager_id)
      Values ('${answer.first_name}', '${answer.last_name}', '${answer.dep_id}', null)`, (err, res) => {
        if (err) throw err
        promptUser()
      })
    }
    else {
      connection.query(`INSERT INTO employee (first_name, last_name, dep_id, manager_id)
      Values ('${answer.first_name}', '${answer.last_name}', '${answer.dep_id}', ${answer.manager_id})`, (err, res) => {
        if (err) throw err
        promptUser()
      })
    }
  })
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).end();
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
