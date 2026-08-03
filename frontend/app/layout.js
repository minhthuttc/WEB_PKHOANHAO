import './globals.css'

export const metadata = {
  title: 'Quản lý Nhân viên',
  description: 'Hệ thống quản lý nhân viên',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
