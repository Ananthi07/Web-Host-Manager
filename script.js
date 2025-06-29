const form = document.getElementById("clientForm");
const clientList = document.getElementById("clientList");
let clients = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const domain = document.getElementById("domain").value;
  const client = {
    id: Date.now(),
    name,
    email,
    domain,
  };
  clients.push(client);
  saveClients();
  form.reset();
  displayClients();
});
function saveClients() {
  localStorage.setItem("clients", JSON.stringify(clients));
}
function loadClients() {
  const storedClients = localStorage.getItem("clients");
  if (storedClients) {
    clients = JSON.parse(storedClients);
  }
}
function deleteClient(id) {
  clients = clients.filter(client => client.id !== id);
  saveClients();
  displayClients();
}
function displayClients() {
  clientList.innerHTML = "";
  if (clients.length === 0) {
    clientList.innerHTML = "<p>No clients added yet.</p>";
    return;
  }
  clients.forEach(client => {
    const div = document.createElement("div");
    div.className = "client";
    div.innerHTML = `
      <strong>Name:</strong> ${client.name}<br/>
      <strong>Email:</strong> ${client.email}<br/>
      <strong>Domain:</strong> ${client.domain}
      <button class="delete-btn" onclick="deleteClient(${client.id})">Delete</button>
    `;
    clientList.appendChild(div);
  });
}
loadClients();
displayClients();
