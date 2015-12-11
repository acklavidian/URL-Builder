var urlParams = document.getElementsByClassName("inputFieldValue");
urlParams = Array.prototype.slice.call(urlParams);

//Function for the disabling of Survey Number
function disableSurveyNumCheckbox() {
    var checkBox = document.getElementById("survey_num_checkbox_input"),
        //VV REMOVE?
        warnBox = document.getElementsByClassName("warn-cell"),
        warnRow = document.getElementById("warn_row");
    aliasInput = document.getElementById("survey_num_alias_input");
    if (checkBox.checked) {
        warnRow.style.display = "table-row";
        aliasInput.disabled = true;
    } else {
        warnRow.style.display = "none";
        aliasInput.disabled = false;
    }
}



//Enable and Disable Parameters
function activateParameter(textboxName) {
    var textbox = document.getElementById(textboxName);
    if (textbox.disabled) {
        textbox.disabled = false;
    } else {
        textbox.disabled = true;
    }
}



//Update Generated URL
function updateURL() {

    var genUrlField = document.getElementById("gen_url_output"),
        baseUrl = document.getElementById("base_url_input"),
        urlVals = [],
        keys = ["RID", "RISN", "SUPPLIER_ID", "AGE",
            "GENDER", "PID", "ZIP", "MS_is_mobile",
            "MS_is_tablet"
        ],
        customParam = document.getElementsByName("custom_param_row"),
        aliasInput = "",
        searchInput = "";
    customParam = Array.prototype.slice.call(customParam);
    urlParams.forEach(function(element, index, array) {
        if (!element.disabled) {
            urlVals.push(element.value + "=" + "[%" + keys[index] + "%]&");
        }
    });
    customParam.forEach(function(element, index, array) {
        aliasInput = element.querySelectorAll('[name=aliasInput]')[0];
        searchInput = element.querySelectorAll('[name=searchInput]')[0];
        if (searchInput.value !== "" && aliasInput.value !== "") {
            urlVals.push(aliasInput.value + "=" + "[%" + searchInput.value + "%]&");
        }

        if (searchInput.value === "") {
            searchInput.style.borderColor = "#ffbebe";
        } else {
            searchInput.style.borderColor = "#EEEEEE";

        }
        if (aliasInput.value === "") {
            aliasInput.style.borderColor = "#ffbebe";
        } else {
            aliasInput.style.borderColor = "#EEEEEE";
        }
    });
    if (baseUrl.value !== "") {
        genUrlField.value = baseUrl.value + "/?" + urlVals.join("").slice(0, -1);
    }

}



//Called when plus button is clicked
function addParam() {
    var addButtonRow = document.getElementById("add_button_row"),
        paramRow = document.createElement("tr"),
        paramSearchCell = document.createElement("td"),
        paramAliasCell = document.createElement("td"),
        paramSearchInput = document.createElement("input"),
        paramAliasInput = document.createElement("input"),
        paramDeleteCell = document.createElement("td"),
        paramDeleteButton = document.createElement("span");

    paramRow.setAttribute("name", "custom_param_row");
    paramRow.style.verticalAlign = "center";
    paramSearchCell.setAttribute("name", "searchCell");
    paramAliasCell.setAttribute("name", "aliasCell");
    paramSearchInput.type = "text";
    paramSearchInput.setAttribute("name", "searchInput");
    paramSearchInput.placeholder = "Search For Parameters";


    paramAliasInput.type = "text";
    paramAliasInput.setAttribute("name", "aliasInput");
    paramAliasInput.placeholder = "Enter Key";
    paramDeleteButton.className = "ion-close";
    paramDeleteButton.style.fontSize = "25px";
    paramDeleteButton.onclick = function() {
        paramRow.parentElement.removeChild(paramRow);
    };

    //Assemble the row
    paramSearchCell.appendChild(paramSearchInput);
    paramAliasCell.appendChild(paramAliasInput);
    paramDeleteCell.appendChild(paramDeleteButton);
    paramRow.appendChild(paramSearchCell);
    paramRow.appendChild(paramAliasCell);
    paramRow.appendChild(paramDeleteCell);
    addButtonRow.parentElement.insertBefore(paramRow, addButtonRow);
    paramAliasCell.style.width = "10px";
    $(paramSearchInput).typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        maxLength: 5,
    }, {
        name: 'states',
        source: substringMatcher(states)
    });
}



var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

var states = ["AGE",
    "GENDER",
    "ZIP",
    "HISPANIC",
    "STATE",
    "DMA",
    "COUNTY",
    "DIVISION",
    "ETHNICITY",
    "MSA",
    "REGION",
    "STANDARD_RELATIONSHIP",
    "STANDARD_EDUCATION",
    "STANDARD_VOTE",
    "STANDARD_PRIMARY_DECISION_MAKER",
    "STANDARD_PETS",
    "STANDARD_SEXUAL_ORIENTATION",
    "STANDARD_TOTAL_HOUSEHOLD",
    "STANDARD_HOUSEHOLD_TYPE",
    "STANDARD_INDUSTRY",
    "STANDARD_COMPANY_REVENUE",
    "STANDARD_COMPANY_DEPARTMENT",
    "STANDARD_CAR_USE",
    "STANDARD_AUTO_DECISION_MAKER",
    "STANDARD_AUTO_BRANDS",
    "STANDARD_AUTO_TYPE",
    "STANDARD_AUTO_MANUFACTURE_DATE",
    "STANDARD_AUTO_PURCHASE_DATE",
    "STANDARD_AUTO_PURCHASE_TYPE",
    "STANDARD_AUTO_MOTORCYCLE",
    "STANDARD_FAST_FOOD_FREQUENCY",
    "STANDARD_FAST_FOOD_VISIT",
    "STANDARD_BEVERAGE_P4W",
    "STANDARD_BEVERAGE_REGULARLY",
    "STANDARD_ALCOHOL_FREQUENCY",
    "STANDARD_HOBBIES",
    "STANDARD_MOVIE_FREQUENCY",
    "STANDARD_MOVIE_GENRE",
    "STANDARD_MOVIE_HOME_WATCHING",
    "STANDARD_DVD_PURCHASE",
    "STANDARD_EXERCISE_HOURS",
    "STANDARD_SPORTS",
    "STANDARD_GAMBLING",
    "STANDARD_ELECTRONICS",
    "STANDARD_EARLY_ADOPTER",
    "STANDARD_CELL_CARRIER",
    "STANDARD_CELL_PLAN",
    "STANDARD_SMART_PHONE",
    "STANDARD_INTERNET_TYPE",
    "STANDARD_MOVIE_DOWNLOAD"
];
//Activate window
function showBuilder() {
    var url_wiz_div = document.getElementById("url_wiz_div");
    disableScroll();
    url_wiz_div.style.display = "block";
    document.body.style.overflow = "hidden";

}
//Deactivate window
function hideBuilder(){
    var url_wiz_div = document.getElementById("url_wiz_div");
    enableScroll();
    url_wiz_div.style.display = "none";
    document.body.style.overflow = "scroll";
}

function demoComplete() {
    alert("That concludes the demo.");
}

function notAvail() {
    alert("Feature not availble in the demo");
}


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
