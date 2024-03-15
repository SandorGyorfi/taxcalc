document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxCalcForm');
    const salaryInput = document.getElementById('annualSalary');
    const resultPeriodSelect = document.getElementById('resultPeriod');
    const takeHomePayYearly = document.getElementById('takeHomePayYearly');
    const totalTaxPaidYearly = document.getElementById('totalTaxPaidYearly');
    const takeHomePayMonthly = document.getElementById('takeHomePayMonthly');
    const totalTaxPaidMonthly = document.getElementById('totalTaxPaidMonthly');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const annualSalary = parseFloat(salaryInput.value);
        if (!isNaN(annualSalary)) {
            const { takeHomePay, totalTaxPaid } = calculateTax(annualSalary);
            updateDisplay(takeHomePay, totalTaxPaid);
        } else {
            alert('Please enter a valid number for the annual salary.');
        }
    });

    resultPeriodSelect.addEventListener('change', function () {
        const annualSalary = parseFloat(salaryInput.value);
        if (!isNaN(annualSalary)) {
            const { takeHomePay, totalTaxPaid } = calculateTax(annualSalary);
            updateDisplay(takeHomePay, totalTaxPaid);
        }
    });

    function calculateTax(salary) {
        const personalAllowance = 12570; 
        let basicRate = 0.2;
        let higherRate = 0.4;
        let additionalRate = 0.45;
        let totalTaxPaid = 0;

        if (salary <= personalAllowance) {
            totalTaxPaid = 0;
        } else if (salary <= 50270) {
            totalTaxPaid = (salary - personalAllowance) * basicRate;
        } else if (salary <= 150000) {
            totalTaxPaid = (50270 - personalAllowance) * basicRate + (salary - 50270) * higherRate;
        } else {
            totalTaxPaid = (50270 - personalAllowance) * basicRate + (150000 - 50270) * higherRate + (salary - 150000) * additionalRate;
        }

        const takeHomePay = salary - totalTaxPaid;
        return { takeHomePay, totalTaxPaid };
    }

    function updateDisplay(takeHomePay, totalTaxPaid) {
        if (resultPeriodSelect.value === 'monthly') {
            takeHomePayMonthly.textContent = `Take-Home Pay (Monthly): £${(takeHomePay / 12).toFixed(2)}`;
            totalTaxPaidMonthly.textContent = `Total Tax Paid (Monthly): £${(totalTaxPaid / 12).toFixed(2)}`;
            takeHomePayYearly.style.display = 'none';
            totalTaxPaidYearly.style.display = 'none';
            takeHomePayMonthly.style.display = '';
            totalTaxPaidMonthly.style.display = '';
        } else { 
            takeHomePayYearly.textContent = `Take-Home Pay (Yearly): £${takeHomePay.toFixed(2)}`;
            totalTaxPaidYearly.textContent = `Total Tax Paid (Yearly): £${totalTaxPaid.toFixed(2)}`;
            takeHomePayYearly.style.display = '';
            totalTaxPaidYearly.style.display = '';
            takeHomePayMonthly.style.display = 'none';
            totalTaxPaidMonthly.style.display = 'none';
        }
    }
});
