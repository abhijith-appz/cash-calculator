document.addEventListener('DOMContentLoaded', () => {
    const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

    const cashInputs = denominations.map(value => document.getElementById(`et${value}`));
    const cashTexts = denominations.map(value => document.getElementById(`txt${value}`));

    const txtFinalCash = document.getElementById('txtFinalCash');
    const txtFinalCashInWords = document.getElementById('txtFinalCashInWords');
    const btnReset = document.getElementById('btnReset');

    // Add input listeners
    cashInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            validateInput(input);
            updateRowValue(index);
            updateTotalCash();
        });
    });

    btnReset.addEventListener('click', clearData);

    function updateRowValue(index) {
        const rowValue = (parseInt(cashInputs[index].value) || 0) * denominations[index];
        cashTexts[index].textContent = rowValue.toLocaleString('en-IN');
    }

    function updateTotalCash() {
        let totalCashValue = 0;
        cashTexts.forEach(text => {
            totalCashValue += parseInt(text.textContent.replace(/,/g, '')) || 0;
        });

        txtFinalCash.textContent = 'Total Cash: ₹ ' + totalCashValue.toLocaleString('en-IN');
        txtFinalCashInWords.textContent = `Total Cash In Words: ${convertToWords(totalCashValue)}`;
    }

    function clearData() {
        cashInputs.forEach(input => input.value = '');
        cashTexts.forEach(text => text.textContent = '0');
        updateTotalCash();
    }

    function validateInput(input) {
        const value = parseInt(input.value, 10);
        if (isNaN(value) || value < 0) {
            input.value = '';
        }
    }

    // Convert number to words (Indian format)
    function convertToWords(number) {
        if (number === 0) return 'Zero';

        const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        let words = '';

        if (Math.floor(number / 10000000) > 0) {
            words += convertToWords(Math.floor(number / 10000000)) + ' Crore ';
            number %= 10000000;
        }

        if (Math.floor(number / 100000) > 0) {
            words += convertToWords(Math.floor(number / 100000)) + ' Lakh ';
            number %= 100000;
        }

        if (Math.floor(number / 1000) > 0) {
            words += convertToWords(Math.floor(number / 1000)) + ' Thousand ';
            number %= 1000;
        }

        if (Math.floor(number / 100) > 0) {
            words += convertToWords(Math.floor(number / 100)) + ' Hundred ';
            number %= 100;
        }

        if (number > 0) {
            if (number < 10) {
                words += units[number];
            } else if (number < 20) {
                words += teens[number - 10];
            } else {
                words += tens[Math.floor(number / 10)];
                if (number % 10 > 0) {
                    words += ' ' + units[number % 10];
                }
            }
        }

        return words.trim();
    }

    // Initial call to display "0"
    updateTotalCash();
});
