function MA(datas, n) {
  const lists = datas.map((v, start) => {
    if (start < n) return '';
    const data = datas.slice(start - (n - 1), start + 1);
    const count = data.reduce((x, y) => {
      const x1 = x.c ? x.c / 1 : x;
      const y1 = y.c ? y.c / 1 : y;
      return x1 + y1;
    }, 0);
    return ((count / n).toFixed(2) as any) / 1;
  });
  return lists;
}
function splitData(datas) {
  const categoryData = (datas || []).map((v) => v.d);
  const values = (datas || []).map((v) => [v.o, v.c, v.l, v.h, v.v]);
  const volumes = (datas || []).map((v, i) => [i, v.v, v.o > v.c ? 1 : -1]);
  const closes = (datas || []).map((v, i) => v.c);
  const opens = (datas || []).map((v, i) => v.o);
  const MA10 = MA(datas, 10);
  const MA20 = MA(datas, 20);
  const MA60 = MA(datas, 60);

  return {
    categoryData,
    values,
    volumes,
    MA10,
    MA20,
    MA60,
    closes,
    opens,
  };
}
function calculateMA(dayCount, data) {
  return data[`MA${dayCount}`];
}

function getCallbacks(coords) {
  const areas = coords.map((v) => ({
    brushType: 'lineX',
    coordRange: [v[2], v[3]],
    xAxisIndex: 0,
  }));
  return [
    {
      name: 'dispatchAction',
      params: {
        type: 'brush',
        areas,
      },
    },
  ];
}
function getOptions(datas) {
  const data = splitData(datas);

  return {
    animation: false,
    legend: {
      top: 10,
      left: 'center',
      data: [datas[0].code, 'MA10', 'MA20', 'MA60'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
        color: '#000',
      },
      position: function (pos, params, el, elRect, size) {
        const obj = {
          top: 10,
        };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      // extraCssText: 'width: 170px'
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all',
        },
      ],
      label: {
        backgroundColor: '#777',
      },
    },
    // toolbox: {
    //   feature: {
    //     dataZoom: {
    //       yAxisIndex: false,
    //     },
    //     brush: {
    //       type: ['lineX', 'clear'],
    //     },
    //   },
    // },
    brush: {
      xAxisIndex: 'all',
      brushLink: 'all',
      outOfBrush: {
        colorAlpha: 0.1,
      },
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: '#00da3c',
        },
        {
          value: -1,
          color: '#ec0000',
        },
      ],
    },
    grid: [
      {
        left: '10%',
        right: '8%',
        height: '50%',
      },
      {
        left: '10%',
        right: '8%',
        top: '63%',
        height: '16%',
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100,
        },
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 90,
        end: 100,
      },
      {
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '85%',
        handleSize: '120%',
        handleIcon:
          'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: datas[0].code,
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          color0: '#00da3c',
          color: '#ec0000',
          borderColor: undefined,
          borderColor0: undefined,
        },
        tooltip: {
          formatter: function (param) {
            param = param[0];
            return [
              'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
              'Open: ' + param.data[0] + '<br/>',
              'Close: ' + param.data[1] + '<br/>',
              'Lowest: ' + param.data[2] + '<br/>',
              'Highest: ' + param.data[3] + '<br/>',
            ].join('');
          },
        },
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10, data),
        symbol: 'none',
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20, data),
        symbol: 'none',
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: 'MA60',
        type: 'line',
        data: calculateMA(60, data),
        symbol: 'none',
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes,
      },
    ],
  };
}

function getLineOptions(datas) {
  const data = splitData(datas);
  const legends = ['opens', 'closes'];
  return {
    xAxis: {
      type: 'category',
      data: data.categoryData,
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      data: legends,
    },
    tooltip: {
      trigger: 'axis',
    },
    series: legends.map((v) => {
      return {
        name: v,
        type: 'line',
        smooth: true,
        data: data[v],
      };
    }),
  };
}

export { getOptions, getLineOptions, getCallbacks };
