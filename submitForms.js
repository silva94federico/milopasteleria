
function submitDetailsForm() {
    //JavaScript form validation
    var name = document.forms["sendMessageForm"]["nombrec"].value;
    var number = document.forms["sendMessageForm"]["numeroc"].value;
    var total = document.getElementById("total").innerHTML;

    if (name === "" || number === "") {
        alert("¡Tenés que completar tu nombre y tu número!");
        return false;
    } else if (!number.match(/^\d+$/)) { 
        alert("Tu teléfono solo debe contener números (0-9)");
        return false;
    } else if (total === "Total: $0") {
        alert("¡No seleccionaste ningún producto!");
        return false;
    } else {
        var formatMessage = "Hola, soy *" + name + "* (" + number + "). Te pido:%0a";
        var productsList = "";
        $('input[type=checkbox]').each(function () {
            if (this.checked) {
                var checkedCheckbox = $(this).val();
                var checkboxIdNum = checkedCheckbox.replace(/[^0-9]/g, ''); // leave only the numbers

                var priceId = "price" + checkboxIdNum;
                var price = document.getElementById(priceId);
                price = price.innerText || price.innerHTML;
                price = price.replace(/[^0-9]/g, ''); // remove $ sign, leave the numbers
                price = parseInt(price);

                var productId = "product" + checkboxIdNum;
                var product = document.getElementById(productId);
                product = product.innerText || product.innerHTML;

                var selectId = "#select" + checkboxIdNum;
                var select = $(selectId).val();

                productsList += product + " " + "$" + numberWithDots(price) + " x" + (select === '0' ? '1' : select) + "%0a";
            }
        });
        formatMessage += productsList + "*" + numberWithDots(total) + "*";
        window.location.replace("https://api.whatsapp.com/send/?phone=543814025949&text=" + formatMessage);
        return false;
    }
}


function submitQuestionForm() {
    //JavaScript form validation
    var name = document.forms["sendQuestionForm"]["nombrec"].value;
    var number = document.forms["sendQuestionForm"]["numeroc"].value;
    var question = document.forms["sendQuestionForm"]["consultac"].value;

    if (name === "" || number === "") {
        alert("¡Tenés que completar tu nombre y tu número!");
        return false;
    } else if (!number.match(/^\d+$/)) { 
        alert("Tu teléfono solo debe contener números (0-9)");
        return false;
    } else if (question == "") {
        alert("¡No escribiste ninguna consulta!");
        return false;
    } else {
        var formatMessage = "Hola, soy *" + name + "* (" + number + "). Me gustaría consultarte:%0a" + question;
        window.location.replace("https://api.whatsapp.com/send/?phone=543814025949&text=" + formatMessage);
        return false;
    }
}
