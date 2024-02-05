'use strict';

//const { response } = require("express");

const userForm = new UserForm();
userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if (response.success) {
      location.reload();
    } else {
      this.setLoginErrorMessage('Ошибка. Пользователь не наден.');
    }
  });
}

userForm.registerFormCallback = data => {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      this.setRegisterErrorMessage('Ошибка. Введите другие данные для регистрации.');
    }
  });
}