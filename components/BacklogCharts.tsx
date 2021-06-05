import Plot from 'react-plotly.js'
import makeTemplate from 'react-plotly.js'

// default layout items for Plotly.js charts
var tarpeydevLayout = {
  paper_bgcolor: 'rgba(0,0,0,1)',
  plot_bgcolor: 'rgba(255,255,255,0.2)',
  font: {
      color: '#FFFFFF',
      size: 16,
  },
  hoverlabel: {
      font: {
          color: '#FFFFFF',
      },
      bgcolor: '#555555',
  },
  title: {x:0.05},
  xaxis: {
      gridcolor: '#555555',
      showgrid: true,
      showline: true,
  },
  yaxis: {
      gridcolor: '#555555',
      showgrid: true,
      showline: true,
  },
};

var tarpeydevDefault = makeTemplate({
  layout: tarpeydevLayout,
});

export function TimelineChart (chartData) {
  var xDataClean = [];
  // we just need a loop over the x data to convert
  // to datetime
  for ( var i = 0; i < chartData['x_data_dates'].length; i ++ ) {
    xDataClean[i] = new Date(chartData['x_data_dates'][i])
  };
  var plotData = [
    {x: xDataClean, y: chartData['y_data_c'], name: 'Completed', hovertext: chartData['y_data_c'], stackgroup: 'one', groupnorm: 'percent'},
    {x: xDataClean, y: chartData['y_data_b'], name: 'Beaten', hovertext: chartData['y_data_b'], stackgroup: 'one'},
    {x: xDataClean, y: chartData['y_data_s'], name: 'Started', hovertext: chartData['y_data_s'], stackgroup: 'one'},
    {x: xDataClean, y: chartData['y_data_ns'], name: 'Not Started', hovertext: chartData['y_data_ns'], stackgroup: 'one'},
  ];
  var layout = {
    template: tarpeydevDefault,
    title: 'Backlog Timeline',
    showlegend: true,
    yaxis: {
      title: '% in Category',
    },
    colorway: chartData['area_colors'],
  };
  var config = {responsive: true};
  return (
    <Plot data={plotData} layout={layout} config={config} />
  )
}

export const TreemapChart = async (chartData) => {
  var plotData = chartData['data'];
  var layout = chartData['layout'];
  var layoutUpdate = {
    template: tarpeydevDefault,
  };
  var config = chartData['config'];
  Plotly.newPlot('treemap', plotData, layout, config);
  Plotly.relayout('treemap', layoutUpdate)
}

export const BubblesChart = async (chartData) => {
  // plotData needs to be an array of valid traces, so
  // here's a loop that constructs the traces from
  // x_data and y_data, then pushes it into plotData
  var plotData = [];
  for ( var i = 0; i < chartData['x_data_counts'].length; i ++ ) {
    var trace = {
      x: chartData['x_data_counts'][i],
      y: chartData['y_data_dist'][i],
      name: chartData['bubble_names'][i],
      mode: 'markers',
      type: 'scatter',
      text: chartData['label_data'][i],
      marker: {
        size: chartData['z_data_hours'][i],
        sizemode: 'area',
        sizeref: 0.5,
      }
    };
    plotData.push(trace);
  };
  var layout = {
    template: tarpeydevDefault,
    title: 'Backlog Distribution',
    showlegend: true,
    xaxis: {
      title: 'Game Count',
    },
    yaxis: {
      title: '% in Category',
    },
    colorway: chartData['color_data'],
  };
  var config = {responsive: true};
  Plotly.newPlot('bubbles', plotData, layout, config);
}