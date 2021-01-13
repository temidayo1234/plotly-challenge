//Changing Sample Id from user input in dropdown box


function Panel(id) {
    d3.json("./data/samples.json").then((data) => {
        var all_data = data.metadata.filter(meta => meta.id.toString() === id)[0];

        var result = d3.select("#sample-metadata");

        result.html("");

        Object.entries(all_data).forEach((key) => {
            result.append("h5").text(key[0].toLowerCase() + ":" + key[1] + "\n");
        });
    });
};

function chart(id) {
    d3.json("./data/samples.json").then((data) => {

        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        var TOP_OTU = (samples.sample_values.slice(0, 10)).reverse();

        var OTU_ID = TOP_OTU.map(o => "OTU" + " " + o);

        var labels = (samples.otu_labels.slice(0, 10));

        var trace1 = {
            x: TOP_OTU,
            y: OTU_ID,
            text: labels,
            marker:
            {
                color: "purple"
            },
            type: "bar",
            orientation: "h",
        };
        var data = [trace1];

        //Setting the layout of the plot
        var layout = {
            title: "Top 10 OTU Samples",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 150,
                r: 150,
                t: 90,
                b: 20
            }
        };
        Plotly.newPlot("bar", data, layout);

        // Creating the Bubble Chart
        var trace2 = [
            {
                title: 'Overview of All Samples',
                x: OTU_ID,
                y: samples.otu_ids,
                mode: "markers",
                text: labels,
                marker:
                {
                    size: samples.sample_values,
                    color: samples.otu_ids,
                    colorscale: "blackbody"
                }
            }
        ];
        var bubbleLayout = {
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" }
        };
        Plotly.newPlot("bubble", trace2, bubbleLayout);
    });
}
function optionChanged(id) {
    Panel(id);
    chart(id);
}

//Function for drop down option ad plotting
function initial() {
    var dropdown = d3.select("#selDataset");
    
    d3.json("./data/samples.json").then((data) => {
        data.names.forEach((name) => {
        dropdown.append("option").text(name).property("value");
        });
        Panel(data.names[0]);
        chart(data.names[0])
    });
};

initial();