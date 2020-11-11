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
        rotation: Math.PI,
        circumference: Math.PI
    }
}

export default doughnutChartData;