//'use strict';

//const { response } = require("express");

//Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  })
}

//Получение информации о пользователе
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});


//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function updateStocks() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}
updateStocks();
setInterval(updateStocks, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();

//Пополнение баланса
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(response.success, 'Счет пополнен!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
}

//Конвертирование валюты
moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, response => {
    console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(response.success, 'Успешно!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
}

//Перевод валюты
moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, response => {
    console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      this.setMessage(response.success, 'Перевод выполнен!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
}


//Работа с избранным

const favoritesWidget = new FavoritesWidget();

//Начальный список избранного
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

//Добавление пользователя в список избранных
favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      this.clearTable();
      this.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      this.setMessage(response.success, 'Контакт добавлен!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
}

//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, response => {
    console.log(response);
    if (response.success) {
      this.clearTable();
      this.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      this.setMessage(response.success, 'Контакт удален!');
    } else {
      this.setMessage(response.success, response.error);
    }
  });
}