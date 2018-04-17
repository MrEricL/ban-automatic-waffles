    function tooltipHtml(n, d){ /* function to create html content string in tooltip div. */
        return "<h4>"+n+"</h4><table>"+
            "<tr><td>Number of Shootings</td><td>"+(d.numShoot)+"</td></tr>"+
            "</table>";
    }
    
    //STILL SAMPLE DATA EDIT , IN ALPHA ORDER
    var shootList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 
                    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 
                    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 
                    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,50]
    var pos = 0
    var sampleData ={}; /* Sample random data. */   
    ["AK","AL","AR","AZ","CA","CO","CT","DC",
    "DE","FL","GA","HI","IA","ID","IL","IN",
    "KS","KY","LS","MA","MD","ME","MI","MN",
    "MO","MS","MT","NC","ND","NE","NH","NJ",
    "NM","NV","NY","OH","OK","OR","PA","RI",
    "SC","SD","TN","TX","UT","VA","VT","WA",
    "WI","WV","WY"]
        .forEach(function(d){ 
            var x = shootList[pos];
            sampleData[d]={numShoot:x, color:d3.interpolate("gold", "blue")(x/100)}; 
            pos+=1
        });
    
    /* draw states on id #statesvg */   
    uStates.draw("#statesvg", sampleData, tooltipHtml);
    
    d3.select(self.frameElement).style("height", "600px"); 




var data = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
];

//  margin, radius, and color scale
var m = 10,
    r = 100,
    z = d3.scale.category20c();
	
	
var svg = d3.select("body").selectAll("svg")
    .data(data)
  .enter().append("svg")
    .attr("width", (r+m)*2)
    .attr("height", (r + m) * 2)
  .append("g")
    .attr("transform", "translate(" + (r+m) + "," + (r+m+5) + ")");

svg.selectAll("path")
    .data(d3.layout.pie())
  .enter().append("path")
    .attr("d", d3.svg.arc()
        .innerRadius(r / 2)
        .outerRadius(r))
    .style("fill", function(d, i) { return z(i); });
	
