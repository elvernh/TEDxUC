<template>
  <div class="tedx-container">
    <!-- Take the Risk Section -->
    <div class="take-risk-section">
      <div class="take-risk-content">
        <h2 class="take-risk-title">TAKE THE RISK?</h2>
        <p class="take-risk-description">
          Ready to join us blablablabla??djnksfbvnsjbdvknz dsnvklfnklbndkszzvlkdnvm dm .
          jaw fjwajfowkafk awmf iadikjnlozknilyhnhd dksng d nsanklvcnklacnsnlnclle
          jdlfkmsdfm dm dMCDLDFSL NF LKMFDL EFSLLJN LijLljef sje fc
        </p>
        <button class="buy-ticket-btn">BUY TICKET</button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="tedx-footer">
      <div class="footer-content">
        <div class="footer-column">
          <div class="footer-logo">
            <span class="tedx-text">TEDx</span>
            <span class="university-text">Universitas Ciputra Surabaya</span>
          </div>
        </div>
        <div class="footer-column">
          <div class="footer-title">
            THE INFINITE MAZE
          </div>
          <div class="footer-copyright">
            2025 All Rights Reserved
          </div>
          <div class="footer-social">
            <a href="#" className="instagram-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'TEDxFooter'
}
</script>


<style scoped>
html, body, #app {
  margin: 0;
  padding: 0rem;
  height: 100%;
  width: 100%;

}

.tedx-container {
  min-height: 100vh;
  max-height: 100%; 
  width: 100vw;
  max-width: 100%; 
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  background-color: black;
  color: white;
  overflow-x: hidden; 
}

.take-risk-section {
  background-color: black;
  padding: 4rem 2rem;
  text-align: center;
  width: 100vw; 
  max-width: 100%;
  box-sizing: border-box; 
}

.take-risk-title {
  color: red;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.take-risk-description {
  color: white;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.7;
}

.buy-ticket-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-ticket-btn:hover {
  background-color: darkred;
}

.tedx-footer {
  background: linear-gradient(to bottom, black, #770000);
  padding: 2rem;
  width: 100vw;
  max-width:100%;
  margin-top: auto;
  box-sizing: border-box;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.footer-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-logo {
  display: flex;
  flex-direction: column;
}

.tedx-text {
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}

.university-text {
  color: white;
  font-size: 1rem;
}

.footer-title {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.footer-copyright {
  color: white;
  opacity: 0.6;
  margin-bottom: 1rem;
}

.footer-social a {
  color: white;
  text-decoration: none;
}
</style>