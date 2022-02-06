// alert("connected");

const toType = document.getElementById("toType");
const original = document.getElementById("toType").innerText;
const originalInsensitive = document
  .getElementById("toType")
  .innerText.toLowerCase();
const textBox = document.getElementById("textField");

console.log(originalInsensitive);
const updateOnType = () => {
  const textBoxValue = textBox.value;
  if (
    originalInsensitive.length === textBoxValue.length &&
    originalInsensitive === textBoxValue
  ) {
    toType.innerHTML = `<p><span class="highlighted">${original}</span></p>`;
    alert("correct");
    return;
  }
  //   loop through two strings
  for (
    let i = 0;
    i < (originalInsensitive.length && textBoxValue.length);
    i++
  ) {
    console.log("Typed: ", textBoxValue.charAt(i));
    console.log("Original: ", originalInsensitive.charAt(i));

    let replacementValue = "";
    let end = "";
    let mistake = "";
    if (originalInsensitive.charAt(i) !== textBoxValue.charAt(i)) {
      for (let j = 0; j <= i; j++) {
        if (j !== i) {
          replacementValue = replacementValue + original.charAt(j);
          console.log(replacementValue);
        } else {
          mistake = originalInsensitive.charAt(j);
        }
      }
      for (j = i + 1; j < originalInsensitive.length; j++) {
        end = end + originalInsensitive.charAt(j);
      }
      toType.innerHTML = `<p><span class="highlighted">${replacementValue}</span><span class="mistake">${mistake}</span>${end}</p>`;
      console.log(toType.innerHTML);
      return;
    } else {
      for (let j = 0; j <= i; j++) {
        replacementValue = replacementValue + original.charAt(j);
        console.log(replacementValue);
      }
      for (j = i + 1; j < originalInsensitive.length; j++) {
        end = end + originalInsensitive.charAt(j);
      }
      toType.innerHTML = `<p><span class="highlighted">${replacementValue}</span>${end}</p>`;
      console.log(toType.innerHTML);
    }
  }
  if (textBoxValue.length === 0) {
    toType.innerHTML = `<p>${original}</p>`;
  }
};

textBox.addEventListener("input", updateOnType);
