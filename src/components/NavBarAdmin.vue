<template>
  <nav class="navbar">
    <div class="navbar-brand">QR App</div>
    <ul class="nav-links">
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Scan QR</a></li>
      <li><a href="#">Email Registration</a></li>
      <li><a href="#">Create QR</a></li>
    </ul>
  </nav>
</template>
<style>
.navbar {
  background-color: #007bff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffcc00;
}

/* Responsive Design */
@media (max-width: 600px) {
  .nav-links {
    flex-direction: column;
    text-align: center;
  }
}
</style>
