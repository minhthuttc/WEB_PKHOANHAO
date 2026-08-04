'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [userRole, setUserRole] = useState(null); // null, 'admin', 'employee'
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    MaNV: '', HoTen: '', DiaChi: '', SDT: '', PhanLoaiSK: 'Loại 1'
  });

  useEffect(() => {
    if (userRole) fetchEmployees();
  }, [userRole]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_URL}/employees`);
      setEmployees(res.data);
    } catch (err) {
      alert('Lỗi khi tải dữ liệu: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/employees/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/employees`, formData);
      }
      fetchEmployees();
      resetForm();
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleEdit = (emp) => {
    setFormData({
      MaNV: emp.MaNV, HoTen: emp.HoTen, DiaChi: emp.DiaChi,
      SDT: emp.SDT, PhanLoaiSK: emp.PhanLoaiSK
    });
    setEditingId(emp.STT);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      try {
        await axios.delete(`${API_URL}/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        alert('Lỗi khi xóa: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      MaNV: '', HoTen: '', DiaChi: '', SDT: '', PhanLoaiSK: 'Loại 1'
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Trang chọn vai trò đăng nhập
  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Quản lý Nhân viên
          </h1>
          <p className="text-center text-gray-600 mb-10">Chọn vai trò để đăng nhập</p>
          
          <div className="space-y-4">
            <button
              onClick={() => setUserRole('admin')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Đăng nhập Admin
            </button>
            
            <button
              onClick={() => setUserRole('employee')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Đăng nhập Nhân viên
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quản lý Nhân viên</h1>
            <p className="text-sm text-gray-600 mt-1">
              Đăng nhập: <span className="font-semibold">{userRole === 'admin' ? 'Admin' : 'Nhân viên'}</span>
            </p>
          </div>
          <div className="flex gap-3">
            {userRole === 'admin' && (
              <button onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                {showForm ? 'Đóng' : 'Thêm nhân viên'}
              </button>
            )}
            <button onClick={() => setUserRole(null)}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
              Đăng xuất
            </button>
          </div>
        </div>

        {showForm && userRole === 'admin' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Sửa nhân viên' : 'Thêm nhân viên mới'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Mã nhân viên (VD: NV001)" required
                className="border p-2 rounded" value={formData.MaNV}
                onChange={(e) => setFormData({...formData, MaNV: e.target.value})} />
              <input type="text" placeholder="Họ tên" required
                className="border p-2 rounded" value={formData.HoTen}
                onChange={(e) => setFormData({...formData, HoTen: e.target.value})} />
              <input type="text" placeholder="Địa chỉ" className="col-span-2 border p-2 rounded" 
                value={formData.DiaChi}
                onChange={(e) => setFormData({...formData, DiaChi: e.target.value})} />
              <input type="tel" placeholder="Số điện thoại"
                className="border p-2 rounded" value={formData.SDT}
                onChange={(e) => setFormData({...formData, SDT: e.target.value})} />
              <select className="border p-2 rounded" value={formData.PhanLoaiSK}
                onChange={(e) => setFormData({...formData, PhanLoaiSK: e.target.value})}>
                <option value="Loại 1">Loại 1</option>
                <option value="Loại 2">Loại 2</option>
                <option value="Loại 3">Loại 3</option>
                <option value="Loại 4">Loại 4</option>
                <option value="Loại 5">Loại 5</option>
              </select>
              <div className="col-span-2 flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  {editingId ? 'Cập nhật' : 'Thêm'}
                </button>
                <button type="button" onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">STT</th>
                <th className="p-3 text-left">Mã NV</th>
                <th className="p-3 text-left">Họ tên</th>
                <th className="p-3 text-left">Địa chỉ</th>
                <th className="p-3 text-left">SĐT</th>
                <th className="p-3 text-left">Phân loại SK</th>
                <th className="p-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.STT} className="border-t hover:bg-gray-50">
                  <td className="p-3">{emp.STT}</td>
                  <td className="p-3 font-semibold text-blue-600">{emp.MaNV}</td>
                  <td className="p-3">{emp.HoTen}</td>
                  <td className="p-3">{emp.DiaChi}</td>
                  <td className="p-3">{emp.SDT}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                      {emp.PhanLoaiSK}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {userRole === 'admin' ? (
                      <>
                        <button onClick={() => handleEdit(emp)}
                          className="text-blue-600 hover:underline mr-3">Sửa</button>
                        <button onClick={() => handleDelete(emp.STT)}
                          className="text-red-600 hover:underline">Xóa</button>
                      </>
                    ) : (
                      <span className="text-gray-400">Chỉ xem</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
