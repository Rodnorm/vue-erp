<template>
  <div class="hello">
    <template>
      <h1>{{ this.noAdm ? msg : this.msg.replace('Normal', 'Super') }}</h1>

      <ul class="name-list">
        <li>Bruna Sayuri</li>
        <li>Luana Monteiro</li>
        <li>Jonas Ribeiro</li>
        <li>Rodrigo Normando</li>
      </ul>
      <button v-on:click="getProducts" v-if="this.noAdm">Ver produtos</button>
      <Loader v-if="this.showloader"/>
      <div v-if="this.prodLoaded && !this.showloader && this.noAdm" class="table">
        <table>
          <tr>
            <th class="table-title">Nome do Produto</th>
            <th class="table-title">Descrição</th>
            <th class="table-title">Quantidade</th>
          </tr>
          <tr v-for="prod in products" v-bind:key="prod._id">
            <td>{{ prod.name }}</td>
            <td>{{ prod.description }}</td>
            <td>{{ prod.quantity }}</td>
          </tr>
        </table>
        <button v-on:click="hideProducts">Esconder Produtos</button>
      </div>
      <button
        v-if="this.noAdm"
        v-on:click="showOrderPanel = !showOrderPanel"
      >{{ this.showOrderPanel ? this.panelMessage[0] : this.panelMessage[1] }}</button>
      <div v-on:submit="sendEmail" v-if="this.showOrderPanel && this.noAdm" class="order-panel">
        <input v-model="userName" placeholder="insira seu nome" v-if="!this.emailSent">
        <input v-model="productName" placeholder="nome do produto" v-if="!this.emailSent">
        <input v-model="newQuantity" type="number" placeholder="nova quantidade" v-if="!this.emailSent">
        <input
          v-model="email"
          type="email"
          placeholder="email"
          v-bind:class="this.emailError ? 'hasError': ''"
          v-on:keyup="validateEmail()"
          v-if="!this.emailSent"
        >
        <button v-on:click="sendEmail" v-if="!this.emailSent">Enviar</button>
        <Loader v-if="this.emailSent" class="emailSent"/>
      </div>
      <div v-if="!this.noAdm">
        <h1 id="pedidos">Pedidos</h1>
        <div class="table">
          <table>
            <tr>
              <th class="table-title">Nome do Produto</th>
              <th class="table-title">Descrição</th>
              <th class="table-title">Quantidade Requerida</th>
              <th class="table-title">Quantidade no estoque</th>
              <th class="table-title">Origem do pedido</th>
              <th class="table-title">Aprovado?</th>
            </tr>
            <tr v-for="order in orders" v-bind:key="order._id">
              <td>{{ order.name }}</td>
              <td>{{ order.description }}</td>
              <td>{{ order.newQuantity }}</td>
              <td>{{ order.ownedQuantity }}</td>
              <td>{{ order.origin }}</td>
              <td>
                <label class="switch">
                  <input
                    type="checkbox"
                    v-on:click="changeStatus(order)"
                    v-bind:checked="order.approved"
                  >
                  <span class="slider round"></span>
                </label>
              </td>
            </tr>
          </table>
        </div>
        <button v-on:click="saveUpdates">Salvar Alterações e Finalizar</button>
      </div>
    </template>
    <button v-on:click="changeProfile">Trocar perfil</button>
  </div>
</template>

