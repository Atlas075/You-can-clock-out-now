const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all employee alphabetized by last name
router.get('/employees', (req, res) => {
  const sql = `SELECT * FROM employee ORDER BY last_name`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single employee
router.get('/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employee WHERE emp_id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Create a voter
router.post('/employee', ({ body }, res) => {
  const errors = inputCheck(body, 'emp_id', 'first_name', 'last_name',  'job_title', 'job_id', 'dep_id', 'salary', 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO employee (emp_id, first_name, last_name, job_title, job_id, dep_id, salary, manager_id) VALUES (?,?,?,?,?,?,?,?)`;
  const params = [body.emp_id, body.first_name, body.last_name, body.job_title, body.job_id, body.dep_id, body.salary, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Update a employee job_title
router.put('/employee/:id', (req, res) => {
  const errors = inputCheck(req.body, 'job_title');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employee SET job_title = ? WHERE emp_id = ?`;
  const params = [req.body.job_title, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

// Delete a employee
router.delete('/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE emp_id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        emp_id: req.params.emp_id
      });
    }
  });
});

module.exports = router;
