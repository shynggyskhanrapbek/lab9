function random() {
	 const data = Array.from({ length: 100 }, () => ({
        x: Math.random() * 500,
        y: Math.random() * 500,
      }));

      const margin = { top: 100, right: 50, bottom: 100, left: 600};
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
    d3.csv("titanic.csv").then(function(data) {
    var ageRanges = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"];
    var ageCounts = {};
    ageRanges.forEach(function(range) {
      ageCounts[range] = 0;
    });
    data.forEach(function(d) {
      var ageString = d.Age;
      var age = parseInt(ageString.split(" ")[0]);
      
      if (age >= 0 && age <= 10) {
        ageCounts["0-10"]++;
      } else if (age >= 11 && age <= 20) {
        ageCounts["11-20"]++;
      } else if (age >= 21 && age <= 30) {
        ageCounts["21-30"]++;
      } else if (age >= 31 && age <= 40) {
        ageCounts["31-40"]++;
      } else if (age >= 41 && age <= 50) {
        ageCounts["41-50"]++;
      } else if (age >= 51 && age <= 60) {
        ageCounts["51-60"]++;
      } else if (age >= 61 && age <= 70) {
        ageCounts["61-70"]++;
      } else if (age >= 71 && age <= 80) {
        ageCounts["71-80"]++;
      } else if (age >= 81 && age <= 90) {
        ageCounts["81-90"]++;
      } else if (age >= 91 && age <= 100) {
        ageCounts["91-100"]++;
      }     
      
      
    });
    console.log(ageCounts);
    });
const data = [
  { range: "0-10", amount: 64 },
  { range: "11-20", amount: 117 },
  { range: "21-30", amount: 230 },
  { range: "31-40", amount: 155 },
  { range: "41-50", amount: 84 },
  { range: "51-60", amount: 42 },
  { range: "61-70", amount: 18 },
  { range: "71-80", amount: 4 }
];

const width = 500;
const height = 500;
const margin = 50;

const radius = Math.min(width, height) / 2 - margin;

const container = d3.select("#second");

const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height);

const chart = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color = d3.scaleOrdinal()
    .range(d3.schemeCategory10);

const pie = d3.pie()
    .value(d => d.amount);

const pieData = pie(data);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

chart.selectAll("path")
    .data(pieData)
    .join("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.range))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .attr("transform", "translate(0, 0)")
      .on("mouseover", function(d) {
        d3.select(this).attr("stroke", "black");
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("stroke", "white");
      });

const legend = svg.append("g")
    .attr("transform", `translate(${width - margin}, ${margin})`)
    .selectAll("g")
    .data(pieData)
    .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

legend.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", d => color(d.data.range));

legend.append("text")
    .text(d => `${d.data.range}: ${d.data.amount}`)
    .attr("x", 13)
    .attr("y", 5)
    .style("font-size", "1em")
    .attr("alignment-baseline", "middle");
   
    svg.append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 30 + ")")
    .append("text").text("Age categories of passengers")
    .attr("class", "title")
    .style("font-size", "2em")

}


function load() {
  random();
  age();
}