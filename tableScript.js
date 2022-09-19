$.getJSON("https://script.google.com/macros/s/AKfycbyb1ekFzdhVVCGQCUI49TNXI0e1bWPB1vFsj4cfkyxMmaEZ_gLYgCQat0hmDK7pWyc/exec", function (data) {
    var items = [];
    var id = 1;

    items.push("<div class=\"tableStyle\">")
    items.push("<table id=\"pricesTable\"><tr><th>Agregar</th><th><input type=\"text\" id=\"searchInput\" onkeyup=\"searchFunction()\" class=\"inputClass\" placeholder=\"Buscar producto...\"></th><th>Precio</th><th>Cantidad</th></tr>");
    $.each(data, function (key, val) {
        items.push("<tr><td><input type=\"checkbox\" id=\"checkbox" + id + "\" value=\"cbox" + id + "\"></td><td>" + key + "</td><td id=\"price" + id + "\">$" + val + "</td>" +
            "<td><select name=\"select\"" + id + "id=\"select\"" + id + ">" +
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

    var total = 0;

    var table = document.getElementById("pricesTable");
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
            if (selected === true) {
                total += price;
            } else {
                total -= price;
            }
            document.getElementById("total").innerHTML = "Total: $" + total;
        }
        else if (event.target.type === 'option') {
            alert($(event.target.id).val());
        }
    });
});