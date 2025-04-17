
### Chia nhiệm vụ vấn đáp
1. Post Management Module (Duy)
- Tạo/Sửa/Xóa bài đăng
- Xem chi tiết phòng trọ
- Quản lý bài đăng cá nhân
2. Search & Filter Module (Giáp)
- Tìm kiếm phòng trọ
- Bộ lọc (giá, diện tích, địa chỉ)
- Sắp xếp kết quả
3. Admin Dashboard Module (Phong, Uy)
- Quản lý người dùng
- Quản lý bài đăng
- Thống kê và báo cáo
- Comments
- Ratings
- Chỉnh sửa thông tin cá nhân

Hướng dẫn chạy source

### Yêu cầu

- Máy tính phải cài các phần mềm sau: `vscode`, `dbeaver`+`mysql server` hoặc `xampp`, `nodejs`, `npm`
- Chuẩn bị 1 số điện thoại

### Tải source về từ hoặc drive

![enter image description here](https://i.ibb.co/1T1CtXj/image.png)
Sau khi giải nén:
![enter image description here](https://i.ibb.co/3dYvT7T/image.png)

### Mở source bằng VS Code

![enter image description here](https://i.ibb.co/Bs4MV7v/image.png)

### Trong forder server, tạo file mới, đặt tên là `.env`. Sau đó copy đoạn code dưới paste vào

```
PORT  = 5000

CLIENT_URL  = http://localhost:5173

SECRET_JWT_KEY  = daylamatkhauratmanh

DB_NAME  = phongtro

DB_HOST  = localhost

DB_PASSWORD  =

DB_DIALECT  = mysql
 
DB_PORT=3306

DB_USERNAME  = root

JWT_SECRET  = daylamatkhauratmanh

LIMIT  = 5

DEFAULT_DAYS  = 5

TWILLO_ACCOUNT_SSD=

TWILLO_AUTH_TOKEN=

TWILLO_SERVICE_SID=
```

Các biến môi trưởng ở trên thì `DB_USERNAME` và `DB_PASSWORD` tùy thuộc vào máy tính của bạn đặt lúc cài đặt `mysql server`. Mặc định `DB_USERNAME = root` và `DB_PASSWORD = null (để trống)`.
Còn 3 biến `TWILLO_ACCOUNT_SSD`, `TWILLO_AUTH_TOKEN`, `TWILLO_SERVICE_SID` lấy từ ứng dụng Twilio, sẽ có hướng dẫn bên dưới.

### Hướng dẫn đăng ký và lấy các `API_KEY` từ ứng dụng Twilio

![enter image description here](https://i.ibb.co/hdSt1pc/image.png)
![enter image description here](https://i.ibb.co/sRnDgY4/image.png)
![K](https://i.ibb.co/YNw6T3m/image.png)
Kiểm tra Email đã đăng ký và copy code dán vào rồi bấm `Verify`.
![enter image description here](https://i.ibb.co/JHLx2K7/image.png)
Sau khi xác minh Email xong sẽ tới phần quan trọng nhất là xác minh số điện thoại. Lưu ý phần này cần phải làm chính xác nếu không sẽ phải đổi số điện thoại khác 🫡.
==> **Lúc nhập số điện thoại thì phải bỏ số 0 ở đầu đi, ví dụ SĐT là 01234567890 thì chỉ nhập là 1234567890**.
![enter image description here](https://i.ibb.co/BcCPPfC/image.png)
![enter image description here](https://i.ibb.co/G97MV3G/image.png)
![enter image description here](https://i.ibb.co/rvbBDgG/image.png)
Lưu lại và bấm `Continue`.
![enter image description here](https://i.ibb.co/1XNwMf3/image.png)
![enter image description here](https://i.ibb.co/k8FrcYt/image.png)
![enter image description here](https://i.ibb.co/BKj7mWy/image.png)
![enter image description here](https://i.ibb.co/hMsgsdQ/image.png)
![enter image description here](https://i.ibb.co/FYsXRMB/image.png)
![enter image description here](https://i.ibb.co/09xLP91/image.png)
Tại trang Home sẽ lấy được 2 biến `TWILLO_ACCOUNT_SSD`, `TWILLO_AUTH_TOKEN`, còn biến bấm vào `Start building` nút màu xanh.
![enter image description here](https://i.ibb.co/C0nJqbf/image.png)
Biến `TWILLO_SERVICE_SID` lấy từ ô màu đỏ.

### Trong forder client, tạo file mới đặt tên `.env`, và copy đoạn dưới đây

```
VITE_SERVER_URL  = http://localhost:5000/api

VITE_TINYCME_ID  =

VITE_CLOUDINARY_NAME  =

VITE_CLOUDINARY_PRESET_UPLOAD=phongtro

VITE_API_GEOAPIFY  =

VITE_LIMIT  = 5

VITE_PRICE_EXTEND  = 2000

VITE_PHONE_ADMIN  =
```

Trong đó:

- `VITE_TINYCME_ID` lấy từ website [Ở đây](https://www.tiny.cloud/my-account/integrate/#html)
  ![enter image description here](https://i.ibb.co/6RH2jV1/image.png)
- Đăng ký tài khoản Cloudinary [Ở đây](https://cloudinary.com/users/login)
  ![enter image description here](https://i.ibb.co/7XY1SsH/image.png)
  Biến `VITE_CLOUDINARY_NAME` lấy như trên hình.
  Vào mục Setting.
  ![enter image description here](https://i.ibb.co/fHFRRdV/image.png)
  ![enter image description here](https://i.ibb.co/R6Fd7vr/image.png)
- Tạo Presset `phongtro`
  ![enter image description here](https://i.ibb.co/17ZLCKK/image.png)
- Biến `VITE_API_GEOAPIFY` được lấy từ website [này](https://myprojects.geoapify.com/login).
  ![enter image description here](https://i.ibb.co/cC249Nz/image.png)
  ![enter image description here](https://i.ibb.co/FDjfMxD/image.png)
- Biến `VITE_PHONE_ADMIN` là số điện thoại của bạn (có đăng ký zalo).

### Mở mysql server và tạo mới database tên `phongtro`

![enter image description here](https://i.ibb.co/QcWm23M/image.png)

### Mở ứng dụng dbeaver và kết nối với database vừa mới tạo

### Tại terminal forder server

- Chạy lệnh `npm install` để tải thư viện
- Chạy lệnh `npm run init` để tạo và insert database
- Chạy lệnh `npm run dev` để chạy dự án

### Tại terminal forder client

- Chạy lệnh `npm install` để tại thư viện
- Chạy lệnh `npm run dev` để chạy dự án

