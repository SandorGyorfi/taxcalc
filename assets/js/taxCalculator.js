document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxCalcForm');
    const startDateInput = document.getElementById('startDate');
    const salaryInput = document.getElementById('annualSalary');
    const detailedResults = document.getElementById('detailedResults');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const startDate = new Date(startDateInput.value);
        const annualSalary = parseFloat(salaryInput.value);
        if (!isNaN(annualSalary) && startDate instanceof Date && !isNaN(startDate.getTime())) {
            const results = calculateMonthlyResults(startDate, annualSalary);
            displayMonthlyResults(results);
        } else {
            alert('Please enter a valid start date and annual salary.');
        }
    });

    function calculateMonthlyResults(startDate, annualSalary) {
        const results = [];
        let currentDate = new Date(startDate);
        for (let i = 0; i < 12; i++) {
            let month = currentDate.toLocaleString('en-us', { month: 'long' });
            let monthlySalary = annualSalary / 12;
            let monthlyTax = calculateMonthlyTax(annualSalary, currentDate);
            let monthlyNI = calculateMonthlyNI(annualSalary, currentDate);
            let monthlyTakeHome = monthlySalary - monthlyTax - monthlyNI;
            results.push({
                month,
                monthlyTakeHome,
                monthlyTax,
                monthlyNI
            });
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return results;
    }

    function calculateMonthlyTax(annualSalary, currentDate) {
        console.log(`Calculating tax for salary: ${annualSalary}, date: ${currentDate}`);
        let taxRate = currentDate.getMonth() >= 3 ? 0.2 : 0.2;
        let basicRateUpperLimit = 50270;
        let additionalRateStart = 150000;
        let taxFreeAllowance = 12570;

        if (annualSalary <= taxFreeAllowance) {
            return 0;
        } else if (annualSalary <= basicRateUpperLimit) {
            return ((annualSalary - taxFreeAllowance) * taxRate) / 12;
        } else if (annualSalary <= additionalRateStart) {
            return (((basicRateUpperLimit - taxFreeAllowance) * taxRate + (annualSalary - basicRateUpperLimit) * 0.4) / 12);
        } else {
            return (((basicRateUpperLimit - taxFreeAllowance) * taxRate + (additionalRateStart - basicRateUpperLimit) * 0.4 + (annualSalary - additionalRateStart) * 0.45) / 12);
        }
    }

    function calculateMonthlyNI(annualSalary, currentDate) {
        console.log(`Calculating NI for salary: ${annualSalary}, date: ${currentDate}`);
        let monthlySalary = annualSalary / 12;
        if (monthlySalary <= 797) {
            return 0;
        } else if (monthlySalary <= 4189) {
            return (monthlySalary - 797) * 0.12;
        } else {
            return ((4189 - 797) * 0.12 + (monthlySalary - 4189) * 0.02);
        }
    }

    function displayMonthlyResults(results) {
        let content = '';
        results.forEach((result, index) => {
            if (index % 3 === 0) {
                if (index !== 0) { 
                    content += '</div>';
                }
                content += '<div class="results-row">'; 
            }
    
            content += `<div class="monthly-result" style="--animation-delay:${index * 0.1}s">
                <h3>${result.month}</h3>
                <p>Take-Home: £${result.monthlyTakeHome.toFixed(2)}</p>
                <p>Tax Paid: £${result.monthlyTax.toFixed(2)}</p>
                <p>NI Contribution: £${result.monthlyNI.toFixed(2)}</p>
            </div>`;
    
            if (index === results.length - 1) {
                content += '</div>';
            }
        });
    
        detailedResults.innerHTML = content;
    }
    
});
