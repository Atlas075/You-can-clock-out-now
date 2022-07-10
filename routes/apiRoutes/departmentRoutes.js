const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require('../../utils/inputCheck');

// Get all parties
router.get("/departments", (req, res) => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get single department
router.get("/department/:id", (req, res) => {
  const sql = `SELECT * FROM department WHERE dep_id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});


// Create a department
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(body, 'dep_name',);
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO department (dep_name) VALUES (?)`;
    const params = [body.dep_id, body.dep_name,];
  
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

// Delete a department
router.delete("/department/:id", (req, res) => {
  const sql = `DELETE FROM department WHERE dep_id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Party not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;
