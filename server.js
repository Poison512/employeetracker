const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3000,
        user: 'root',
        password: '@Alonzo512',
        database: 'buisness'
    }
)
connection.connect(function(err) {
    if(err) {
        return console.error('error: ' + err.message);
    }
    console.log("Conneceted successfully to mysql server")
});

const userPrompt = () => {
    return inquirer
    .prompt([
        {   
            type: "list",
            name: "selection",
            message: "Please select one of the following",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit Program'
            ]
        }
    ])

    .then ((answers) => {
        let question =  answers.selection;
        switch(question) {
            case 'View All Departments':
                viewDepts()
                break;
            case 'View All Roles':
                viewRoles()
                break;
            case 'View All Employees':
                viewEmployees()
                    break;
            case 'Add Department':
                addDept()
                break;
            case 'Add Role':
                addRole()
                 break;
            case 'Add Employee':
                addEmployee()
                break;
            case 'Update Employee Role':
                updateEmployeeRole()
                break;
            case 'Exit Program':
                exitConnection()
                break;

            default:
            process.exit();
        }
    })
 }
//View Dept
viewDepts = () => {

const sql = `SELECT id, department_name AS department FROM department`;

connection.promise().query(sql)

.then ((rows) => {

    console.table(rows[0])

    userPrompt()

}) 
.catch((err) => {

    if (err) {

        throw err

}          

    })       
}

//View Roles

    viewRoles = () => {
        const sql = `SELECT role.id, title, salary, department_name AS department
        FROM role 
        INNER JOIN department ON role.department_id = department.id`;
        connection.promise().query(sql)
        .then((rows)=> {
            console.table(rows[0])
            userPrompt()
        })
        .catch((err) => {
            if (err) {
            throw err
            } 
            
         })  
    } 

//View Employees

viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,
department.department_name AS department, manager.first_name AS manager 
FROM employee 
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id` ;
connection.promise().query(sql)
    .then((rows) => {
            console.table(rows[0])
            userPrompt()
    })
     .catch((err) => {
            if (err) {
            throw err
        } 

    })  
}


//Add Dept

addDept = () => {
        inquirer.prompt([
            {
                type: "input",
            name: "addDept",
            message: "What is the name of the department?"
        },
    ])
        .then ((answer) => {
            const sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.promise().query(sql, answer.addDept)
        .then(()=> {
                console.log(`${answer.addDept} department has been added`)
            viewDepts()
        })
        .catch((err) => {
                if (err) {
                throw err
            } 
    })      
})
}


//Add new Role

addRole = () => {
    inquirer.prompt ([ {
        type: "input",
        name: "addRole",
        message: "What is the name of the role?"
    },
    {
        type: "input",
        name: "addRoleSalary",
        message: "What is the salary of the role?"
    },

    {
        type: "input",
        name: "addRoleDept",
        message: "Which department does the role belong to?"
    }
])
    .then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        const newValues = [answer.addRole, answer.addRoleSalary, answer.addRoleDept]
        connection.promise().query(sql, newValues)
        .then(()=> {
            console.log(`${answer.addRole} role has been added`)
            viewRoles()
        })
        .catch((err) => {
            if (err) {
            throw err
            }
    })

})}

//Add New Employee
    
    addEmployee = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "addEmployeeFN",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "addEmployeeLN",
                message: "What is the employees's last name?"
            },
            {
                type: "input",
                name: "addEmployeeRole",
                message: "What is the employees's role?"
            },

            {
                type: "input",
                name: "addEmployeeManager",
                message: "Who is the employees manager?"
            }
        ])

        .then((answer) => {
            const sql =  `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const newValues = [answer.addEmployeeFN, answer.addEmployeeLN, answer.addEmployeeRole, answer.addEmployeeManager]
            connection.promise().query(sql, newValues)
        .then(()=> {
        console.log(`${answer.addEmployeeFN} ${answer.addEmployeeLN} has been added as an employee`)
        viewEmployees()
            })
            .catch((err) => {
                if (err) {
                throw err
                }
            })
        })
 
    }

    updateEmployeeRole = () => {
        inquirer.prompt([
         

            {
                type: "input",
                name: "updateEmployeeRole",
                message: "Which role do you want to assign the selected employee:"
            },
            {
                type: "input",
                name: "updateEmployee",
                message: "Which employee's role do you want to update:"
            }
        ])
        .then((answer) => {
            const sql =  `UPDATE employee SET role_id = (?) WHERE id = (?)`
            const newValues = [answer.updateEmployeeRole, answer.updateEmployee,]
            connection.promise().query(sql, newValues)
        .then(()=> {
        console.log("Employee's role has been updated")
        viewEmployees()
            })
            .catch((err) => {
                if (err) {
                throw err
                }
            })
        })
    }

    exitConnection = () => {
        connection.end()
    }

 userPrompt()