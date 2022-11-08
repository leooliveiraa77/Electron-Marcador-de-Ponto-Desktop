import { deleteElHandler, deleteId, statusHandler, updateStorage, renderHistoricElements, dataFromUserLogout, localDataHandler } from './assets/js/app.js';
import { keyEnv } from './environment.js';

export const exportDataSheet = (name, login, logout, date, justification, userDataObj) => {
  axios
    .post(
      keyEnv.tableAdressServer,
      {
        data: {
          name: name,
          login: login,
          logout: logout,
          date: date,
          justification: justification,
          userData: userDataObj,
        },
      },
      {
        auth: {
          username: keyEnv.tableIdServer,
          password: keyEnv.tableTokenServer,
        },
      }
    )
    .then((response) => {
      console.log(response.status);
      if (response.status === 201) {
        alert('Registrado com sucesso. Até a próxima PETIANO');
        deleteElHandler(deleteId);
        updateStorage(name);
        dataFromUserLogout.push(userDataObj);
        console.log(dataFromUserLogout);
        localDataHandler('myHistory', dataFromUserLogout);
        renderHistoricElements(name, login, date, logout);
        statusHandler();
      } else {
        alert('Erro ' + response.status);
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('1' + error.response.data);
        console.log('2' + error.response.status);
        console.log('3' + error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('4' + error.request);
        alert('Erro: ' + error + ' \n Provavelmente sem conexão com internet :(');
        statusHandler();
      } else {
        statusHandler();
        console.log('Erro: ' + error.message);
      }
    });
};
