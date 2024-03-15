document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxCalcForm');
    const salaryInput = document.getElementById('annualSalary');
    const takeHomePayDisplay = document.getElementById('takeHomePay');
    const totalTaxPaidDisplay = document.getElementById('totalTaxPaid');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const annualSalary = parseFloat(salaryInput.value);
        if (!isNaN(annualSalary)) {
            const { takeHomePay, totalTaxPaid } = calculateTax(annualSalary);
            takeHomePayDisplay.textContent = `Take-Home Pay: £${takeHomePay.toFixed(2)}`;
            totalTaxPaidDisplay.textContent = `Total Tax Paid: £${totalTaxPaid.toFixed(2)}`;
        } else {
            alert('Please enter a valid number for the annual salary.');
        }
    });

    function calculateTax(salary) {
        const personalAllowance = 12570; 
        let taxFree = personalAllowance;
        let basicRate = 0.2;
        let higherRate = 0.4;
        let additionalRate = 0.45;
        let totalTaxPaid = 0;

        if (salary <= personalAllowance) {
            return { takeHomePay: salary, totalTaxPaid: 0 };
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
});
