<style>
        /* Unique container class */
        .bulk-email-container {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
  padding: 20px;
}

.bulk-email-box {
  max-width: 400px;
  background: white;
  padding: 20px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.bulk-email-box h2 {
  color: #333;
}

.bulk-email-box select,
.bulk-email-box textarea,
.bulk-email-box button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.bulk-email-box button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

.bulk-email-box button:hover {
  background-color: #218838;
}
</style>

<template>
    <div class="bulk-email-container">
        <div class="bulk-email-box">
            <h2>Send Bulk Email</h2>
            
            <!-- Dropdown to select an event -->
            <label for="eventSelect">Choose Event:</label>
            <select id="eventSelect">
                <option value="event1">Event 1</option>
                <option value="event2">Event 2</option>
                <option value="event3">Event 3</option>
            </select>

            <!-- Textarea for email addresses -->
            <label for="emailList">Enter Emails (comma-separated):</label>
            <textarea id="emailList" rows="4" placeholder="email1@example.com, email2@example.com"></textarea>

            <!-- Send Button -->
            <button onclick="sendBulkEmail()">Send Emails</button>
        </div>
    </div>
</template>