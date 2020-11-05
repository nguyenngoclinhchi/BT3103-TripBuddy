export const mixedChartData = {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Confirmed Cases /1000',
            data: [],
            backgroundColor: "rgb(119, 208, 189, 0.2)",
            order: 2  
        }, 
        
        {
            label: 'Stringency Level',
            data: [],
            type: 'line',
            order: 1
        }],

        labels: [],
        options: {}
    }
}
  
export default mixedChartData;
