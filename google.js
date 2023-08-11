const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchangeIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  translateBtn = document.querySelector("button");
// map, reduce, filter, find aur foreach
selectTag.forEach((tag, id) => {
  for (let country_code in countries) {
    // default kya rahega, us liye yeh code
    let selected =
      id == 0
        ? country_code == "en-GB"
          ? "selected"
          : ""
        : country_code == "hi-IN"
        ? "selected"
        : "";
    let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`; // countries.country_code b likh skhte
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeIcon.addEventListener("click", () => {
  // is we wanted to exchange the selected languages
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});

translateBtn.addEventListener("click", async () => {
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

  if (!text) return;

  toText.setAttribute("placeholder", "Translating...");

  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "7d1d92a0b2mshba2d30c16566317p14901fjsn3a5743b33152",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: new URLSearchParams({
      q: text,
      target: translateTo,
      source: translateFrom,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (
      data.data &&
      data.data.translations &&
      data.data.translations.length > 0
    ) {
      toText.value = data.data.translations[0].translatedText;
    } else {
      toText.value = "Translation error";
    }

    toText.setAttribute("placeholder", "Translation");
  } catch (error) {
    console.error(error);
  }
});
