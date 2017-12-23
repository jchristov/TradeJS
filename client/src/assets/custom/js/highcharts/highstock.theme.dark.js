const HighstockTheme = {
    title: {
        text: ''
    },

    subtitle: {
        text: '',
        style: {
            display: 'none'
        }
    },

    legend: {
        enabled: false
    },

    rangeSelector: {
        enabled:false
    },

    navigator: {
        enabled: false
    },

    scrollbar: {
        enabled: false,
    },

    exporting: { 
        enabled: false 
    },

    credits: {
        enabled: false
    },

    tooltip: {
        crosshairs: false
    },

    labels: {
        style: {
            color: '#707073',
            fontSize: '12px',
            rotation: 0
        }
    },

    colors: ['#67C8FF', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
        '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],

    loading: {
        style: {
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '20px'
        },
        labelStyle: {
            display: 'block',
            width: '136px',
            height: '26px',
            margin: '0 auto',
            backgroundColor: '#000'
        }
    },

    chart: {
        backgroundColor: '#000',
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063',
        resetZoomButton: {
            theme: {
                display: 'none'
            }
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        tickColor: '#707073',
        tickLength: 0,
        minorTickLength: 0,
        minorGridLineColor: '#505053',
        title: {
            style: {
                color: '#A0A0A3'

            }
        },
        type: 'datetime'
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        tickLength: 0,
        gridLineWidth: 1,
        gridLineDashStyle: 'dot',
        gridZIndex: -1,
        lineWidth: 1,
        offset: 0,
        borderWidth: 3,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        split: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            shadow: false,
            animation: false, // Disable initialize animation
            dataLabels: {
                color: '#B0B0B3'
            },
            marker: {
                lineColor: 'white'
            },
            minPointLength: 1
        },
        boxplot: {
            fillColor: '#505053'
        },
        column: {
            borderWidth: 0,
            color: 'rgb(8, 84, 128)'
        },
        candles: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false,
            stacking: 'percent'
        },
        candlestick: {
            lineColor: 'white',
            lineWidth: 0,
            color: '#f00',
            upColor: '#00ee5e'
            // upColor: '#67C8FF'
        },
        errorbar: {
            color: 'white'
        },
        map: {
            shadow: false
        }
    },

    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },

    // special colors for some of the
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
};

// console.log(window.Highcharts);
Highcharts.setOptions(HighstockTheme);