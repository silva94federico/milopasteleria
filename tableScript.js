$.getJSON("https://script.google.com/macros/s/AKfycbyb1ekFzdhVVCGQCUI49TNXI0e1bWPB1vFsj4cfkyxMmaEZ_gLYgCQat0hmDK7pWyc/exec", function (data) {
    // Sort JSON alphabetically
    data = sortObject(data);

    var items = [];
    var id = 1;
    
    items.push("<div class=\"tableStyle\"><table id=\"pricesTable\"><tr><th>Agregar</th><th>Productos</th><th>Precio</th><th>Cantidad</th></tr>");
    $.each(data, function (key, val) {
        val = val.toString().replace(/[^0-9]/g, '');

        items.push("<tr><td><input type=\"checkbox\" id=\"checkbox" + id + "\" value=\"cbox" + id + "\"></td><td id=\"product" + id + "\">" + key + "</td><td id=\"price" + id + "\">$" + numberWithDots(val) + "</td>" +
            "<td><select name=\"select" + id + "\" id=\"select" + id + "\" class=\"selectClass\"><option value=\"0\">-</option>" +
            "<option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option><option value=\"6\">6</option>" +
            "<option value=\"7\">7</option><option value=\"8\">8</option><option value=\"9\">9</option><option value=\"10\">10</option><option value=\"11\">11</option><option value=\"12\">12</option>" +
            "<option value=\"13\">13</option><option value=\"14\">14</option><option value=\"15\">15</option><option value=\"16\">16</option><option value=\"17\">17</option><option value=\"18\">18</option>" +
            "<option value=\"19\">19</option><option value=\"20\">20</option><option value=\"21\">21</option><option value=\"22\">22</option><option value=\"23\">24</option><option value=\"24\">24</option>" +
            "<option value=\"25\">25</option><option value=\"26\">26</option><option value=\"27\">27</option><option value=\"28\">28</option><option value=\"29\">29</option><option value=\"30\">30</option>" +
            "<option value=\"31\">31</option><option value=\"32\">32</option><option value=\"33\">33</option><option value=\"34\">34</option><option value=\"35\">35</option><option value=\"36\">36</option>" +
            "</select></td></tr>");
        id++;
    });

    items.push("</table>");

    $("<div/>", {
        "class": "inner",
        html: items.join("")
    }).appendTo("p");


    var table = document.getElementById("pricesTable");
    var total = 0;
    table.addEventListener('click', function (event) {
        if (event.target.type === 'checkbox') {
            var checkboxId = event.target.id;
            var checkboxIdNum = checkboxId.replace(/[^0-9]/g, ''); // leave only the numbers

            var priceId = "price" + checkboxIdNum;
            var price = document.getElementById(priceId);
            price = price.innerText || price.innerHTML;
            price = price.replace(/[^0-9]/g, ''); // remove $ sign, leave the numbers
            price = parseInt(price);

            var selected = event.target.checked;
            var quantityId = "#select" + checkboxIdNum;
            var quantity = $(quantityId).find(":selected").val();

            if (quantity === '0') { // - = '0', make it 1 by default
                quantity = '1';
            }

            quantity = parseInt(quantity);

            if (selected === true) {
                total += price * quantity;
            } else {
                total -= price * quantity;
            }

            document.getElementById("total").innerHTML = "Total: $" + numberWithDots(total);
        }
    });

    // Multiply the price!
    (function () {
        var previous, current, subtotal, price, selectId;

        $(".selectClass").on('focus', function () {
            selectId = this.id;
            selectId = selectId.replace(/[^0-9]/g, ''); // leave only the numbers

            var priceId = "price" + selectId;
            price = document.getElementById(priceId);
            price = price.innerText || price.innerHTML;
            price = price.replace(/[^0-9]/g, ''); // remove $ sign, leave the numbers
            price = parseInt(price);

            // Store the current value on focus and on change
            previous = this.value;
        }).change(function () {
            // Remove - option, leave the numbers
            $("#select" + selectId + " option[value='0']").remove();

            current = this.value;
            var currentCheckbox = '#checkbox' + selectId;

            // Is checkbox checked?
            if ($(currentCheckbox).is(":checked")) {
                // Subtract this subtotal from the total so we can add the new value
                // Check first that the previous value is not -
                previous = parseInt(previous);
                subtotal = price * (previous === 0 ? 1 : previous);
                total -= subtotal;

                // Add the new total
                subtotal = price * parseInt(current);
                total += subtotal;
            } else {
                $(currentCheckbox).prop("checked", true);

                var quantityId = "#select" + selectId;
                var quantity = $(quantityId).find(":selected").val();

                total += price * parseInt(quantity);
            }

            // Update element!
            document.getElementById("total").innerHTML = "Total: $" + numberWithDots(total);

            // Make sure the previous value is updated
            previous = current;
        });
    })();
});

function sortObject(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
