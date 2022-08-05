const express = require("express");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

const consoleTables = require("console.table");
const { removeAllListeners } = require("process");
const e = require("express");

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
          "Update An Employees Role",
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

        case "Update An Employees Role":
          promptUpdateRole();
          break;

        case "Add A Role":
          promptAddRole();
          break;

        case "Add A Department":
          promptAddDepartments();
          break;

        case "Exit":
          process.exit(0);

        default:
          connection.end();
      }
    });
};

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
      connection.query(
        `INSERT INTO department (dep_name)
      Values('${answer.dep_name}')`,
        (err, res) => {
          if (err) throw err;
          promptUser();
          console.log(`
      ===============================
      A New Department Has Been Added
      ===============================
      `);
        }
      );
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
  let salaryArray = [];
  let departmentArray = [];
  connection.query(`SELECT * FROM department;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((departmentName) => {
      departmentArray.push(departmentName.dep_name);
    });
    return departmentArray;
  });

  connection.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((salaryAmount) => {
      salaryArray.push(salaryAmount.salary);
    });
    return salaryArray;
  });

  return inquirer
    .prompt([
      {
        type: "input",
        name: "job_title",
        message: "Enter a new role",
      },
      {
        type: "list",
        name: "dep_name",
        message: "Enter the department for this role",
        choices: departmentArray,
      },
      {
        type: "list",
        name: "salary",
        message: "Select a Sallary. ",
        choices: salaryArray,
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO roles (job_title, dep_name, salary)
      Values('${answer.job_title}', '${answer.dep_name}', ${answer.salary})`,
        (err, res) => {
          if (err) throw err;
          promptUser();
          console.log(`
      =============================
      A New Role Has Been Added
      =============================
      `);
        }
      );
    });
};

const promptUpdateRole = () => {
  let roleArray = [];
  let employeeArray = [];
  let empchooseArray = []

  connection.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((updateRole) => {
      roleArray.push(updateRole.job_title);
    });
   // return roleArray;
   connection.query(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((updateEmployee) => {
      const empId = updateEmployee.emp_id
      const empRole = updateEmployee.job_title
      const empFirst = updateEmployee.First_Name
      const empLast = updateEmployee.Last_Name
      const employeeMenuText = `${empId} ${empFirst} ${empLast} ${empRole}`
      employeeArray.push(employeeMenuText);
      
    });
    //return employeeArray;
    return inquirer.prompt([
      {
        type: "list",
        name: "update_name",
        message: "Select a Employee to Update. ",
        choices: employeeArray,
      },
  
      {
        type: "list",
        name: "job_title",
        message: "What Position Would You Like to Change the Employee to. ",
        choices: roleArray,
      },
    ])
    .then((answer) => {
      const first = answer.update_name.slice(0, 2)
      connection.query (
      `UPDATE employee SET job_title = ${answer.job_title} WHERE emp_id = ${first}`,
      (err, res) => {
        if (err) throw err;
        promptUser();
      }
    );
    }) 
  });
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
  let depNameArray = [];

  connection.query(`SELECT * FROM department;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((depName) => {
      depNameArray.push(depName.dep_name);
    });
     console.log(`
=======================================
Now viewing all Employees by Department
=======================================
`);
  return inquirer
    .prompt({
      type: "list",
      name: "dep_name",
      message: "choose a department",
      choices: depNameArray,
    })
    .then((answer) => {
      connection.query(
        `SELECT first_name, last_name FROM employee WHERE dep_name = ${answer.dep_name};`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        }
      );
    });
  });

};

const promptAllEmployeesByManager = () => {
  let managerArray = [];

  connection.query(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((managerName) => {
      managerArray.push(managerName.Last_Name);
    });
    return inquirer
    .prompt({
      type: "list",
      name: "manager",
      message: "choose a manager",
      choices: managerArray,
    })
    .then((answer) => {
      connection.query(
        `SELECT first_name, last_name FROM employee WHERE manager_name = ${answer.manager};`,
        (err, res) => {
          if (err) throw err;
          console.table(res);
          promptUser();
        }
      );
    });
  })

  console.log(`
  ====================================
  Now viewing all Employees by Manager
  ====================================
  `);

 
};

const promptAddEmployee = () => {
  let roleArray = [];
  let managerArray = [];
  let roleIdArray = [];
  let depNameArray = [];
  let salaryArray = [];

  connection.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((roleId) => {
      roleIdArray.push(roleId.job_id);
    });
    return roleIdArray;
  });

  connection.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((salaryAmount) => {
      salaryArray.push(salaryAmount.salary);
    });
    return salaryArray;
  });

  connection.query(`SELECT * FROM department;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((depName) => {
      depNameArray.push(depName.dep_name);
    });
    return depNameArray;
  });

  connection.query(`SELECT * FROM roles;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((roleName) => {
      roleArray.push(roleName.job_title);
    });
    return roleArray;
  });

  connection.query(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    result.map((employee) => {
      const joinedString = "Hi" + "Donovan"
      // employee.job_title
      const jobTitle = employee.job_title
      const lastName = employee.Last_Name
     // const menuText = jobTitle + " " + lastName
      const menuText = `${jobTitle} ${lastName}`
      managerArray.push(menuText);
    });
    return managerArray;
  });

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
        name: "job_title",
        message: "Select a position. ",
        choices: roleArray,
      },

      {
        type: "list",
        name: "dep_name",
        message: "Select a Department. ",
        choices: depNameArray,
      },

      {
        type: "list",
        name: "salary",
        message: "Select a Sallary. ",
        choices: salaryArray,
      },

      {
        type: "list",
        name: "manager_name",
        message: "Select a manager. ",
        choices: managerArray,
      },
    ])
    .then((answer) => {
      if (answer.manager === "none") {
        connection.query(
          `INSERT INTO employee (first_Name, Last_Name, job_title, dep_name, salary, manager_name)
      Values ('${answer.first_name}', '${answer.last_name}', '${answer.job_title}', '${answer.dep_name}', '${answer.salary}', '${answer.manager_name}')`,
          (err, res) => {
            if (err) throw err;
            promptUser();
          }
        );
      } else {
        connection.query(
          `INSERT INTO employee (first_Name, Last_Name, job_title, dep_name, salary, manager_name)
          Values ('${answer.first_name}', '${answer.last_name}', '${answer.job_title}', '${answer.dep_name}', '${answer.salary}', '${answer.manager_name}')`,
          (err, res) => {
            if (err) throw err;
            promptUser();
          }
        );
      }
      console.log(`
      =============================
      A New Employee Has Been Added
      =============================
      `);
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
    promptUser();
  });
});
