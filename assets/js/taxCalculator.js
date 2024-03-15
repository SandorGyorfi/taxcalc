document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxCalcForm');
    const salaryInput = document.getElementById('annualSalary');
    const resultPeriodSelect = document.getElementById('resultPeriod');
    const detailedResults = document.getElementById('detailedResults');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const annualSalary = parseFloat(salaryInput.value);
        if (!isNaN(annualSalary)) {
            const results = calculateTax(annualSalary);
            updateDisplay(results, resultPeriodSelect.value);
        } else {
            alert('Please enter a valid number for the annual salary.');
        }
    });

    resultPeriodSelect.addEventListener('change', function () {
        const annualSalary = parseFloat(salaryInput.value);
        if (!isNaN(annualSalary)) {
            const results = calculateTax(annualSalary);
            updateDisplay(results, resultPeriodSelect.value);
        }
    });

    function calculateTax(salary) {
        let takeHomePay = salary - (salary * 0.2); 
        let niContribution = salary * 0.12; 
        
        return {
            takeHomePay: takeHomePay,
            totalTaxPaid: salary * 0.2,
            niContribution: niContribution
        };
    }

    function updateDisplay({ takeHomePay, totalTaxPaid, niContribution }, period) {
        detailedResults.innerHTML = ''; 
        if (period === 'monthly') {
            const monthlyTakeHome = takeHomePay / 12;
            const monthlyTax = totalTaxPaid / 12;
            const monthlyNI = niContribution / 12;

            detailedResults.innerHTML += `<p>Monthly Take-Home Pay: £${monthlyTakeHome.toFixed(2)}</p>`;
            detailedResults.innerHTML += `<p>Monthly Tax Paid: £${monthlyTax.toFixed(2)}</p>`;
            detailedResults.innerHTML += `<p>Monthly NI Contribution: £${monthlyNI.toFixed(2)}</p>`;
        } else {
            detailedResults.innerHTML += `<p>Yearly Take-Home Pay: £${takeHomePay.toFixed(2)}</p>`;
            detailedResults.innerHTML += `<p>Yearly Tax Paid: £${totalTaxPaid.toFixed(2)}</p>`;
            detailedResults.innerHTML += `<p>Yearly NI Contribution: £${niContribution.toFixed(2)}</p>`;
        }
    }
});
