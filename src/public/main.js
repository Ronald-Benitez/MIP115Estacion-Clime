// io('http://localhost:3000'); para server diferente al local
const socket = io(); // para server local

const labels = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
const temperatura = [];
const presion = [];
const humedad = [];
const intensidad = [];
const lluvias = [];
const fechas = [];


//Gráfico de temperatura
const grafTemperatura = new Chart(
  document.querySelector("#temperatura"),
  {
    type: "line",
    data: {
      labels: labels,
      datasets:[{
        label: "Temperatura (°C)",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: temperatura,
      }]
    },
    options:{}
  }
);


//Grafico de presion
const grafPresion = new Chart(
  document.querySelector("#presion"),
  {
    type: "line",
    data: {
      labels: labels,
      datasets:[{
        label: "Presion (hPa)",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: presion,
      }]
    },
    options:{}
  }
);

//Grafico de humedad
const grafHumedad = new Chart(
  document.querySelector("#humedad"),
  {
    type: "line",
    data: {
      labels: labels,
      datasets:[{
        label: "Humedad (%)",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: humedad,
      }]
    },
    options:{}
  }
);  

//Grafico de lluvias
const grafLluvia = new Chart(
  document.querySelector("#lluvias"),
  {
    type: "line",
    data: {
      labels: labels,
      datasets:[{
        label: "Lluvias (1 = lluvia, 0 = no lluvia)",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: lluvias,
      }]
    },
    options:{}
  }
);

//Gráfico de intensidad de luz
const grafIntensidad = new Chart(
  document.querySelector("#intensidad"),
  {
    type: "line",
    data: {
      labels: labels,
      datasets:[{
        label: "Intensidad luminica",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: intensidad,
      }]
    },
    options:{}
  }
);

//Función para cambiar los datos de los gráficos
const changeData = (char,data) => {
  char.data.datasets[0].data = data;
  char.update();
}

//Función que verifica el ingreso de nueva información
socket.on("server:post", (data) => {
  temperatura.splice(0,temperatura.length); //Limpias datos previos
  presion.splice(0,presion.length);         //Limpias datos previos
  humedad.splice(0,humedad.length);         //Limpias datos previos
  intensidad.splice(0,intensidad.length);   //Limpias datos previos
  lluvias.splice(0,lluvias.length);         //Limpias datos previos
  fechas.splice(0,fechas.length);           //Limpias datos previos

  let data2 = data[0];                      //Obtenes los datos
  data2.forEach((element) => {              //Recorrido de datos
    temperatura.push(element.temperatura);  //Agrega datos a los arreglos
    presion.push(element.presion);
    humedad.push(element.humedad);
    intensidad.push(element.intensidad);
    lluvias.push(element.lluvias);
    fechas.push(element.createdAt);
  });

  //Cambia los datos de los gráficos
  changeData(grafTemperatura,temperatura.reverse());
  changeData(grafIntensidad,intensidad.reverse());
  changeData(grafHumedad,humedad.reverse());
  changeData(grafLluvia,lluvias.reverse());
  changeData(grafPresion,presion.reverse());


});
