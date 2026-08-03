const sql = require('mssql');
require('dotenv').config();

// Cấu hình kết nối
const config = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || 'EmployeeManagement',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

// Nếu có TRUSTED_CONNECTION thì dùng Windows Authentication
if (process.env.DB_TRUSTED_CONNECTION === 'true') {
    config.options.trustedConnection = true;
} else {
    // Nếu không thì dùng SQL Authentication
    config.user = process.env.DB_USER;
    config.password = process.env.DB_PASSWORD;
    config.port = parseInt(process.env.DB_PORT || 1433);
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Kết nối SQL Server thành công!');
        console.log('   Server:', config.server);
        console.log('   Database:', config.database);
        return pool;
    })
    .catch(err => {
        console.error('❌ Lỗi kết nối SQL Server:', err.message);
        console.error('\n📝 Hướng dẫn khắc phục:');
        console.error('1. Kiểm tra SQL Server có đang chạy không');
        console.error('2. Mở SQL Server Management Studio (SSMS)');
        console.error('3. Chạy file: database/create-db.sql');
        console.error('4. Kiểm tra thông tin trong file .env\n');
        throw err;
    });

module.exports = { sql, poolPromise };
