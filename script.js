const inputtext = document.querySelector(".inputtext");
const buttons = document.querySelectorAll("#btn");
let toggle = document.querySelector("#toggle");

let currentvalue = "";
let currentMode = "Deg";
const toggleMode = () => {
  toggle.addEventListener("click", () => {
    if (currentMode === "Deg") {
      currentMode = "Rad";
      toggle.innerText = "Rad";
    } else {
      currentMode = "Deg";
      toggle.innerText = "Deg";
    }
    console.log("Current mode", currentMode);
  });
};
toggleMode();

const functions = () => {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", () => {
      const value = button.innerText;
      handleButtonClick(value);
    });
  }
};
const handleButtonClick = (value) => {
  if (value == "DE") {
    currentvalue = currentvalue.slice(0, -1);
    inputtext.value = currentvalue;
  } else if (value == "AC") {
    currentvalue = "";
    inputtext.value = currentvalue;
  } else if (value == "=") {
    evaluateresult();
  } else if (value === "X²") {
    if (currentvalue === "") {
      inputtext.value = "Enter a number first";
    } else {
      let numberToSquare = parseFloat(currentvalue);
      currentvalue = `(${numberToSquare}^2)`;
      currentvalue = Math.pow(numberToSquare, 2);
      inputtext.value = currentvalue;
    }
  } else if (value == "x!") {
    if (currentvalue === "") {
      inputtext.value = "Enter a number first";
    }
    let fact = 1;
    for (i = 1; i <= currentvalue; i++) {
      fact *= i;
    }
    inputtext.value = fact;
  } else {
    currentvalue += value;
    console.log(currentvalue);
    inputtext.value = currentvalue;
  }
};

const evaluateresult = () => {
  console.log("Current mode", currentMode);
  if (currentMode === "Deg") {
    let convertedval = currentvalue
      .replace("X", "*")
      .replace("%", "*0.01")
      .replace(/\bLog\b/gi, "Math.log10")
      .replace(/\bLn\b/gi, "Math.log")
      .replace(/\bEXP\b/gi, "Math.exp")
      .replace(/\be\b/gi, "Math.E")
      .replace(/\bHypot\b/gi, "Math.hypot")
      .replace(/\bMIN\b/gi, "Math.min")
      .replace(/\bMAX\b/gi, "Math.max")
      .replace(/\bTrunc\b/gi, "Math.trunc")
      .replace(/\bRound\b/gi, "Math.round")
      .replace("π", "Math.PI")
      .replace("√", "Math.sqrt")
      .replace("∛", "Math.cbrt")
      .replace(
        /\bCos\(([^)]+)\)/gi,
        (match, p1) => `Math.cos(${p1} * 0.01745555555)`
      )
      .replace(
        /\bSin\(([^)]+)\)/gi,
        (match, p1) => `Math.sin(${p1} * 0.01745555555)`
      )
      .replace(
        /\Tan\(([^)]+)\)/gi,
        (match, p1) => `Math.tan(${p1} * 0.01745555555).toFixed(0)`
      )
      .replace(
        /\Cot\(([^)]+)\)/gi,
        (match, p1) => `1/Math.tan(${p1} * 0.01745555555).toFixed(0)`
      )
      .replace(
        /\Cosec\(([^)]+)\)/gi,
        (match, p1) => `1/Math.sin(${p1} * 0.01745555555)`
      )
      .replace(
        /\Sec\(([^)]+)\)/gi,
        (match, p1) => `1/Math.cos(${p1} * 0.01745555555)`
      );
    console.log("converted", convertedval);
    const res = eval(convertedval);

    currentvalue = res.toString();
    console.log(currentvalue);
    inputtext.value = currentvalue;
  } else {
    convertedval = currentvalue
      .replace("X", "*")
      .replace("%", "*0.01")
      .replace(/\bLog\b/gi, "Math.log10")
      .replace(/\bLn\b/gi, "Math.log")
      .replace(/\bEXP\b/gi, "Math.exp")
      .replace(/\be\b/gi, "Math.E")
      .replace(/\bHypot\b/gi, "Math.hypot")
      .replace(/\bMIN\b/gi, "Math.min")
      .replace(/\bMAX\b/gi, "Math.max")
      .replace(/\bTrunc\b/gi, "Math.trunc")
      .replace(/\bRound\b/gi, "Math.round")
      .replace("π", "Math.PI")
      .replace("√", "Math.sqrt")
      .replace("∛", "Math.cbrt")
      .replace(/\bCos\b/gi, "Math.cos")
      .replace(/\bSin\b/gi, "Math.sin")
      .replace(/\bCosec\b/gi, "1/Math.sin")
      .replace(/\bSec\b/gi, "1/Math.cos")
      .replace(/\bTan\b/gi, "Math.tan")
      .replace(/\bCot\b/gi, "1/Math.tan");
    console.log("converted", convertedval);
    const res = eval(convertedval);

    currentvalue = res.toString();
    console.log(currentvalue);
    inputtext.value = currentvalue;
  }
};

functions();
window.addEventListener("keydown", (evt) => {
  const key = evt.key;
  const lastChar = currentvalue.slice(-1);
  if (key >= "0" && key <= "9") && (lastChar === ")" || !isNaN(lastChar))) {
    currentvalue += "*" + key;
  } else {
    currentvalue += key;
  } else if (key === ".") {
    handleButtonClick(".");
  } else if (key === ",") {
    handleButtonClick(",");
  } else if (key === "+") {
    handleButtonClick("+");
  } else if (key === "-") {
    handleButtonClick("-");
  } else if (key === "*") {
    handleButtonClick("X");
  } else if (key === "/") {
    handleButtonClick("/");
  } else if (key === "%") {
    handleButtonClick("%");
  } else if (key === "(") {
    handleButtonClick("(");
  } else if (key === ")") {
    handleButtonClick(")");
  } else if (key === "!") {
    handleButtonClick("x!");
  } else if (key === "^") {
    handleButtonClick("X²");
  } else if (key === "Enter") {
    evt.preventDefault();
    handleButtonClick("=");
  } else if (key === "Backspace") {
    evt.preventDefault();
    handleButtonClick("DE");
  } else if (key === "Escape") {
    evt.preventDefault();
    handleButtonClick("AC");
  } else if ((key >= "A" && key <= "Z") || (key >= "a" && key <= "z")) {
    if (
      !evt.ctrlKey &&
      !evt.altKey &&
      !evt.metaKey &&
      !evt.shiftKey &&
      key !== "Enter" &&
      key !== "Backspace" &&
      key !== "ArrowLeft" &&
      key !== "ArrowRight" &&
      key !== "ArrowUp" &&
      key !== "ArrowDown" &&
      key !== "Tab" &&
      key !== "CapsLock" &&
      key !== "ContextMenu" &&
      key !== "Escape"
    ) {
      handleButtonClick(key);
    }
  }
});
