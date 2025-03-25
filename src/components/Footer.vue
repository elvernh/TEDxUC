import logo from "@/components/icons/logo-white.svg";

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

    <footer class="tedx-footer">
      <div class="footer-content">
        <div class="footer-column">
          <div class="footer-logo">
           <span class="tedx-logo">
  TED<span class="tedx-small">x</span>
</span>

            <span class="university-text">Universitas Ciputra</span>
                <span class="university-text">Surabaya</span>
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
            <a href="https://www.instagram.com/tedxuniversitasciputrasurabaya" target="_blank" class="social-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>
  <a href="https://www.linkedin.com/in/tedxuniversitasciputrasurabaya" target="_blank" class="social-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
      <path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5S1.1 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8.5h4v12h-4zm7.5 0h4v1.85h.06c.56-1.06 1.93-2.18 3.94-2.18 4.2 0 4.97 2.76 4.97 6.35v7.98h-4v-7.08c0-1.69-.03-3.87-2.36-3.87-2.37 0-2.73 1.84-2.73 3.74v7.21h-4z"/>
    </svg>
  </a>
  <a href="mailto:tedxuniversitasciputrasurabaya@gmail.com" target="_blank" class="social-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
      <path d="M12 12.713l11.998-7.692v12.98c0 1.017-.842 1.999-1.889 1.999H1.889C.841 19.999 0 19.018 0 18V5.021l11.999 7.692zm0-2.713L1.013 3h21.974L12 10z"/>
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
  background-color: black;
  color: white;
  overflow-x: hidden;
 
}
.tedx-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px; /* Sesuaikan tinggi shadow */
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000 100%);
  pointer-events: none;
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
  font-size: 3.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.take-risk-description {
  color: white;
  max-width: 800px;
  font-size: 1.3rem;
  margin: 0 auto 2rem;
}

.buy-ticket-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Axia Stencil", sans-serif;
  font-wight: bold
  
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
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.footer-copyright {
  color: white;
  margin-bottom: 1rem;
}

.footer-social a {

  color: white;
  text-decoration: none;
}

.tedx-logo {
  font-size: 1.6rem; 
  font-weight: bold;
  color: red;
  font-family: sans-serif;
}

.tedx-small {
  font-size: 1rem; 
  vertical-align: top; 
}
.footer-social {
  display: flex;
  align-items: center;
  gap: 12px; 
}



</style>
