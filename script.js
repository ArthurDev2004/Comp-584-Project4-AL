// event listner to see if a number button or a operation button is clicked and add it to the view of the calculator
document.addEventListener('click', async (e) => {

    let buttonClicked = e.target; // button which causes the click event to occur   
    debugger; 
    // determines wheter button is a number one or an operation one 
    if (buttonClicked.classList.contains('number-button') || buttonClicked.classList.contains('operation-button')){

        debugger;
        let calculatorView = document.querySelector('.calculator-numbers') // gets the element that has the calculator numbers

        calculatorView.innerText += buttonClicked.dataset.value; // appends the value to the text present in the view of the numbers in the calculator

    }

}); 