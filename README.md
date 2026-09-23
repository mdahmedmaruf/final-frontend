# SwiftParcel — Frontend

A modern, responsive web application for managing parcel deliveries. SwiftParcel supports multi-role access (Customers, Admins, and Riders) to seamlessly create, assign, and track parcel delivery statuses in real time.

---

## 🚀 Tech Stack

- **Framework:** React.js (Vite)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

---

## 🛠️ Features & User Roles

- **Authentication:** User registration and JWT-based authentication.
- **Customer Dashboard:**
    - Request new parcel deliveries with custom delivery addresses and weight.
    - Track active parcel status (`pending`, `approved`, `assigned`, `delivered`, etc.).
- **Admin Dashboard:**
    - Review pending parcel delivery requests.
    - Approve requests and assign riders from the available workforce.
- **Rider Dashboard:**
    - View assigned deliveries.
    - Accept or reject incoming parcel delivery assignments.
    - Update fulfillment status in real time.

---

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── customer/        # Customer-specific card & modal views
│   ├── admin/           # Admin assignment and approval controls
│   └── ParcelsCard.jsx  # Shared parcel display component
├── context/             # React Context (AuthProvider, etc.)
├── pages/               # Route pages (Login, Register, Dashboards)
├── services/            # API base configurations and endpoints
└── App.jsx              # Application router setup
```
