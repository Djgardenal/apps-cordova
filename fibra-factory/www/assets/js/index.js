/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


function moneyToFloat(value){
  return Number(value.substring(2).replace(',', '.'));
}
function floatToMoney(value){
  return ("R$" + value).replace('.', ',');
}


/*TABS*/
/*jQuery Method Calls
  You can still use the old jQuery plugin method calls.
  But you won't be able to access instance properties.

$('.tabs').tabs('methodName');
$('.tabs').tabs('methodName', paramName);
*/
var total=0;

$(function(){
  $(".add-item").click(function(){
    $valor = $(this).find(".qtd");
    valor = Number($valor.text());
    valor ++;
    $valor.text(valor++);

    //Matheus {
    var newRow = $("<tr>");
    var cols = "";
    var preco = moneyToFloat($(this).find('.valor').text());
    total += preco;

    cols += '<td>' + $(this).find('.nome').text() + '</td>';
    cols += '<td>' + $(this).find('.valor').text() + '</td>';
    newRow.append(cols);
    $("#shoppingCart").prepend(newRow);
    $("#shoppingCart").find('.total').text(floatToMoney(total));
    //}

    console.log(Number(valor));
  });
});



/*MODAL*/
$(document).ready(function() {
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      var $trigger = $(trigger[0]);
      var idTrigger = $trigger.attr('id');
      console.log(idTrigger);
      $("#buy").click(function(){
				var itens = Array.prototype.map.call(document.querySelectorAll('#shoppingCart tr'), function(tr){
  				return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
    			return td.innerHTML;
    			});
  			});
				itens.pop();
				itens.sort();
				console.log(itens);
				console.log(itens.length);

				var quant;
				var itensTotal = [];
				var compara;
				var contem;
				for (var i = 0; i < itens.length; i++) {
					contem = false;
					itens[i].push(1);
					compara = itens[i];
					for (var j = 0; j < itensTotal.length; j++) {
						if (compara[0] == itensTotal[j][0]) {
							itensTotal[j][2]++;
							contem = true;
						}
					}
					if (!contem) {
						itens[i][1] = moneyToFloat(itens[i][1]);
						itensTotal.push(itens[i]);
					}
				}
				var json = { mesa:$("#mesa").val(), itens:[]}
				for (var i = 0; i < itensTotal.length; i++) {
					json['itens'].push({"nome":itensTotal[i][0],"valor":itensTotal[i][1],"quantidade":itensTotal[i][2]});
				}
				console.log(json);

      });
    },
    complete: function() {
    } // Callback for Modal close
  }
);

  $("#botao*").click(abreModal);

  function abreModal(event){
    $('#modal1').modal('open');
  }
});
