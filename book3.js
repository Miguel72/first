

function Book(title, sinopse, isbn, img, links){
	this.likes = 0;
	this.dislikes = 0;
	this.title = title;
	this.sinopse = sinopse;
	this.isbn = isbn;
	this.img = img;
	this.links = links;
	this.rack;
	

		//adiciona 1 like
		this.Love = function(){
			this.likes++;
			return this.likes;
		}


		this.Hate = function(){
			this.dislikes++;
			return this.dislikes;
		}
		
		
			
		this.Render = function(id){
			var idTitulo = "#"+id+" .titulo";
			$(idTitulo).html(this.title);
			
			var idMore = "#" + id + " .more";
			
			var idHiden = "#" + id + " .hiden";
			
			var idSinopse = "#"+id+" .sino";
			
			if (this.sinopse.length < 200){
				$(idSinopse).html(this.sinopse);
			}else{
				$(idSinopse).html(this.sinopse.substring(0,199)+"<button class ='more' >(...)</button>");
				$(idHiden).hide();
			}

			var data = {"livro":this,"id":id,"more":idMore,"less":idHiden,"sino":idSinopse};
			$(idMore).off('click');
			$(idMore).click(data,function(event){
				$(event.data.sino).html(event.data.livro.sinopse+"<button class ='hiden' >(hide)</button>");
			});
			
			$(idHiden).off('click');
			$(idHiden).click(data,function(event){
				$(event.data.sino).html(event.data.livro.sinopse.substring(0,199)+"<button class ='more' >(...)</button>");
			});
			
			var idGosto = "#"+id+" .gosto";
			$(idGosto).html(this.likes);

			var idNgosto = "#"+id+" .ngosto";
			$(idNgosto).html(this.dislikes);

			var idLove = "#" + id + " .betaog";
			var data = {"livro":this,"id":id};
			$(idLove).off('click');
			$(idLove).click(data,function(event){
				event.data.livro.Love();
				event.data.livro.Render(event.data.id);
			});

			var idHate = "#" + id + " .betaon";
			$(idHate).off('click');
			$(idHate).click(data,function(event){
				event.data.livro.Hate();
				event.data.livro.Render(event.data.id);
			});
			var idImagem = "#"+id+" .imagem";
			$(idImagem).attr('src', this.img);
			
			var idLink = "#"+id+" .link";
			$(idLink).html(this.links);

			var idNext = "#" + id + " .next";
			$(idNext).off('click');
			$(idNext).click(data,function(event){
				event.data.livro.rack.proximo(event.data.id);
			});

			
		}
	
}

function Queue(){
	this.data = [];

	this.enqueue = function(element){
		this.data.push(element);
	}

	this.dequeue = function(){
		var first =  this.data[0];
		this.data = this.data.slice(1, this.data.length);
		return first;
	}
}



function BookShelf(){

	this.shelf = new Queue();

	this.load = function(pesquisa){
	var currentBS = this;
	this.shelf = new Queue();

		$.get("https://www.googleapis.com/books/v1/volumes?q="+pesquisa) //fazer o pedido
			.done(function(data){	//quando o pedido é devolvido harry = data;

				currentBS.parsBook(data);

			})
			.fail(function(data){
				console.log('Error: ' + data);
			})

	}

	this.parsBook = function(pesquisa){

	

		for (var i=0; i<pesquisa.items.length; i++){
			var titulo = pesquisa.items[i].volumeInfo.title;
			var sinopse = pesquisa.items[i].volumeInfo.description;
			var isbn = pesquisa.items[i].volumeInfo.industryIdentifiers[0].identifier;
			var link = "<a href='"+pesquisa.items[i].volumeInfo.infoLink+"'> link </a>";
			var img = pesquisa.items[i].volumeInfo.imageLinks.thumbnail;
			var livro = new Book(titulo, sinopse, "-", img, link);

			this.add(livro);

		}

		this.init("livro_1");
		this.init("livro_2");
		this.init("livro_3");

	}

 	this.add = function(book){
 		this.shelf.enqueue(book);
 		book.rack = this;
 	}

 	this.init = function(id){
 		var starter = this.shelf.dequeue();
 		starter.Render(id);

 	}

 	this.proximo = function(id){ 		
 		var newBook = this.shelf.dequeue();
 		newBook.Render(id);
 	}
 }


var pesquisar = new BookShelf();

pesquisar.load("lord of the rings");

$("#proc").off('click');
$("#proc").click(function(){
	var pesca = $("#search").val();
	pesquisar.load(pesca);
});

var x = "interesting skyscrapers in the United States "
console.log(x.length);



