
function searchFunction() {
    // Declare variables 
    var i, i2, tds;
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("pricesTable");
    var trs = table.tBodies[0].getElementsByTagName("tr");
    var tdInnerText;
    var count = 0;

    // Loop through first tbody's rows
    // Skip headers row
    for (i = 1; i < trs.length; i++) {

        // define the row's cells
        tds = trs[i].getElementsByTagName("td");

        // hide the row
        trs[i].style.display = "none";


        // loop through row cells
        for (i2 = 0; i2 < tds.length; i2++) {
            tdInnerText = tds[i2].innerHTML;
            // if there's a match
            if (tdInnerText.toUpperCase().indexOf(filter) > -1) {
                // show the row
                trs[i].style.display = "";
                count++;

                // skip to the next row
                continue;
            }
        }
    }
}
