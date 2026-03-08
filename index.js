// Light & Dark Mode
const top1 = document.getElementById("top1");
const top2 = document.getElementById("top2");
const label = document.querySelectorAll(".label");
const bar = document.querySelectorAll(".bar");
const lightDark = document.getElementById("lightDark");
const darkLight = document.getElementById("darkLight");
const clearBtn = document.getElementById("clearBtn");


// bar graph elements 
const endBar = document.getElementById("endBar");
const startBar = document.getElementById("startBar");


// viewing starting balance & end balance
const sbView = document.getElementById("sbView");
const ebView = document.getElementById("ebView"); 

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

    sbView.textContent = `$${startingBalanceValue}`;
    ebView.textContent = `$${startingBalanceValue + total}`;
    const endBalanced = startingBalanceValue + total;
    const growth = (total / startingBalanceValue) * 100;
// Calculate the ratio
const ratio = endBalanced / startingBalanceValue; 
const MAX_CHART_HEIGHT = 140;

if (ratio >= 1) {
    // End balance is larger
    endBar.style.height = `${MAX_CHART_HEIGHT}px`;
    // Start bar is a percentage of the max height
    // e.g., if growth is 200% (ratio of 2), startBar is 1/2 of 140px = 70px
    let calculatedStart = MAX_CHART_HEIGHT / ratio;
    startBar.style.height = `${Math.max(calculatedStart, 5)}px`;
} else {
    // Starting balance was larger (a loss)
    startBar.style.height = `${MAX_CHART_HEIGHT}px`;
    let calculatedEnd = MAX_CHART_HEIGHT * ratio;
    endBar.style.height = `${Math.max(calculatedEnd, 5)}px`;
}

}




menuBtn.addEventListener("click", ()=>{
   bar1.classList.toggle("bar1"); 
   bar2.classList.toggle("bar2");
   bar3.classList.toggle("bar3");
   menuContainer.classList.toggle("open");
});



lightDark.addEventListener("click", manipulationDark);

function manipulationDark(){
    document.body.style.color = "black";
    document.body.style.backgroundColor = "white";
    lightDark.style.display = "none";
    darkLight.style.display = "inline";
    top1.style.border = "black solid 2px";
    top2.style.border = "black solid 2px";
    label.forEach((e)=>{
        e.style.border = "black solid 2px";
    });
    bar.forEach((e)=>{
        e.style.backgroundColor = "black"
    });
    menuContainer.style.backgroundColor = "white";
    menuContainer.style.color = "black";
    menuContainer.style.border = "2px solid black";
 
}

darkLight.addEventListener("click", manipulationLight);

function manipulationLight(){
    document.body.style.color = "white";
    document.body.style.backgroundColor = "black";
    lightDark.style.display = "inline";
    darkLight.style.display = "none";
    top1.style.border = "cyan solid 2px";
    top2.style.border = "cyan solid 2px";
    label.forEach((e)=>{
        e.style.border = "cyan solid 2px";
    });
    bar.forEach((e)=>{
        e.style.backgroundColor = "cyan";
    });
    menuContainer.style.backgroundColor = "black";
    menuContainer.style.color = "cyan";
    menuContainer.style.border = "2px solid cyan";
    
    
}

clearBtn.addEventListener("click", clearInput);

function clearInput(){
    sb.value = "0";
    updateGrandTotal();
    const month = e.target.getAttribute("data-month");
    if (month) {
        calculateMonth(month);
    }
}