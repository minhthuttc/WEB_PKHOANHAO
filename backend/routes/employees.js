const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/database');

// Lấy tất cả nhân viên
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM NhanVien ORDER BY NgayTao DESC');
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
            .query('SELECT * FROM NhanVien WHERE MaNV = @id');
        
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
        const { HoTen, Email, SoDienThoai, PhongBan, ChucVu, Luong, NgayVaoLam } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('HoTen', sql.NVarChar, HoTen)
            .input('Email', sql.NVarChar, Email)
            .input('SoDienThoai', sql.NVarChar, SoDienThoai)
            .input('PhongBan', sql.NVarChar, PhongBan)
            .input('ChucVu', sql.NVarChar, ChucVu)
            .input('Luong', sql.Decimal(10, 2), Luong)
            .input('NgayVaoLam', sql.Date, NgayVaoLam)
            .query(`INSERT INTO NhanVien (HoTen, Email, SoDienThoai, PhongBan, ChucVu, Luong, NgayVaoLam)
                    VALUES (@HoTen, @Email, @SoDienThoai, @PhongBan, @ChucVu, @Luong, @NgayVaoLam);
                    SELECT SCOPE_IDENTITY() AS MaNV;`);
        
        res.status(201).json({ 
            message: 'Thêm nhân viên thành công',
            MaNV: result.recordset[0].MaNV 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cập nhật nhân viên
router.put('/:id', async (req, res) => {
    try {
        const { HoTen, Email, SoDienThoai, PhongBan, ChucVu, Luong, NgayVaoLam, TrangThai } = req.body;
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('HoTen', sql.NVarChar, HoTen)
            .input('Email', sql.NVarChar, Email)
            .input('SoDienThoai', sql.NVarChar, SoDienThoai)
            .input('PhongBan', sql.NVarChar, PhongBan)
            .input('ChucVu', sql.NVarChar, ChucVu)
            .input('Luong', sql.Decimal(10, 2), Luong)
            .input('NgayVaoLam', sql.Date, NgayVaoLam)
            .input('TrangThai', sql.NVarChar, TrangThai)
            .query(`UPDATE NhanVien 
                    SET HoTen = @HoTen, Email = @Email, SoDienThoai = @SoDienThoai,
                        PhongBan = @PhongBan, ChucVu = @ChucVu, Luong = @Luong,
                        NgayVaoLam = @NgayVaoLam, TrangThai = @TrangThai, NgayCapNhat = GETDATE()
                    WHERE MaNV = @id`);
        
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
            .query('DELETE FROM NhanVien WHERE MaNV = @id');
        
        res.json({ message: 'Xóa nhân viên thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
