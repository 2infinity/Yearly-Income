// starting balance - fixed to reference the element
const sb = document.getElementById("startBalance");

// money/percentage
const percentage = document.getElementById("percentage");
const gt = document.getElementById("grandTotal");

// menu button (ready for your toggle logic)
const menuBtn = document.getElementById("menuBtn");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const menuContainer = document.getElementById("menuContainer");

// EventListener
document.addEventListener("input", (e) => {
    const month = e.target.getAttribute("data-month");
    if (month) {
        calculateMonth(month);
    }
});

// Start balance listener
sb.addEventListener("input", updateGrandTotal);

// Functions
function calculateMonth(month) {
    // Grab inputs based on month prefix
    const incValue = document.getElementById(`${month}Inc`).value;
    const expValue = document.getElementById(`${month}Exp`).value;
    const dif = document.getElementById(`${month}Dif`);

    // Calculate result for the specific month
    const result = Number(incValue) - Number(expValue);

    // Update the difference display
    dif.textContent = result.toFixed(2);
    
    // Always update the big total after a month changes
    updateGrandTotal();
}

function updateGrandTotal() {
    const allResults = document.querySelectorAll(".month-result");
    let total = 0;

    // Sum up all month differences
    allResults.forEach(div => {
        total += Number(div.textContent) || 0;
    });

    // Update Grand Total display
    gt.textContent = total.toFixed(2);

    // Calculate growth
    // We use sb.value here so we get the current number in the box
    const startingBalanceValue = Number(sb.value) || 0;

    if (startingBalanceValue !== 0) {
        const growth = (total / startingBalanceValue) * 100;
        percentage.textContent = `${growth.toFixed(0)}%`;
    } else {
        // Prevents "Infinity%" if starting balance is 0 or empty
        percentage.textContent = "0%";
    }


}





menuBtn.addEventListener("click", ()=>{
   bar1.classList.toggle("bar1"); 
   bar2.classList.toggle("bar2");
   bar3.classList.toggle("bar3");
   menuContainer.classList.toggle("copper");
});