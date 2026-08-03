# Hệ thống Quản lý Nhân viên

Ứng dụng quản lý nhân viên với Next.js, Tailwind CSS, Node.js Express và SQL Server.

## Cấu trúc dự án

```
employee-management/
├── frontend/          # Next.js + Tailwind CSS
├── backend/           # Node.js + Express
└── database/          # SQL Server scripts
```

## Cài đặt

### 1. Cấu hình Database

Chạy file `database/schema.sql` trong SQL Server Management Studio để tạo database và bảng.

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin SQL Server của bạn:
```
PORT=5000
DB_SERVER=localhost
DB_DATABASE=EmployeeManagement
DB_USER=sa
DB_PASSWORD=your_password
DB_PORT=1433
```

Chạy server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Chạy ứng dụng:
```bash
npm run dev
```

Truy cập: http://localhost:3000

## Chức năng

- ✅ Xem danh sách nhân viên
- ✅ Thêm nhân viên mới
- ✅ Sửa thông tin nhân viên
- ✅ Xóa nhân viên
- ✅ Hiển thị trạng thái nhân viên

## API Endpoints

- `GET /api/employees` - Lấy tất cả nhân viên
- `GET /api/employees/:id` - Lấy 1 nhân viên
- `POST /api/employees` - Thêm nhân viên
- `PUT /api/employees/:id` - Cập nhật nhân viên
- `DELETE /api/employees/:id` - Xóa nhân viên
