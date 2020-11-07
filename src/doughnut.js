export const doughnutChartData = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0,0],
            backgroundColor: ["#FF6384", "#36A2EB"]
        }],
    
        labels: [],
    },
    options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
    }
}
  
export default doughnutChartData;