function random() {
	 const data = Array.from({ length: 100 }, () => ({
        x: Math.random() * 500,
        y: Math.random() * 500,
      }));

      const margin = { top: 100, right: 50, bottom: 50, left: 700};
      const width = 500;
      const height = 500;
      const svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      const chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.x)])
        .range([0, width]);
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)])
        .range([height, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
      chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
      chart.append("g")
        .call(yAxis);

           svg.append("text")
        .attr("x", margin.left + width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Scatter plot of 100 random numbers");
        d3.selectAll("text").style("font-size", "2em");

      chart.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 5);
       	d3.selectAll("circle").attr("fill", "red");

   }

function age() {
		d3.csv("titanic.csv", function(data) {
  var ageRanges = d3.range(0, 91, 10);
  var groupedData = d3.nest()
    .key(function(d) {
      return ageRanges.find(function(r) {
        return d.age < r;
      }) || "90+";
    })
    .entries(data);
  var rollupData = d3.rollup(data, function(v) {
    return v.length;
  }, function(d) {
    return d.ageRange;
  });
  var pieData = d3.pie()
    .sort(null)
    .value(function(d) {
      return rollupData.get(d.key) || 0;
    })(groupedData);
  var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(200);
  var color = d3.scaleOrdinal()
    .domain(pieData.map(function(d) {
      return d.data.key;
    }))
    .range(d3.schemeCategory10);
  var svg = d3.select("body")
    .append("svg")
    .attr("width", 400)
    .attr("height", 400);
  var g = svg.append("g")
    .attr("transform", "translate(200,200)");
  g.selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function(d) {
      return color(d.data.key);
    })
    .attr("stroke", "white")
    .attr("stroke-width", 2);
  var legend = d3.legendColor()
    .scale(color)
    .shapePadding(10)
    .shapeWidth(30)
    .shapeHeight(30)
    .labelOffset(10);
  svg.append("g")
    .attr("transform", "translate(150,50)")
    .call(legend);
});
}

 function load() {
        random ();
        age ();
}