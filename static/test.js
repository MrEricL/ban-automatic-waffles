var pie = new d3pie("pieChart", {
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