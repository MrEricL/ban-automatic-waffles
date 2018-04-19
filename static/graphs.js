    function tooltipHtml(n, d){ /* function to create html content string in tooltip div. */
        return "<h4>"+n+"</h4><table>"+
            "<tr><td>Number of Shootings</td><td>"+(d.numShoot)+"</td></tr>"+
            "</table>";
    }


    var shootList = {"WA": 48, "DE": 29, "DC": 7, "WI": 68, "WV": 19, 
        "HI": 2, "FL": 113, "WY": 3, "NH": 6, "NJ": 80, "NM": 14, "TX": 139, 
        "LA": 44, "NC": 90, "ND": 4, "NE": 12, "TN": 56, "NY": 92, "PA": 191, 
        "CA": 315, "NV": 20, "VA": 58, "CO": 240, "AK": 16, "AL": 54, "AR": 29, 
        "VT": 7, "IL": 101, "GA": 61, "IN": 67, "IA": 30, "OK": 35, "AZ": 35, "ID": 4, 
        "CT": 27, "ME": 8, "MD": 52, "MA": 40, "OH": 105, "UT": 18, "MO": 54, "MN": 34,
         "MI": 58, "RI": 8, "KS": 37, "MT": 17, "MS": 27, "SC": 65, "KY": 36, "OR": 28, "SD": 3}
    

    var stateShooting ={}; /* Sample random data. */   
    ["AK","AL","AR","AZ","CA","CO","CT","DC",
    "DE","FL","GA","HI","IA","ID","IL","IN",
    "KS","KY","LA","MA","MD","ME","MI","MN",
    "MO","MS","MT","NC","ND","NE","NH","NJ",
    "NM","NV","NY","OH","OK","OR","PA","RI",
    "SC","SD","TN","TX","UT","VA","VT","WA",
    "WI","WV","WY"]
        .forEach(function(d){ 
            //console.log(d)
            //console.log(realShootList[d])
            var x = shootList[d];
            // original colors ("#ffffcc", "#800026")
            stateShooting[d]={numShoot:x, color:d3.interpolate("#ffffcc", "#800026")(x/100)}; 
        });
    
    /* draw states on id #statesvg */   
    uStates.draw("#statesvg", stateShooting, tooltipHtml);
    
    d3.select(self.frameElement).style("height", "600px"); 

// DONUT CHART STARTS HERE

// race pie chart
var race_pie = new d3pie("race_pie", {
    "header": {
        "title": {
            "text": "Shootings in the U.S. by Age",
            "fontSize": 24,
            "font": "open sans"
        },
        "subtitle": {
            "text": "Fake Data",
            "color": "#999999",
            "fontSize": 12,
            "font": "open sans"
        },
        "titleSubtitlePadding": 10
    },
    "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
    },
    "size": {
        "canvasWidth": 450,
        "canvasHeight": 450,
        "pieOuterRadius": "70%"
    },
    "footer": {
    "text": "Source: www.FakeData.com",
    "color": "#999999",
    "fontSize": 10,
    "font": "open sans",
    "location": "bottom-left"
    },
    "data": {
        "sortOrder": "value-desc",
        "content": [
            {
                "label": "Asian",
                "value": 5,
                "color": "#ccb2b2"
            },
            {
                "label": "White",
                "value": 50,
                "color": "#ccc8b2"
            },
            {
                "label": "Black",
                "value": 30,
                "color": "#c3ccb2"
            },
            {
                "label": "Hispanic",
                "value": 15,
                "color": "#b5ccb2"
            }
        ]
    },
    "labels": {
        "outer": {
            "pieDistance": 28
        },
        "inner": {
            "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
            "fontSize": 11
        },
        "percentage": {
            "color": "#ffffff",
            "decimalPlaces": 0
        },
        "value": {
            "color": "#adadad",
            "fontSize": 11
        },
        "lines": {
            "enabled": true
        },
        "truncation": {
            "enabled": true
        }
    },
    "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 9
        }
    },
    "misc": {
        "gradient": {
            "enabled": false,
            "percentage": 100
        }
    },
    "callbacks": {
        "onMouseoverSegment": null,
        "onMouseoutSegment": null,
        "onClickSegment": null
    }
});

