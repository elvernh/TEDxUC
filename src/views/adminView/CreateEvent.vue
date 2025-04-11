<template>
    <div class="bulk-email-container">
      <h1 class="title">Create Pre-Event</h1>
  
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Enter event name"
        />
      </div>
  
      <div class="form-group">
        <label for="type">Type:</label>
        <select id="type" v-model="type">
          <option disabled value="">-- Select Type --</option>
          <option value="Pre Event Day 1">Pre Event Day 1</option>
          <option value="Pre Event Day 2">Pre Event Day 2</option>
          <option value="Pre Event Day 3">Pre Event Day 3</option>
          <option value="Main Event">Main Event</option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="date">Date:</label>
        <input
          id="date"
          v-model="date"
          type="date"
        />
      </div>
  
      <div class="form-group">
        <label for="quota">Quota:</label>
        <input
          id="quota"
          v-model.number="quota"
          type="number"
          placeholder="Enter quota"
        />
      </div>
  
      <div class="form-group">
        <label for="price">Price:</label>
        <input
          id="price"
          v-model.number="price"
          type="number"
          placeholder="Enter price (0 for free)"
        />
      </div>
  
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="description"
          placeholder="Enter event description"
          rows="4"
        ></textarea>
      </div>
  
      <div class="form-group checkbox">
        <label for="requireFoodAllergy">
          <input
            type="checkbox"
            id="requireFoodAllergy"
            v-model="requireFoodAllergy"
          />
          Require Food Allergy Info
        </label>
      </div>
  
      <button @click="submitForm">Submit Pre-Event</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://dickyyyy.site';
  
  const name = ref('');
  const type = ref('');
  const date = ref('');
  const quota = ref(100);
  const price = ref(0);
  const description = ref('');
  const requireFoodAllergy = ref(false);
  
  const submitForm = async () => {
    if (!name.value || !type.value || !date.value || !quota.value || !description.value) {
      alert('Please fill in all required fields.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in!');
        return;
      }
  
      await axios.post(
        `${API_URL}/api/events`,
        {
          name: name.value,
          type: type.value,
          date: new Date(date.value),
          quota: quota.value,
          price: price.value,
          description: description.value,
          requireFoodAllergy: requireFoodAllergy.value
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      alert('Pre-event created successfully!');
      // Optionally reset the form here
    } catch (err) {
      console.error('Error creating event:', err);
      alert('Failed to create event.');
    }
  };
  </script>
  
  <style scoped>
  .bulk-email-container {
    padding: 30px;
    max-width: 600px;
    margin: 50px auto;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 12px;
    text-align: left;
    color: white;
    font-family: 'Inter', sans-serif;
  }
  
  .title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    margin-bottom: 6px;
    font-weight: 500;
  }
  
  input[type="text"],
  input[type="date"],
  input[type="number"],
  textarea,
  select {
    padding: 10px;
    border-radius: 6px;
    border: none;
    font-size: 1rem;
    background-color: #f5f5f5;
    color: #333;
  }
  
  input::placeholder,
  textarea::placeholder {
    color: #999;
  }
  
  .checkbox {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  
  button {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 12px;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  