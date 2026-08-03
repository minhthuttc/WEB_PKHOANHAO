const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/database');

// Lấy tất cả nhân viên
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM Employees ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy 1 nhân viên theo ID
router.get('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Employees WHERE EmployeeID = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Thêm nhân viên mới
router.post('/', async (req, res) => {
    try {
        const { FullName, Email, Phone, Department, Position, Salary, HireDate } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('FullName', sql.NVarChar, FullName)
            .input('Email', sql.NVarChar, Email)
            .input('Phone', sql.NVarChar, Phone)
            .input('Department', sql.NVarChar, Department)
            .input('Position', sql.NVarChar, Position)
            .input('Salary', sql.Decimal(10, 2), Salary)
            .input('HireDate', sql.Date, HireDate)
            .query(`INSERT INTO Employees (FullName, Email, Phone, Department, Position, Salary, HireDate)
                    VALUES (@FullName, @Email, @Phone, @Department, @Position, @Salary, @HireDate);
                    SELECT SCOPE_IDENTITY() AS EmployeeID;`);
        
        res.status(201).json({ 
            message: 'Thêm nhân viên thành công',
            EmployeeID: result.recordset[0].EmployeeID 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cập nhật nhân viên
router.put('/:id', async (req, res) => {
    try {
        const { FullName, Email, Phone, Department, Position, Salary, HireDate, Status } = req.body;
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('FullName', sql.NVarChar, FullName)
            .input('Email', sql.NVarChar, Email)
            .input('Phone', sql.NVarChar, Phone)
            .input('Department', sql.NVarChar, Department)
            .input('Position', sql.NVarChar, Position)
            .input('Salary', sql.Decimal(10, 2), Salary)
            .input('HireDate', sql.Date, HireDate)
            .input('Status', sql.NVarChar, Status)
            .query(`UPDATE Employees 
                    SET FullName = @FullName, Email = @Email, Phone = @Phone,
                        Department = @Department, Position = @Position, Salary = @Salary,
                        HireDate = @HireDate, Status = @Status, UpdatedAt = GETDATE()
                    WHERE EmployeeID = @id`);
        
        res.json({ message: 'Cập nhật nhân viên thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Xóa nhân viên
router.delete('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Employees WHERE EmployeeID = @id');
        
        res.json({ message: 'Xóa nhân viên thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
