<script lang="ts">
import { ref, onMounted } from "vue";

const selectedPayment = ref("");

onMounted(() => {
  selectedPayment.value = "";
});

export default {
  data() {
    return {
      selectedPayment: null,
    };
  },
};
</script>
  
  
  <template>
  <div
    class="layout-container"
    style="background-image: url('/src/assets/images/background-1.png')"
  >
    <div class="container">
      <img class="logo" src="/src/components/icons/logo-white.svg" alt="logo" />
      <h1 class="title">Payment</h1>

      <form @submit.prevent>
        <div style="color: white; margin-bottom: 10px"></div>
        <input
          type="radio"
          name="payment"
          id="bca"
          v-model="selectedPayment"
          value="bca"
        />
        <input
          type="radio"
          name="payment"
          id="qris"
          v-model="selectedPayment"
          value="qris"
        />

        <div class="category">
          <label for="bca" class="payment-method bcaMethod">
            <div class="imgName">
              <div class="imgContainer">
                <!-- <img src="/src/assets/images/bcaLogo.png" alt="bca" /> -->
              </div>
              <span class="name">BCA Virtual Account</span>
            </div>
          </label>

          <label for="qris" class="payment-method qrisMethod">
            <div class="imgName">
              <div class="imgContainer">
                <!-- <img src="/src/assets/images/qrisLogo.png" alt="qris" /> -->
              </div>
              <span class="name">QRIS</span>
            </div>
          </label>
        </div>

        <div class="payment-details">
          <div v-if="selectedPayment === 'bca'" class="bca-details">
            <h3>BCA Virtual Account Payment</h3>
            <div class="va-number">1111111111</div>
          </div>

          <div v-if="selectedPayment === 'qris'" class="qris-details">
            <h3>QRIS Payment</h3>
            <p>Scan this QR code below</p>
            <div class="qrcode-placeholder">qr</div>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>
  
  
  <style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
}

.background-image{
  background-size: cover;
}

.layout-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.logo {
  position: fixed;
  top: 2rem;
  left: 3rem;
  width: 177px;
  z-index: 100;
}

.title {
  color: rgb(255, 255, 255);
  font-size: 70px;
  margin-bottom: 15px;
  text-align: center;
}

.container {
  width: 600px;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 5px 12px -2px rgba(0, 0, 0, 0.1),
    0 18px 36px -6px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.container form input[type="radio"] {
  display: none;
}

.category {
  margin-top: 10px;
  padding-top: 20px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
}

.payment-method {
  position: relative;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-method:hover {
  background: rgba(255, 255, 255, 0.2);
}

.payment-method.bcaMethod.active,
.payment-method.qrisMethod.active {
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

#bca:checked ~ .category .bcaMethod,
#qris:checked ~ .category .qrisMethod {
  border: 2px solid white;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.payment-details {
  margin: 30px 0;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-height: 200px;
  color: white;
  transition: all 0.3s ease;
}

.payment-details h3 {
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  color: #fff;
}

.bca-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.va-number {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 2px;
  background: rgba(0, 0, 0, 0.3);
  padding: 15px 30px;
  border-radius: 6px;
  font-family: monospace;
}

.qris-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.qris-details p {
  margin-bottom: 10px;
  text-align: center;
}

.qrcode-placeholder {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 10px 0;
}

.imgName {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.imgName span {
  /* margin-left: 20px; */
  position: absolute;
  font-weight: bold;
  margin-top: 80px;
}

.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 35%;
  transform: translateY(-35%);
}

img {
  width: 100px;
  height: auto;
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}


@media (max-width: 768px) {
  .container {
    width: 90%;
    padding: 30px 20px;
  }
  
  .category {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 50px;
  }
}
</style>