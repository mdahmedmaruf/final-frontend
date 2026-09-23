# SwiftParcel — Frontend

A modern, responsive web application for managing parcel deliveries. SwiftParcel supports multi-role access (Customers, Admins, and Riders) to seamlessly create, assign, and track parcel delivery statuses in real time.

---

## 🚀 Tech Stack

- **Framework:** React.js (Vite)
- **Routing:** React Router v8.4
- **Styling:** Tailwind CSS
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

---

## 🔑 Demo Credentials

| Role         | Email                  | Password      | Phone            |
| :----------- | :--------------------- | :------------ | :--------------- |
| **Admin**    | `admin@example.com`    | `password123` | `+8801914642486` |
| **Rider**    | `rider@example.com`    | `password123` | `+8801682664379` |
| **Customer** | `customer@example.com` | `password123` | `+8801821740717` |

---

## 🛠️ Features & User Roles

- **Authentication:** User registration and JWT-based authentication.
- **Customer Dashboard:**
    - Request new parcel deliveries with custom delivery addresses and weight.
    - Track active parcel status (`pending`, `approved`, `assigned`, `delivered`, etc.).
- **Admin Dashboard:**
    - Review pending parcel delivery requests.
    - Approve requests and assign riders from the available workforce.
    - Manage users and update roles or details.
- **Rider Dashboard:**
    - View assigned deliveries.
    - Accept or reject incoming parcel delivery assignments.
    - Update fulfillment status in real time.

---

## 📁 Project Structure

```text
src/
├── assets/
├── components/
│   ├── admin/
│   │   ├── EditUserModal.jsx
│   │   ├── ParcelTab.jsx
│   │   ├── UserCard.jsx
│   │   ├── UserFilterBar.jsx
│   │   ├── UserForm.jsx
│   │   └── UsersTab.jsx
│   ├── customer/
│   │   ├── NewParcelForm.jsx
│   │   └── ParcelsCard.jsx
│   ├── AdminDashboard.jsx
│   ├── CustomerDashboard.jsx
│   ├── Header.jsx
│   └── RiderDashboard.jsx
├── context/
│   └── AuthProvider.jsx
├── layouts/
│   ├── Root.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── routes/
│   ├── PrivateRoute.jsx
│   └── routes.jsx
├── services/
│   ├── api.js
├── App.jsx
├── index.css
└── main.jsx
```
