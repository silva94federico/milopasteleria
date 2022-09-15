var items = [];
var prices = [];
var id = 1;
$.getJSON("https://script.google.com/macros/s/AKfycbyb1ekFzdhVVCGQCUI49TNXI0e1bWPB1vFsj4cfkyxMmaEZ_gLYgCQat0hmDK7pWyc/exec", function (data) {

    items.push("<div class=\"tableStyle\">")
    items.push("<table id=\"pricesTable\"><tr><th>Seleccionar</th><th>Producto</th><th>Precio</th></tr>");
    $.each(data, function (key, val) {
        items.push("<tr><td><input type=\"checkbox\" id=\"cbox" + id + "\" value=\"checkbox" + id + "\"></td><td>" + key + "</td><td>" + val + "</td></tr>");
        prices.push(val);
        id++;
    });

    items.push("</table>");

    $("<div/>", {
        "class": "my-new-div",
        html: items.join("")
    }).appendTo("body");
});

function getData() {
    return [id, prices];
}