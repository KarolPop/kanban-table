// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.columnId = columnId;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="column-delete-card">Usuń kartę</button>');
		var cardEditBtn = $('<button class="column-edit-card">Edytuj kartę</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardEditBtn.click(function(){
			self.editCard();
		});
		
		card.append(cardDeleteBtn);
		card.append(cardEditBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
	var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.element.remove();
      		}
    	});
	}

	editCard: function() {
	var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: cardName,
	 			bootcamp_kanban_column_id: self.columnId	
			}
			success: function(data){ 
					$('.card-description').html(data)
 				} 
		});
	}
}