<script>
import firebase from "firebase";
import Loader from "./Loader.vue";
import Notification from "./Notification.vue";
export default {
  name: "HelloWorld",
  components: {
    Loader,
    Notification
  },
  props: {
    msg: String
  },
  mounted() {
    const el = document.createElement("script");
    el.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"
    );
    document.getElementById("app").append(el);
  },
  data: () => {
    return {
      db: undefined,
      orders: [],
      noAdm: true,
      showNotification: false,
      showloader: false,
      prodLoaded: false,
      products: [],
      showOrderPanel: false,
      newQuantity: 0,
      panelMessage: ["Cancelar pedido", "Criar pedido"],
      userName: "",
      productName: "",
      email: "",
      emailError: null,
      Email: null,
      emailSent: false,
      updateCounter: 0,
      hasUpdates: false,
      updateData: {}
    };
  },
  methods: {
    hideProducts() {
      this.prodLoaded = false;
    },
    changeProfile() {
      this.noAdm = !this.noAdm;
    },
    getProducts() {
      this.products = [];
      this.showloader = !this.showloader;
      this.setDatabase();
      this.db
        .collection("produto")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(element =>
            this.products.push({ ...element.data(), _id: element.id })
          );
          this.prodLoaded = true;
          setTimeout(() => (this.showloader = !this.showloader), 1000);
        });
    },
    setDatabase() {
      this.db = firebase.firestore();
      this.db.settings({});
    },
    validateEmail() {
      const emailPattern = new RegExp(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}/g
      );
      this.emailError = !emailPattern.test(this.email);
    },
    sendEmail() {
      event.preventDefault();
      if (!this.products.find(prod => prod.name === this.productName)) {
        throw Error("nome do produto não foi encontrado");
        return;
      }
      this.emailSent = true;
      axios
        .post("http://localhost:3000/email", {
          params: {
            email: this.email,
            name: this.userName,
            productName: this.productName
          }
        })
        .then(resp => {
          this.hasUpdates = true;
          this.updateData = {
            email: this.email,
            name: this.name,
            productName: this.productName
          };
          this.updateCounter++;

          this.orders.push({
            _id: this.id(),
            name: this.productName,
            description: this.products.find(prod =>
              prod.name === this.productName ? prod.description : ""
            ).description,
            origin: `Normal User - ${this.userName}`,
            approved: false,
            ownedQuantity: this.products.find(prod =>
              prod.name === this.productName ? prod.quantity : ""
            ).quantity,
            newQuantity: this.newQuantity
          });
          if (localStorage.getItem("orders")) {
            let oldLocal = JSON.parse(localStorage.getItem("orders"));
            oldLocal.push(this.orders);
            localStorage.setItem("orders", JSON.stringify(oldLocal));
          } else {
            localStorage.setItem("orders", JSON.stringify(this.orders));
          }
          setTimeout(() => {
            this.emailSent = false;
            this.userName = '';
            this.newQuantity = 0;
            this.productName = '';
            this.showOrderPanel = false;
            this.email = '';
          }, 2000);
        });
    },
    id() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    saveUpdates() {},
    changeStatus(order) {
      debugger;
      this.orders.map(ord => {
        if (order._id === ord._id) {
          ord.approved = event.target.checked;
        }
      });
    }
  }
};
</script>
<style>
.table {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

p,
h1,
h2,
h3,
td,
th,
label {
  color: antiquewhite;
}

h1 {
  margin: 0;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

body {
  background-color: #191f26;
}

.hello {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px 0;
}

.name-list {
  color: #ffffff;
  list-style-type: disc;
}

button {
  width: 210px;
  margin: 20px auto;
  border: 1px solid #fff;
  border-radius: 8px;
  background: transparent;
  padding: 20px 10px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}

button:hover {
  text-shadow: 0 0 2px #fff;
  border-color: #fff;
  box-shadow: 0 0 5px 0 #fff;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

li:before {
  content: "";
  background: url(/img/loader.960a1abf.gif) no-repeat center;
  width: 73px;
  height: 74px;
  display: flex;
  background-size: 150px;
}
.table-title {
  border-radius: 8px;
  background: transparent;
  border: 1px solid #fff;
  padding: 0.5rem;
}
.order-panel {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
}

input {
  margin: 0.5rem;
  border-radius: 8px;
}
.hasError {
  border: 2px solid red;
}
.emailSent {
  height: 17rem;
  width: 30rem;
}
#pedidos {
  margin-bottom: 2rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 23px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 12px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
