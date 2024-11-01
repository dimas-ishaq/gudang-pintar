### **Fungsional Requirements:**

1. **Manajemen Pengguna (User Management)**

    - Aplikasi harus memungkinkan admin untuk menambahkan, memperbarui, menghapus, dan melihat daftar pengguna.
    - Pengguna harus dapat login menggunakan email dan password yang valid.
    - Pengguna harus dapat logout dari sistem setelah selesai menggunakan aplikasi.
    - Sistem harus memberikan token autentikasi (JWT) kepada pengguna yang berhasil login.
2. **Manajemen Produk (Product Management)**

    - Admin dapat menambahkan produk baru ke dalam sistem dengan rincian seperti nama produk, kategori, harga, stok, dan deskripsi.
    - Admin dapat mengedit detail produk yang sudah ada, termasuk memperbarui informasi stok.
    - Admin dapat menghapus produk dari sistem.
    - Sistem harus menampilkan daftar semua produk yang ada di inventaris.
3. **Manajemen Kategori (Category Management)**

    - Admin dapat menambah kategori baru untuk produk.
    - Admin dapat mengedit nama kategori yang sudah ada.
    - Admin dapat menghapus kategori yang tidak lagi dibutuhkan.
    - Sistem harus menampilkan daftar semua kategori yang tersedia.
4. **Manajemen Stok Produk (Inventory Management)**

    - Admin atau staff dapat memperbarui stok produk secara manual.
    - Sistem harus otomatis memperbarui stok produk berdasarkan transaksi penjualan atau pengadaan.
5. **Manajemen Transaksi (Transaction Management)**

    - Admin atau staff dapat mencatat transaksi penjualan dengan memilih produk dan jumlah yang dijual.
    - Admin atau staff dapat mencatat transaksi pengadaan untuk menambah stok produk.
    - Sistem harus menghitung total transaksi berdasarkan harga produk dan jumlah yang dijual/dibeli.
    - Sistem harus memperbarui stok produk sesuai transaksi penjualan atau pengadaan.
6. **Laporan (Reporting)**

    - Admin dapat menghasilkan laporan transaksi, baik penjualan maupun pengadaan.
    - Admin dapat menghasilkan laporan stok produk yang tersedia.
    - Sistem harus memungkinkan admin untuk memilih rentang waktu atau filter lain untuk laporan.
    - Admin dapat mengunduh laporan dalam format tertentu (misalnya, PDF atau CSV).
7. **Autentikasi dan Otorisasi (Authentication & Authorization)**

    - Aplikasi harus membedakan hak akses antara admin dan staff.
    - Hanya admin yang dapat melakukan manajemen pengguna, produk, kategori, dan stok.
    - Sistem harus memverifikasi identitas pengguna melalui autentikasi (JWT) untuk setiap endpoint yang membutuhkan hak akses.

### **Non-Fungsional Requirements:**

1. **Keamanan (Security)**

    - Sistem harus menggunakan enkripsi untuk menyimpan password pengguna (misalnya, bcrypt).
    - Semua endpoint yang memerlukan autentikasi harus dilindungi menggunakan token JWT.
    - Hanya pengguna yang terotorisasi yang dapat mengakses fitur tertentu, seperti manajemen produk dan pengguna.
2. **Kinerja (Performance)**

    - Sistem harus dapat menangani sejumlah besar produk dan transaksi dengan respons yang cepat.
    - Laporan harus dihasilkan dalam waktu yang wajar, bahkan jika rentang waktu yang dipilih sangat besar.
3. **Skalabilitas (Scalability)**

    - Aplikasi harus didesain agar dapat dengan mudah dikembangkan untuk menangani lebih banyak pengguna atau data inventaris yang besar di masa mendatang.
4. **Ketersediaan (Availability)**

    - Sistem harus dirancang untuk selalu tersedia bagi pengguna selama jam operasional bisnis.
    - Waktu downtime harus diminimalkan, terutama untuk manajemen transaksi dan stok.
5. **Pengelolaan Kesalahan (Error Handling)**

    - Aplikasi harus menampilkan pesan kesalahan yang jelas jika terjadi kesalahan saat melakukan operasi (misalnya, gagal login, stok tidak cukup).
    - Sistem harus menangani validasi input pengguna dan memberikan umpan balik jika ada kesalahan input.
6. **Portabilitas (Portability)**

    - Aplikasi harus dapat berjalan di berbagai platform web modern (seperti Chrome, Firefox, Edge).
    - Aplikasi harus dapat di-deploy pada lingkungan cloud atau server lokal dengan mudah.
7. **Audit Log**

    - Sistem harus mencatat semua aktivitas penting, seperti transaksi, perubahan stok, dan manajemen pengguna untuk keperluan audit.
    - Admin harus dapat melihat log aktivitas pengguna di sistem.
8. **Pengalaman Pengguna (User Experience)**

    - Antarmuka pengguna harus mudah digunakan oleh admin dan staff dengan alur kerja yang jelas.
    - Aplikasi harus memiliki navigasi yang responsif dan tata letak yang bersih, terutama untuk menampilkan data inventaris dan transaksi.

### **Teknologi yang Direkomendasikan:**

1. **Frontend**:

    - React.js untuk membangun antarmuka pengguna yang interaktif dan dinamis.
    - Redux atau React Context untuk manajemen state global.
2. **Backend**:

    - Express.js untuk API backend yang RESTful.
    - JWT (JSON Web Token) untuk autentikasi dan otorisasi.
    - Sequelize atau Prisma sebagai ORM untuk berinteraksi dengan database (PostgreSQL atau MySQL).
3. **Database**:

    - PostgreSQL atau MySQL sebagai database relasional untuk menyimpan data produk, kategori, transaksi, dan pengguna.
4. **Deployment**:

    - Docker untuk containerization dan manajemen lingkungan.
    - Hosting pada platform cloud seperti Heroku, AWS, atau DigitalOcean.