// gender pie chart
var gender_pie = new d3pie("gender_pie", {
    "header": {
        "title": {
            "text": "Shootings in the U.S. by Gender",
            "fontSize": 24,
            "font": "open sans"
        },
        "subtitle": {
            "text": "Fake Data",
            "color": "#999999",
            "fontSize": 12,
            "font": "open sans"
        },
        "titleSubtitlePadding": 10
    },
    "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
    },
    "size": {
        "canvasWidth": 450,
        "canvasHeight": 450,
        "pieOuterRadius": "70%"
    },
    "footer": {
    "text": "Source: www.FakeData.com",
    "color": "#999999",
    "fontSize": 10,
    "font": "open sans",
    "location": "bottom-left"
    },
    "data": {
        "sortOrder": "value-desc",
        "content": [
            {
                "label": "Female",
                "value": 20,
                "color": "#ccb2b2"
            },
            {
                "label": "Male",
                "value": 80,
                "color": "#ccc8b2"
            },
        ]
    },
    "labels": {
        "outer": {
            "pieDistance": 28
        },
        "inner": {
            "hideWhenLessThanPercentage": 1
        },
        "mainLabel": {
            "fontSize": 11
        },
        "percentage": {
            "color": "#ffffff",
            "decimalPlaces": 0
        },
        "value": {
            "color": "#adadad",
            "fontSize": 11
        },
        "lines": {
            "enabled": true
        },
        "truncation": {
            "enabled": true
        }
    },
    "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 9
        }
    },
    "misc": {
        "gradient": {
            "enabled": false,
            "percentage": 100
        }
    },
    "callbacks": {
        "onMouseoverSegment": null,
        "onMouseoutSegment": null,
        "onClickSegment": null
    }
});

// age pie chart
var age_pie = new d3pie("age_pie", {
    "header": {
        "title": {
            "text": "Shootings in the U.S. by Race",
            "fontSize": 24,
            "font": "open sans"
        },
        "subtitle": {
            "text": "Fake Data",
            "color": "#999999",
            "fontSize": 12,
            "font": "open sans"
        },
        "titleSubtitlePadding": 10
    },
    "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
    },
    "size": {
        "canvasWidth": 450,
        "canvasHeight": 450,
        "pieOuterRadius": "70%"
    },
    "footer": {
    "text": "Source: www.FakeData.com",
    "color": "#999999",
    "fontSize": 10,
    "font": "open sans",
    "location": "bottom-left"
    },
    "data": {
        "sortOrder": "value-desc",
        "content": [
            {
                "label": "0-20",
                "value": 5,
                "color": "#ccb2b2"
            },
            {
                "label": "21-30",
                "value": 30,
                "color": "#ccc8b2"
            },
            {
                "label": "31-40",
                "value": 35,
                "color": "#c3ccb2"
            },
            {
                "label": "41-50",
                "value": 20,
                "color": "#b5ccb2"
            },
            {
                "label": "51+",
                "value": 10,
                "color": "#b2c2cc"
            }
        ]
    },
    "labels": {
        "outer": {
            "pieDistance": 28
        },
        "inner": {
            "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
            "fontSize": 11
        },
        "percentage": {
            "color": "#ffffff",
            "decimalPlaces": 0
        },
        "value": {
            "color": "#adadad",
            "fontSize": 11
        },
        "lines": {
            "enabled": true
        },
        "truncation": {
            "enabled": true
        }
    },
    "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 9
        }
    },
    "misc": {
        "gradient": {
            "enabled": false,
            "percentage": 100
        }
    },
    "callbacks": {
        "onMouseoverSegment": null,
        "onMouseoutSegment": null,
        "onClickSegment": null
    }
});