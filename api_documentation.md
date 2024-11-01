
## **API Documentation - ERP Sederhana (Gudang Pintar : Sistem Manajemen Inventaris)**

### **Base URL**

- Development: `http://localhost:5000/api/v1`
- Production: `https://yourdomain.com/api/v1`

----------

### **Authentication**

Seluruh endpoint (kecuali login dan register) memerlukan autentikasi dengan **JWT** (JSON Web Token). Setiap permintaan harus menyertakan token dalam header `Authorization`.

#### **1. Register User**

- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Mendaftarkan pengguna baru.
- **Request Body**:

    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string" // Role bisa "admin" atau "staff"
    }

- **Response**:

    ```json
    {
      "status": "success",
      "message": "User registered successfully",
      "data": {
        "userId": "string",
        "name": "string",
        "email": "string",
        "role": "string"
      }
    }

#### **2. Login User**

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Melakukan login dan mendapatkan token JWT.
- **Request Body**:

    ```json
    {
      "email": "string",
      "password": "string"
    }

- **Response**:

    ```json
    {
      "status": "success",
      "message": "Login successful",
      "data": {
        "token": "string"
      }
    }

### **Product Management**

#### **1. Get All Products**

- **URL**: `/products`
- **Method**: `GET`
- **Description**: Mendapatkan semua produk yang tersedia.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:

    ```json
    {
      "status": "success",
      "data": [
        {
          "productId": "string",
          "name": "string",
          "category": "string",
          "price": "number",
          "stock": "number"
        },
        ...
      ]
    }

#### **2. Get Single Product**

- **URL**: `/products/:id`
- **Method**: `GET`
- **Description**: Mendapatkan detail produk berdasarkan ID.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:

    ```json
    {
      "status": "success",
      "data": {
        "productId": "string",
        "name": "string",
        "category": "string",
        "price": "number",
        "stock": "number",
        "description": "string"
      }
    }

#### **3. Create New Product**

- **URL**: `/products`
- **Method**: `POST`
- **Description**: Menambahkan produk baru.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Request Body**:

    ```json
    {
      "name": "string",
      "categoryId": "string",
      "price": "number",
      "stock": "number",
      "description": "string"
    }

- **Response**:

    ```json
    {
      "status": "success",
      "message": "Product created successfully",
      "data": {
        "productId": "string",
        "name": "string",
        "categoryId": "string",
        "price": "number",
        "stock": "number",
        "description": "string"
      }
    }

#### **4. Update Product**

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Description**: Memperbarui detail produk berdasarkan ID.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Request Body**:

    ```json
    {
      "name": "string",
      "categoryId": "string",
      "price": "number",
      "stock": "number",
      "description": "string"
    }

- **Response**:

    ```json
    {
      "status": "success",
      "message": "Product updated successfully"
    }

#### **5. Delete Product**

- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Description**: Menghapus produk berdasarkan ID.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:

    ```json
    {
      "status": "success",
      "message": "Product deleted successfully"
    }

### **Category Management**

#### **1. Get All Categories**

- **URL**: `/categories`
- **Method**: `GET`
- **Description**: Mendapatkan semua kategori produk.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:

    ```json
    {
      "status": "success",
      "data": [
        {
          "categoryId": "string",
          "name": "string"
        },
      ]
    }

#### **2. Create New Category**

- **URL**: `/categories`
- **Method**: `POST`
- **Description**: Menambahkan kategori baru.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Request Body**:

    ```json
    {
      "name": "string"
    }

- **Response**:

    ```json
    {
      "status": "success",
      "message": "Category created successfully",
      "data": {
        "categoryId": "string",
        "name": "string"
      }
    }

#### **3. Update Category**

- **URL**: `/categories/:id`
- **Method**: `PUT`
- **Description**: Memperbarui nama kategori berdasarkan ID.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Request Body**:

    ```json
    {
      "name": "string"
    }

- **Response**:

    ```json
    {
      "status": "success",
      "message": "Category updated successfully"
    }

#### **4. Delete Category**

- **URL**: `/categories/:id`
- **Method**: `DELETE`
- **Description**: Menghapus kategori berdasarkan ID.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:

    ```json
    {
      "status": "success",
      "message": "Category deleted successfully"
    }

### **Inventory Management**

#### **1. Get Inventory Status**

- **URL**: `/inventory`
- **Method**: `GET`
- **Description**: Mendapatkan status stok seluruh produk.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:

    ```json
    {
      "status": "success",
      "data": [
        {
          "productId": "string",
          "name": "string",
          "stock": "number"
        },
      ]
    }

#### **2. Update Stock**

- **URL**: `/inventory/:id`
- **Method**: `PUT`
- **Description**: Memperbarui jumlah stok produk berdasarkan ID.
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Request Body**:

    ```json
    {
      "stock": "number"
    }

