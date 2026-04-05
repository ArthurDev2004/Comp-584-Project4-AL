// event listner to see if a number button or a operation button is clicked and add it to the view of the calculator
document.addEventListener('click', async (e) => {

    let buttonClicked = e.target; // button which causes the click event to occur   
    // determines wheter button is a number one or an operation one 
    debugger;
    if (buttonClicked.classList.contains('number-button') || buttonClicked.classList.contains('operation-button')){

        let calculatorView = document.querySelector('.calculator-numbers'); // gets the element that has the calculator numbers
        let clearButton = document.querySelector('.clear-button');

        if (calculatorView.dataset.currentCalculation === "0") // 0 indicates that there is no current calculation happening so can get rid of the 0
        {
            calculatorView.innerText = ""; // gets rid of the 0 which is there initially
            calculatorView.dataset.currentCalculation = "1"; // assign value 1 to indicate there is a current calculation happening
        }

        // check to see if the value of the button clicked is the same operation or just an operation in general so it does not add many operations together without a number in between them
        debugger;
        if (buttonClicked.classList.contains('operation-button')){

            console.log(calculatorView.innerText[calculatorView.innerText.length - 1]); 

            // check to see if there is already an operation at the end of the calculator view 
            if (calculatorView.innerText[calculatorView.innerText.length - 1] === '×' || calculatorView.innerText[calculatorView.innerText.length - 1] === '÷' || calculatorView.innerText[calculatorView.innerText.length - 1] === '+'|| calculatorView.innerText[calculatorView.innerText.length - 1] === '−'){

                // if it is a different operation than the one currently present
                if (buttonClicked.dataset.value !== calculatorView.innerText[calculatorView.innerText.length - 1]) {
                    
                    calculatorView.innerText = calculatorView.innerText.slice(0,-1) + buttonClicked.dataset.value // assign this operation to be the operation (strings are immutable in js)
                }
            }
            else{
                calculatorView.innerText += buttonClicked.dataset.value; // appends the value to the text present in the view of the numbers in the calculator
            }


        }
        else {
            calculatorView.innerText += buttonClicked.dataset.value; // appends the value to the text present in the view of the numbers in the calculator
        }

        // should change the button with AC to C (mimic the way the iPhone calc is )

        clearButton.innerText = 'C'; // makes the AC button turn to C whenever there is text in the 
        clearButton.dataset.value = 'C'; // changes the hidden value state of the button

        // make it so that whenever a new number is added it reverts the clicked state back to default to allow for always to have that two step in clear button
        clearButton.dataset.clicked = "0";

    }
    else if (buttonClicked.classList.contains('backspace-button')){ // will know if it is the delete button which has been pressed (backspace button)

        let calculatorView = document.querySelector('.calculator-numbers'); // gets the element that has the calculator numbers

        calculatorView.innerText = calculatorView.innerText.slice(0,-1); // will get rid of the last character that was inputted

        // check if the string is of length 0, so can change the clear button to AC and change the screen of the calculator properly
        if (calculatorView.innerText.length === 0)
        {
            // reverts the calculator inner state and inner text of the element to their defaults
            calculatorView.innerText = "0";
            calculatorView.currentCalculation = "0";

            // change the clear button to proper state with the data value attribute and the proper display of the html element
            let clearButton = document.querySelector('#clear-button');
            clearButton.innerText = 'AC';
            clearButton.dataset.value = 'AC';
        }

    }
    else if (buttonClicked.classList.contains('clear-button')) // will handle the case where the clear button is clicked and with respect to its proper state management
    {
        // check to see if the clear button has been clicked already once or not 
        let calculatorView = document.querySelector('.calculator-numbers'); // gets the element that has the calculator numbers

        if (buttonClicked.dataset.clicked === "0") // has not been clicked already this calculation session
        {
            // should first get rid of the numbers till then next operator or if no operator get rid of the current numbers present in the calculator view  
            
            let calculatorValues = calculatorView.innerText.split(/([×|÷|\+|−])/); // will split the string present in the calculator view screen into seperate parts 

            calculatorValues = calculatorValues.slice(0,-1); // will have all of the elements of the array in this new array except the old one which is supposed to be deleted because clear button was clicked

            calculatorView.innerText = calculatorValues.join(''); // joins all of the array elements into a string (should include the operators)

            // will convert to default showing whenever the calculator has been cleared with nothing left 
            if (calculatorView.innerText.length === 0){
                calculatorView.innerText = "0";
                calculatorView.currentCalculation = "0";

                // keep the button clicked state at 0 because since there is no number it is like starting from square one again


            }
            else {
                // change the inner state and the display of the button clicked
                buttonClicked.dataset.clicked = "1"; // indicates the button has been clicked this calculation session
            }

            buttonClicked.innerText = 'AC';
            buttonClicked.dataset.value = 'AC';

        }
        else if (buttonClicked.dataset.clicked === "1"){ // it has been clicked already once, so it should delete the whole thing
            
            calculatorView.innerText = "0";

            buttonClicked.dataset.clicked = "0"; // put the hidden state of if the value has been used back to default 

            calculatorView.dataset.currentCalculation = "0"; 

        }

    }

}); 
