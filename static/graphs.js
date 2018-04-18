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


var svg = d3.select("#piepart")
	.append("svg")
	.append("g")

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

var width = 960,
    height = 450,
	radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.count;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//var data1 = [{'count': 31, 'label': 'Male'}, {'count': 14, 'label': 'Female'}]
var color = d3.scale.category20();

var natdatagender = [{'count': 1804, 'label':'Male'}, {'count': 747, 'label':'Female'}];
var natdatarace = [{'count': 28, 'label':'Black'}, {'count': 2466, 'label':'Asian'},{'count': 18, 'label':'White'}, {'count': 39, 'label':'Hispanic'}];
var natdataage = [{'count': 400, 'label':'0-20'}, {'count': 409, 'label':'21-30'}, {'count': 221, 'label':'31-40'}, {'count': 98, 'label':'41-50'}, {'count':114, 'label':'51+'}];


var key = function(d){ return d.data.label; };
var val = function(d){return d.data.count; };

var color = d3.scale.category20();
	
function mergeWithFirstEqualZero(first, second){
	var secondSet = d3.set(); second.forEach(function(d) { secondSet.add(d.label); });

	var onlyFirst = first
		.filter(function(d){ return !secondSet.has(d.label) })
		.map(function(d) { return {label: d.label, value: 0}; });
	return d3.merge([ second, onlyFirst ])
		.sort(function(a,b) {
			return d3.ascending(a.label, b.label);
		});
}

var duration = 500;

change(natdatarace);
function change(data) {
	//var duration = +document.getElementById("duration").value;
	var data0 = svg.select(".slices").selectAll("path.slice")
		.data().map(function(d) { return val });
	if (data0.length == 0) data0 = data;
	var was = mergeWithFirstEqualZero(data, data0);
	var is = mergeWithFirstEqualZero(data0, data);
	console.log(pie(was));
	console.log(is);
	//console.log(data1[1].count);
	/* ------- SLICE ARCS -------*/

	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(was), key);

	slice.enter()
		.insert("path")
		.attr("class", "slice")
		.style("fill", function(d,i) { return color(i);})//return d.data.label; })
		.each(function(d) {
			this._current = d;
		});

	slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(is), key);

	slice		
		.transition().duration(duration)
		.attrTween("d", function(d) {
			var interpolate = d3.interpolate(this._current, d);
			var _this = this;
			return function(t) {
				_this._current = interpolate(t);
				return arc(_this._current);
			};
		});

	slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice
		.exit().transition().delay(duration).duration(0)
		.remove();

	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
		.data(pie(was), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.style("opacity", 0)
		.text(function(d) {
			return d.data.label;
		})
		.each(function(d) {
			this._current = d;
		});
	
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text = svg.select(".labels").selectAll("text")
		.data(pie(is), key);

	text.transition().duration(duration)
		.style("opacity", function(d) {
			return d.data.value == 0 ? 0 : 1;
		})
		.attrTween("transform", function(d) {
			var interpolate = d3.interpolate(this._current, d);
			var _this = this;
			return function(t) {
				var d2 = interpolate(t);
				_this._current = d2;
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			var interpolate = d3.interpolate(this._current, d);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});
	
	text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text
		.exit().transition().delay(duration)
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(was), key);
	
	polyline.enter()
		.append("polyline")
		.style("opacity", 0)
		.each(function(d) {
			this._current = d;
		});

	polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(is), key);
	
	polyline.transition().duration(duration)
		.style("opacity", function(d) {
			return d.data.value == 0 ? 0 : .5;
		})
		.attrTween("points", function(d){
			this._current = this._current;
			var interpolate = d3.interpolate(this._current, d);
			var _this = this;
			return function(t) {
				var d2 = interpolate(t);
				_this._current = d2;
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);
	
	polyline
		.exit().transition().delay(duration)
		.remove();
};