- **Response**:

    ```json
    {
      "status": "success",
      "message": "Stock updated successfully"
    }

### **Transaction Management**

#### **1. Get All Transactions**

- **URL**: `/transactions`
- **Method**: `GET`
- **Description**: Mendapatkan daftar semua transaksi (penjualan dan pengadaan).
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:

    ```json
    {
      "status": "success",
      "data": [
        {
          "transactionId": "string",
          "type": "string", // "sale" atau "purchase"
          "date": "date",
          "totalAmount": "number",
          "details": [
            {
              "productId": "string",
              "quantity": "number",
              "price": "number"
            }
          ]
        },
      ]
    }

#### **2. Create New Transaction**

- **URL**: `/transactions`
- **Method**: `POST`
- **Description**: Membuat transaksi baru (penjualan atau pengadaan).
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Request Body**:

    ```json
    {
      "userId": "string",
      "type": "string", // "sale" atau "purchase"
      "date": "date",
      "details": [
        {
          "productId": "string",
          "quantity": "number",
          "price": "number"
        },
      ]
    }

- **Response**:

    ```json
      {
        "status": "success",
        "message": "Transaction created successfully`
      }

### **Laporan Transaksi (Transaction Report)**

#### **1. Get Transaction Report by Date Range**

Retrieve a transaction report sales for a specified date range.

- **Endpoint**: `/reports/transactions`

- **Method**: `GET`

- **Authorization**: Bearer Token (Admin only)

- **Query Parameters**:

  - `start_date` (required): Start date of the report period in `YYYY-MM-DD` format.
  - `end_date` (required): End date of the report period in `YYYY-MM-DD` format.
  - `type` (optional): Filter report by transaction type. Accepts `sales` or `procurement`.
  - `format` (optional): Report file format (`pdf` or `csv`). Default is JSON.
- **Request Example**:

    `GET /api/reports/transactions?start_date=2024-10-01&end_date=2024-10-10&type=sales&format=pdf
    Authorization: Bearer <token>`

- **Response**:

  - **200 OK**: Returns a download link or JSON array of transaction data.

    ```json
        {
          "start_date": "2024-10-01",
          "end_date": "2024-10-10",
          "transaction_type": "sales",
          "transactions": [
            {
              "transaction_id": "TRX001",
              "date": "2024-10-05",
              "product_name": "Laptop ABC",
              "quantity": 5,
              "total_price": 5000000
            },
            {
              "transaction_id": "TRX002",
              "date": "2024-10-07",
              "product_name": "Monitor XYZ",
              "quantity": 2,
              "total_price": 2000000
            }
          ]
        }

  - **File Download Response (PDF/CSV)**: A file download will be triggered with the corresponding report in the specified format (`pdf` or `csv`).

- **Error Responses**:

  - **400 Bad Request**: Missing or invalid parameters.

    ```json
        {
          "error": "Invalid date format. Please use YYYY-MM-DD."
        }

  - **401 Unauthorized** : Invalid or missing authentication token.
  - **403 Forbidden** : User does not have admin privileges.

----------

#### **2. Get Stock Report**

Retrieve a report of available product stock, including current quantities.

- **Endpoint**: `/reports/stock`

- **Method**: `GET`

- **Authorization**: Bearer Token (Admin only)

- **Query Parameters**:

  - `category` (optional): Filter by product category.
  - `format` (optional): Report file format (`pdf`, `csv`). Default is JSON.
- **Request Example**:

    `GET /api/reports/stock?category=electronics&format=csv
    Authorization: Bearer <token>`

- **Response**:

  - **200 OK**: Returns a download link or JSON array of product stock data.

       **Response Example (JSON)**:

       ```json
       {
          "category": "electronics",
          "stock": [
            {
              "product_id": "PRD001",
              "product_name": "Laptop ABC",
              "category": "electronics",
              "available_stock": 25
            },
            {
              "product_id": "PRD002",
              "product_name": "Monitor XYZ",
              "category": "electronics",
              "available_stock": 10
            }
          ]
        }

  - **File Download Response (PDF/CSV)**: A file download will be triggered with the corresponding report in the specified format (`pdf` or `csv`).

- **Error Responses**:

  - **400 Bad Request**: Invalid parameters or category not found.

      ```json
      {
          "error": "Invalid category or category not found."
      }

  - **401 Unauthorized**: Invalid or missing authentication token.
  - **403 Forbidden**: User does not have admin privileges.

##### **3. Download Report (PDF or CSV)**

Allows admin to download a generated report in the chosen format.

- **Endpoint**: `/reports/download`

- **Method**: `GET`

- **Authorization**: Bearer Token (Admin only)

- **Query Parameters**:

  - `report_id` (required): The ID of the report to be downloaded.
  - `format` (required): The format in which the report should be downloaded (`pdf` or `csv`).
- **Request Example**:

    `GET /api/reports/download?report_id=12345&format=pdf
    Authorization: Bearer <token>`

- **Response**:

  - **200 OK**: A download link for the requested report will be provided.
  - **404 Not Found**: If the report ID is invalid or not found.

----------

### **Response Codes Summary**

- **200 OK**: Success, report data or file download.
- **400 Bad Request**: Invalid or missing parameters.
- **401 Unauthorized**: Authentication failed or token missing.
- **403 Forbidden**: Insufficient permissions to access resource.
- **404 Not Found**: Resource or report not found.
