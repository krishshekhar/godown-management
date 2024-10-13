# Inventory Management System

## Summary

This project is a **React-based Inventory Management System** where users can log in and view items in a grid format. The items can be filtered by different attributes, and users can see detailed information about individual items in a single item view. The application is designed with a sidebar for item filtering and search functionality. It uses preset login credentials and Firebase authentication for session management.

### Demo Video:
- https://drive.google.com/drive/folders/1u6VlvAWg0w-nvZrmOsk7JNxf6EsrPri0?usp=sharing

### Features:
- **Login System**: Users can log in using a preset username and password.
  - Login credentials:  
    - **Username**: `user123`  
    - **Password**: `password123`
  
- **Main Page Components**:
  - **Sidebar**: Filters for managing items (e.g., brand, godown name, etc.).
  - **Search Bar**: Allows users to search items by name or brand.
  - **Item Grid**: Displays items in a grid format with a card view.
  - **Single Item View**: On clicking an item, users can view detailed information about the selected item.
  - **Filter Sidebar**: Filters items based on attributes like brand, size, material, and godown.
  - **Item Count Display**: Shows the number of items currently displayed on the page.

- **Item Details**:
  - Each item includes details like the item's name, price, quantity, brand, size, material, color, and the associated godown.
  - Items marked as "out of stock" are visually indicated with an overlay and transparent image.

- **Navigation and Authentication**:
  - Users are redirected to the login page if they are not logged in.
  - After successful login, users are redirected to the **Home Page**, where they can explore items.

---

## Installation

To run this project locally, follow the steps below:

### Prerequisites:
- Ensure you have **Node.js** and **npm** (Node Package Manager) installed on your machine.
  - You can download Node.js from [here](https://nodejs.org/).

### Steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
- Navigate to the project directory:

- cd <project_directory>
- Install the dependencies:

- npm install

- Start the development server:

- npm start

- This will start the server and the application should be accessible at http://localhost:3000.