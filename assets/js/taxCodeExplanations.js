document.addEventListener('DOMContentLoaded', function () {
    const taxCodeSelector = document.getElementById('taxCode');
    const taxCodeExplanation = document.getElementById('taxCodeExplanation');

    taxCodeSelector.addEventListener('change', function() {
        const selectedTaxCode = this.value;
        displayTaxCodeExplanation(selectedTaxCode);
    });

    function displayTaxCodeExplanation(taxCode) {
        let explanation = '';
        switch (taxCode) {
            case '1250L':
                explanation = 'Standard Personal Allowance: You’re entitled to the standard tax-free Personal Allowance.';
                break;
            case 'BR':
                explanation = 'Basic Rate: All your income is taxed at the basic rate (20%), with no tax-free Personal Allowance.';
                break;
            case 'D0':
                explanation = 'Higher Rate: All your income is taxed at the higher rate (40%), with no tax-free Personal Allowance.';
                break;
            case 'D1':
                explanation = 'Additional Rate: All your income is taxed at the additional rate (45%), with no tax-free Personal Allowance.';
                break;
            default:
                explanation = 'Tax code not recognized.';
        }
        taxCodeExplanation.textContent = explanation;
    }
});