document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxCalcForm');
    const salaryInput = document.getElementById('annualSalary');
    const taxCodeInput = document.getElementById('taxCode');
    const detailedResults = document.getElementById('detailedResults');
    const annualSummary = document.getElementById('annualSummary');
    const selfAssessmentReminder = document.getElementById('selfAssessmentDate');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const startDate = new Date(document.getElementById('startDate').value);
        const annualSalary = parseFloat(salaryInput.value);
        const taxCode = taxCodeInput.value;
        if (!isNaN(annualSalary)) {
            const results = calculateMonthlyResults(annualSalary, taxCode, startDate);
            const annualSummaryResult = results.pop();
            displayAnnualSummary(annualSummaryResult);
            displayMonthlyResults(results);
            updateSelfAssessmentReminder(startDate);
        } else {
            alert('Please enter a valid annual salary.');
        }
    });

    function calculateMonthlyResults(annualSalary, taxCode, startDate) {
        const results = [];
        let totalTakeHome = 0, totalTax = 0, totalNI = 0;
        let currentDate = new Date(startDate);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (let i = 0; i < 12; i++) {
            let month = monthNames[currentDate.getMonth()];
            let monthlySalary = annualSalary / 12;
            let monthlyTax = calculateMonthlyTax(annualSalary, taxCode);
            let monthlyNI = calculateMonthlyNI(annualSalary);
            let monthlyTakeHome = monthlySalary - monthlyTax - monthlyNI;
            
            totalTakeHome += monthlyTakeHome;
            totalTax += monthlyTax;
            totalNI += monthlyNI;
            
            results.push({
                month,
                monthlyTakeHome,
                monthlyTax,
                monthlyNI
            });
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        results.push({
            month: "Annual Summary",
            monthlyTakeHome: totalTakeHome,
            monthlyTax: totalTax,
            monthlyNI: totalNI
        });
        return results;
    }

    function calculateMonthlyTax(annualSalary, taxCode) {
        let monthlySalary = annualSalary / 12;
        switch (taxCode) {
            case '1250L':
                let personalAllowance = 12570;
                if (annualSalary <= personalAllowance) {
                    return 0;
                } else if (annualSalary <= 50270) {
                    return ((annualSalary - personalAllowance) * 0.2) / 12;
                } else if (annualSalary <= 150000) {
                    return (((50270 - personalAllowance) * 0.2 + (annualSalary - 50270) * 0.4) / 12);
                } else {
                    return (((50270 - personalAllowance) * 0.2 + (150000 - 50270) * 0.4 + (annualSalary - 150000) * 0.45) / 12);
                }
            case 'BR':
                return monthlySalary * 0.2;
            case 'D0':
                return monthlySalary * 0.4;
            case 'D1':
                return monthlySalary * 0.45;
            default:
                return monthlySalary * 0.2;
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

    function displayAnnualSummary(summary) {
        annualSummary.innerHTML = `<h3>${summary.month}</h3>
                                   <p>Annual Take-Home: £${summary.monthlyTakeHome.toFixed(2)}</p>
                                   <p>Annual Tax Paid: £${summary.monthlyTax.toFixed(2)}</p>
                                   <p>Annual NI Contributions: £${summary.monthlyNI.toFixed(2)}</p>`;
    }

    function displayMonthlyResults(results) {
        let content = '<div class="results-row">';
        results.forEach((result) => {
            content += `<div class="monthly-result">
                <h3>${result.month}</h3>
                <p>Take-Home: £${result.monthlyTakeHome.toFixed(2)}</p>
                <p>Tax Paid: £${result.monthlyTax.toFixed(2)}</p>
                <p>NI Contribution: £${result.monthlyNI.toFixed(2)}</p>
            </div>`;
        });
        content += '</div>';
        detailedResults.innerHTML = content;
    }

    function updateSelfAssessmentReminder(startDate) {
        let assessmentYear = startDate.getFullYear() + (startDate.getMonth() > 0 || (startDate.getMonth() === 0 && startDate.getDate() > 31) ? 1 : 0);
        selfAssessmentReminder.textContent = `Remember to submit your self-assessment tax return by January 31st, ${assessmentYear}.`;
    }
});
