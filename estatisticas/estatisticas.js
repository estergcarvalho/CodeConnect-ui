$(document).ready(function() {
  const postagens = new CountUp('countPost', 0, 867);
  const curtidas = new CountUp('countLike', 0, 3867);
  const compartilhamento = new CountUp('countShared', 0, 863);
  const comentarios = new CountUp('countComments', 0, 567);
  
  if (!postagens.error || !curtidas.error || !compartilhamento.error || !comentarios.error) {
    postagens.start();
    curtidas.start();
    compartilhamento.start();
    comentarios.start();
  }

  var estatisticaAmigos = echarts.init($('#friends')[0]);
  var optionAmigos = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [123, 290, 524, 418, 135, 347],
        type: 'line',
        itemStyle: {
          color: '#64CCC5'
        }
      }
    ]
  };

  estatisticaAmigos.setOption(optionAmigos);

  var estatisticasCurtidas = echarts.init($('#likes')[0]);
  var optionCurtidas = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 29, 52, 18, 158, 32],
        type: 'bar',
        itemStyle: {
          color: '#daa520'
        }
      }
    ]
  };

  estatisticasCurtidas.setOption(optionCurtidas);

  var estatisticasCargosAmigos = echarts.init($('#jobsFriends')[0]);
  var optionCargos = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        label: {
          color: 'white',
          borderColor: 'white'
        },
        name: 'Cargo',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 148, name: 'Desenvolvedor Backend' },
          { value: 378, name: 'Analista Big Data' },
          { value: 98, name: 'Cientista de dados' },
          { value: 251, name: 'Quality Analyst' },
          { value: 216, name: 'Desenvolvedor Full Stack' },
          { value: 65, name: 'Product Owner' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetx: 0,
            shadowColor: 'rgba(0,0,0,0,0)',
            color: '#daa520'
          }
        }
      }
    ]
  };

  estatisticasCargosAmigos.setOption(optionCargos);
});

