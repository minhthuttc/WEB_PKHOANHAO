const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/database');

// Lấy tất cả nhân viên
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM NhanVien ORDER BY STT ASC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy 1 nhân viên theo STT
router.get('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM NhanVien WHERE STT = @id');
        
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
        const { MaNV, HoTen, DiaChi, SDT, PhanLoaiSK } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaNV', sql.NVarChar, MaNV)
            .input('HoTen', sql.NVarChar, HoTen)
            .input('DiaChi', sql.NVarChar, DiaChi)
            .input('SDT', sql.NVarChar, SDT)
            .input('PhanLoaiSK', sql.NVarChar, PhanLoaiSK)
            .query(`INSERT INTO NhanVien (MaNV, HoTen, DiaChi, SDT, PhanLoaiSK)
                    VALUES (@MaNV, @HoTen, @DiaChi, @SDT, @PhanLoaiSK);
                    SELECT SCOPE_IDENTITY() AS STT;`);
        
        res.status(201).json({ 
            message: 'Thêm nhân viên thành công',
            STT: result.recordset[0].STT 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cập nhật nhân viên
router.put('/:id', async (req, res) => {
    try {
        const { MaNV, HoTen, DiaChi, SDT, PhanLoaiSK } = req.body;
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('MaNV', sql.NVarChar, MaNV)
            .input('HoTen', sql.NVarChar, HoTen)
            .input('DiaChi', sql.NVarChar, DiaChi)
            .input('SDT', sql.NVarChar, SDT)
            .input('PhanLoaiSK', sql.NVarChar, PhanLoaiSK)
            .query(`UPDATE NhanVien 
                    SET MaNV = @MaNV, HoTen = @HoTen, DiaChi = @DiaChi,
                        SDT = @SDT, PhanLoaiSK = @PhanLoaiSK, NgayCapNhat = GETDATE()
                    WHERE STT = @id`);
        
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
            .query('DELETE FROM NhanVien WHERE STT = @id');
        
        res.json({ message: 'Xóa nhân viên thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
