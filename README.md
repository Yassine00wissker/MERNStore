# 🛒 MERN Marketplace Project

A full-featured **marketplace application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
Includes authentication with roles (**Buyer, Seller, Admin**), product management, orders, payments, multilingual support, and deployment setup.  

---

## 📌 Tech Stack

- **Frontend:** React (Vite), Bootstrap, React-Bootstrap, Axios  
- **Backend:** Node.js, Express, MongoDB (Mongoose)  
- **Authentication:** JWT, bcryptjs  
- **Payments:** PayPal Sandbox Integration

---

## 💳 PayPal Payment Integration

This project includes PayPal sandbox integration for processing payments during checkout.

### Quick Setup

1. **Get PayPal Sandbox Credentials**:
   - Create an account at https://developer.paypal.com/
   - Create a sandbox app and get your Client ID and Client Secret

2. **Configure Backend** (`backend/.env`):
   ```env
   PAYPAL_CLIENT_ID=your_client_id
   PAYPAL_CLIENT_SECRET=your_client_secret
   FRONTEND_URL=http://localhost:5173
   ```

3. **Configure Frontend** (`frontend/.env`):
   ```env
   VITE_PAYPAL_CLIENT_ID=your_client_id
   ```

📖 **For detailed setup instructions, see [PAYPAL_SETUP.md](./PAYPAL_SETUP.md)**  
