let allOrdersDisplay = document.getElementById("allOrdersDisplay")
let newEmailTextBox = document.getElementById("newEmailTextBox")
let newCoffeeTextBox = document.getElementById("newCoffeeTextBox")
let createNewOrder = document.getElementById("createNewOrder")
let searchTextBox = document.getElementById("searchTextBox")
let fetchCoffeeOrder = document.getElementById("fetchCoffeeOrder")
let searchDisplay = document.getElementById("searchDisplay")
let deleteTextBox = document.getElementById("deleteTextBox")
let deleteCoffeeOrder = document.getElementById("deleteCoffeeOrder")

function refreshPage(timeoutPeriod) {
  setTimeout("location.reload(true);", timeoutPeriod)
}

function displayAllOrders() {

  let ordersURL = "http://dc-coffeerun.herokuapp.com/api/coffeeorders/"

  fetch(ordersURL)
  .then(function(response){
    return response.json()
  }).then(function(orderInfo){
    Object.keys(orderInfo).forEach(function(order) {
      let orders =  `<li id="order">
                    <span>"Email: ${orderInfo[order].emailAddress}"</span>
                    <span>"Coffee: ${orderInfo[order].coffee}"</span>
                    </li>`

      allOrdersDisplay.innerHTML += orders
    })
  })
}

displayAllOrders()

createNewOrder.addEventListener("click", function() {

  let paramsToSend = {emailAddress: newEmailTextBox.value, coffee: newCoffeeTextBox.value}

  console.log(JSON.stringify(paramsToSend))

  fetch("http://dc-coffeerun.herokuapp.com/api/coffeeorders/", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(paramsToSend)
  }).then(function(response){
    return response.json()
  }).then(function(newOrderInfo){
    alert("The order has been added.")
    refreshPage()
  })
})

fetchCoffeeOrder.addEventListener("click", function() {

  let emailURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchTextBox.value}`

  fetch(emailURL)
  .then(function(response){
    return response.json()
  }).then(function(searchOrderInfo){
    console.log(searchOrderInfo)
    searchDisplay.innerHTML = `<li id="searchOrder">
                              <span>"Email: ${searchOrderInfo.emailAddress}"</span>
                              <span>"Coffee: ${searchOrderInfo.coffee}"</span>
                              </li>`
  })
})

deleteCoffeeOrder.addEventListener("click", function() {

  fetch(`http://dc-coffeerun.herokuapp.com/api/coffeeorders/${deleteTextBox.value}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  }).then(function(response){
    return response.json()
  }).then(function(deleteOrderInfo){
    alert("The order has been deleted.")
    refreshPage()
  })
})
