const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


// Get all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
  
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
  
  // Get a single role
  router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE job_id = ?`;
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
  

// Create a role
router.post('/role', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'job_title',
      'job_id',
      'dep_name',
      'salary'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO roles (job_title, job_id, dep_name, salary) VALUES (?,?,?,?)`;
    const params = [
      body.job_title,
      body.job_id,
      body.dep_name,
      body.salary
    ];
  
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

module.exports = router;
