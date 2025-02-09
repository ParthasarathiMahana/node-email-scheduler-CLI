# 📧 CLI-Based Email Scheduler (Using BullMQ)

A command-line tool to schedule and send emails at a specified time using **Node.js** and **BullMQ**. Users can schedule emails via CLI commands, and the system will enqueue them in **Redis** using BullMQ, ensuring reliable and scalable job scheduling.

Additionally, an Express API is provided for listing and scheduling emails via **Postman**.

---

## 📌 Features
- 💜 **Schedule emails** using the command line.
- ⏳ **Uses BullMQ (Redis-based queue)** for reliable scheduling.
- 📡 **REST API** for scheduling emails and listing pending jobs.
- 🎠 **Worker-based architecture** for handling scheduled emails.
- 📴 **Resilient against restarts** (Jobs are stored in Redis).
- ✨ **Scalable** (Multiple workers can process jobs in parallel).

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
   SMTP_SERVICE=gmail
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-email-password
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   ```
4. **Start Redis (if not running)**
   - If Redis is not installed, install it from [here](https://redis.io/docs/getting-started/installation/).
   - Start Redis server:
   ```sh
   redis-server
   ```

---

## 🚀 Usage

### **1️⃣ Schedule an Email via CLI**
Run the following command:
```sh
node producer.js --to recipient@example.com --subject "Meeting Reminder" --message "Join the meeting at 3 PM." --delay 3600000
```
**What happens?**
- The job is added to the **BullMQ queue** in Redis.
- A worker picks up the job at the scheduled time and sends the email.

---

### **2️⃣ Start the BullMQ Worker**
The worker listens for jobs and processes them when the time comes.
```sh
node worker.js
```

---

### **3️⃣ Start the API Server (Optional for Postman Users)**
Start the server to use the API:
```sh
node server.js
```
#### **API Endpoints:**
- **GET** `/jobs` → List all scheduled jobs.
- **POST** `/schedule` → Schedule an email via API.

**Example POST request (JSON Body):**
```json
{
  "to": "recipient@example.com",
  "subject": "Follow Up",
  "message": "Let's catch up tomorrow!",
  "delay": 3600000
}
```

---

## 🏢 Developer Guide

### **Project Structure**
```
email scheduler CLI/
│── producer.js          # Adds email jobs to the queue
│── worker.js            # Listens to the queue and sends emails
│── server.js            # Express API for scheduling emails
│── queue.js             # BullMQ queue setup
│── package.json         # Project dependencies
│── .env                 # SMTP & Redis credentials
```

### **Technologies Used**
- **Node.js** (Backend logic)
- **BullMQ** (Job queue for scheduling)
- **Redis** (Persistent job storage)
- **NodeMailer** (Sending emails)
- **Express.js** (For API endpoints)

---

👨‍💻 **Happy Coding!** 🚀

