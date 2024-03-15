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
            let monthlyTax = calculateMonthlyTax(annualSalary);
            let monthlyNI = calculateMonthlyNI(annualSalary);
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

    function calculateMonthlyTax(annualSalary) {
        if (annualSalary <= 12570) {
            return 0;
        } else if (annualSalary <= 50270) {
            return ((annualSalary - 12570) * 0.2) / 12;
        } else if (annualSalary <= 150000) {
            return (((50270 - 12570) * 0.2 + (annualSalary - 50270) * 0.4) / 12);
        } else {
            return (((50270 - 12570) * 0.2 + (150000 - 50270) * 0.4 + (annualSalary - 150000) * 0.45) / 12);
        }
    }

    function calculateMonthlyNI(annualSalary) {
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
        detailedResults.innerHTML = '';
        results.forEach(result => {
            detailedResults.innerHTML += `<div class="monthly-result">
                <h3>${result.month}</h3>
                <p>Take-Home: £${result.monthlyTakeHome.toFixed(2)}</p>
                <p>Tax Paid: £${result.monthlyTax.toFixed(2)}</p>
                <p>NI Contribution: £${result.monthlyNI.toFixed(2)}</p>
            </div>`;
        });
    }
});
