function dynamicLoad()
{
    	var choosen_lang = document.getElementById("langsel").value;
		var region = document.getElementById("regsel");
		var optionArray = Object.keys(lang_reg[choosen_lang]);
		for(var option of optionArray)
		{
			var opt = document.createElement('option');
			opt.appendChild(document.createTextNode(option));
			opt.value = option;
			region.appendChild(opt);
		}


}

function loadAudioLinks()
{
        var LR = new Object();
        LR[document.getElementById("langsel").value] = [document.getElementById("regsel").value];
        LR["English"] = Object.keys(lang_reg["English"]);
		var mydiv = document.getElementById("links");
		var af = document.getElementById("audioFile");

		var stations = document.getElementById("Table1");
		var orderArrayHeader = ["Region","Language","Time","Date","Stations Available"];
		var table = document.createElement("TABLE");
		var thead = document.createElement('thead');

        table.appendChild(thead);

        for(var i=0;i<orderArrayHeader.length;i++)
        {
            thead.appendChild(document.createElement("th")).
            appendChild(document.createTextNode(orderArrayHeader[i]));
        }


        var audi = '';
        var temp = [] ;
        var k;
        for(var i of Object.keys(LR))
        {
            for (var j of Object.values(LR[i]))
            {
                k =0;
                for(var x of Object.values(lang_reg[i][j][0]))
                {
                    row = table.insertRow(-1);
                    audi = '<audio id="audio-player" preload="auto" controls="controls" src='+x+' type="audio/mpeg" style="width:250px; background-color:rgb(0,97,137) !important;">';
                    temp = [j,i, lang_reg[i][j][1][k], lang_reg[i][j][2][k]]
                    for (var y=0; y<temp.length; y++)
                    {
                        col = row.insertCell(-1);
                        col.innerHTML = temp[y];
                    }
                    col = row.insertCell(-1);
                    col.innerHTML = audi;
                    k++;

                }
            }

        }

		stations.appendChild(table);

}