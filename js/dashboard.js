$(document).ready(function(){
    $('.tabs').tabs();
  });


fetch('http://digitalwellbeing-server.azurewebsites.net/usage')
  .then(function(response) {
    return response.json();
  })
  .then(function(serverData) {
    console.log(serverData);
    visualizeData(serverData);
  });


var visualizeData = function(serverData){
  var chart = c3.generate({
      bindto: "#chart1",
      data: {
          columns: serverData.total,
          type: 'donut'
      },
      donut: {
          title: "Most used sites:",
      }
  });  

  var chart = c3.generate({
      bindto: "#chart2",
      data: {
          columns: serverData.desktop,
          type: 'donut'
      },
      donut: {
          title: "Most used sites:",
      }
  });

  var chart = c3.generate({
      bindto: "#chart3",
      data: {
          columns: serverData.mobile,
          type: 'donut'
      },
      donut: {
          title: "Most used sites:",
      }
  });

}

