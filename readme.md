# 📧 CLI-Based Email Scheduler

A command-line tool to schedule and send emails at a specified time using **Node.js**. Users can schedule emails via CLI commands, and the system will send them automatically using **NodeMailer**. Additionally, an Express API is provided for listing and scheduling emails via **Postman**.

## 📌 Features
- 📜 **Schedule emails** using the command line.
- 📂 **Stores pending emails** in `emails.json`.
- ⏳ **Sends emails automatically** at the scheduled time.
- 📡 **REST API** for scheduling emails and listing scheduled ones.
- 🎯 **Event-driven architecture** using Node.js `events` module.

---

## 🛠 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ParthasarathiMahana/node-email-scheduler-CLI.git
   cd node-email-scheduler-CLI
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the project root:
   ```
   SMTP_HOST=smtp.yourprovider.com
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-email-password
   ```

---

## 🚀 Usage

### **1️⃣ Schedule an Email via CLI**
Run the following command:
```sh
node index.js --to recipient@example.com --subject "Meeting Reminder" --message "Join the meeting at 3 PM." --time "15:00"
```
**What happens?**
- The email is stored in `emails.json`.
- A confirmation message is displayed.
- The email is sent at `15:00` automatically.

---

### **2️⃣ Start the API Server (Optional for Postman Users)**
Start the server to use the API:
```sh
node server.js
```
#### **API Endpoints:**
- **GET** `/emails` → List all scheduled emails.
- **POST** `/schedule` → Schedule an email via API.

**Example POST request (JSON Body):**
```json
{
  "to": "recipient@example.com",
  "subject": "Follow Up",
  "message": "Let's catch up tomorrow!",
  "time": "10:00"
}
```

---

## 🏗 Developer Guide

### **Project Structure**
```
email scheduler CLI/
│── emails.json          # Stores scheduled emails
│── index.js             # Main CLI script
│── emailScheduler.js     # Handles scheduling & sending emails
│── eventHandler.js       # Manages custom events
│── server.js             # Express API for Postman users
│── package.json          # Project dependencies
│── .env                 # SMTP credentials
```

### **Technologies Used**
- **Node.js** (for backend logic)
- **NodeMailer** (for sending emails)
- **fs (File System)** (to store scheduled emails)
- **events** (for event-driven handling)
- **Express.js** (for API endpoints)

---

👨‍💻 **Happy Coding!** 🚀