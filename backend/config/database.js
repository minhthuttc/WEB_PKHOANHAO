const sql = require('mssql');
require('dotenv').config();

// Cấu hình kết nối
const config = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE || 'QLNV',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

// Sử dụng Windows Authentication hoặc SQL Authentication
if (process.env.DB_TRUSTED_CONNECTION === 'true') {
    // Windows Authentication
    config.options.trustedConnection = true;
    config.authentication = {
        type: 'ntlm',
        options: {
            domain: '',
            userName: '',
            password: ''
        }
    };
} else {
    // SQL Authentication
    config.user = process.env.DB_USER;
    config.password = process.env.DB_PASSWORD;
    config.port = parseInt(process.env.DB_PORT || 1433);
}

console.log('🔌 Đang kết nối SQL Server...');
console.log('   Server:', config.server);
console.log('   Database:', config.database);
console.log('   Auth:', process.env.DB_TRUSTED_CONNECTION === 'true' ? 'Windows Authentication' : 'SQL Authentication');

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ Kết nối SQL Server thành công!');
        return pool;
    })
    .catch(err => {
        console.error('❌ Lỗi kết nối SQL Server:', err.message);
        console.error('\n📋 Hướng dẫn khắc phục:');
        console.error('1. Mở SQL Server Configuration Manager');
        console.error('2. SQL Server Network Configuration → Protocols for MSSQLSERVER');
        console.error('3. Bật "Named Pipes" (enabled)');
        console.error('4. Khởi động lại SQL Server service');
        console.error('5. Hoặc thử thay đổi DB_SERVER trong .env thành:');
        console.error('   - localhost\\SQLEXPRESS');
        console.error('   - .\\SQLEXPRESS');
        console.error('   - (local)\\SQLEXPRESS');
        throw err;
    });

module.exports = { sql, poolPromise };
