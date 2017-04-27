

function Book(title, sinopse, isbn, img, links){
	this.likes = 0;
	this.dislikes = 0;
	this.title = title;
	this.sinopse = sinopse;
	this.isbn = isbn;
	this.img = img;
	this.links = links;
	this.rack;//serve de apoio para o botão next
	this.more=0;//serve de apoio para mostrar mais ou menos informação da sinopse
	
	//serve de apoio para mostrar mais ou menos informação da sinopse dependendo se this.more é par ou não
	this.ReadMore = function(){
		this.more++;
		return this.more;
	}
	//adiciona 1 like
	this.Love = function(){
		this.likes++;
		return this.likes;
	}
	//adiciona um dislike
	this.Hate = function(){
		this.dislikes++;
		return this.dislikes;
	}
					
		this.Render = function(id){
			
			var idTitulo = "#"+id+" .titulo"; //substitui o titulo no html
			$(idTitulo).html(this.title);
			
			var idMore = "#" + id + " .more";	//serve para chamar o butão que permite ler o resto da sinopse.
			var idGosto = "#"+id+" .gosto";		//contador de likes
			var idSinopse = "#"+id+" .sino";	//local da sinopse no html.
			var idNgosto = "#"+id+" .ngosto";	//contador de dislikes
			
			/*mostrar apenas 200 caracteres da sinopse e criar um butão que permite ver o resto da sinopse
			ou esconder*/
			if (this.sinopse.length < 200){
				$(idSinopse).html(this.sinopse);
			}else if(this.more%2==0){		//quando this.more é par (depende do butao more) esconder 200 caracteres e criar botao more
				$(idSinopse).html(this.sinopse.substring(0,199)+"<button class ='more' >(...)</button>");
			}else{		//quando this.more é impar mostrar a sinopse toda e voltar a criar o botão more.
				$(idSinopse).html(this.sinopse+"<button class ='more' >(hide)</button>");
			}
			
			var data = {"livro":this,"id":id};//serve de apoio às funções onclick
			
			//incrementa 1 a more, faz render e conforme more é par ou impar mostra a sinopse parcial ou toda
			$(idMore).off('click');
			$(idMore).click(data,function(event){
				event.data.livro.ReadMore();
				event.data.livro.Render(event.data.id);
			});
			
			//substitui os likes no html
			$(idGosto).html(this.likes);
			
			//substitui os dislikes no html
			$(idNgosto).html(this.dislikes);

			//incrementa um like e faz render
			var idLove = "#" + id + " .betaog";
			$(idLove).off('click');
			$(idLove).click(data,function(event){
				event.data.livro.Love();
				event.data.livro.Render(event.data.id);
			});
			
			//incrementa um dislike e faz render
			var idHate = "#" + id + " .betaon";
			$(idHate).off('click');
			$(idHate).click(data,function(event){
				event.data.livro.Hate();
				event.data.livro.Render(event.data.id);
			});
			
			//substitui a imagem
			var idImagem = "#"+id+" .imagem";
			$(idImagem).attr('src', this.img);
			
			//substitui o link
			var idLink = "#"+id+" .link";
			$(idLink).html(this.links);

			//procura o proximo livro na prateleira e faz render desse livro.
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

	// procura a variavel pesquisa no google e corre a funcao parsBook para essa variavel
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

	this.parsBook = function(pesquisa){ /*se a pesquisa for um json de livros, adiciona todos os livros à
										queue da bookshelf e determina os parametros de cada um a partir do json*/

		for (var i=0; i<pesquisa.items.length; i++){
			var titulo = pesquisa.items[i].volumeInfo.title;
			var sinopse = pesquisa.items[i].volumeInfo.description;
			var isbn = pesquisa.items[i].volumeInfo.industryIdentifiers[0].identifier;
			var link = "<a href='"+pesquisa.items[i].volumeInfo.infoLink+"'> link </a>";
			var img = pesquisa.items[i].volumeInfo.imageLinks.thumbnail;
			var livro = new Book(titulo, sinopse, "-", img, link);

			this.add(livro);

		}

		//corre tb a funcao init para os 3 primeiros livros do json
		this.init("livro_1");
		this.init("livro_2");
		this.init("livro_3");

	}

 	this.add = function(book){ //adiciona um livro à queue da bookshelf
 		this.shelf.enqueue(book);
 		book.rack = this;
 	}

 	this.init = function(id){ //tira o livro 0 queue e faz Render no html.
 		var starter = this.shelf.dequeue();
 		starter.Render(id);

 	}
 	
 	//esta funçao corre no butao "next" definido no objeto book.
 	//determina qual o proximo livro da shelf a ser mostrado e faz render desse livro.
 	
 	this.proximo = function(id){ 		
 		var newBook = this.shelf.dequeue();
 		newBook.Render(id);
 	}
 }


var pesquisar = new BookShelf();

pesquisar.load("lord of the rings");

//butao de pesquisa de livros
$("#proc").off('click');
$("#proc").click(function(){
	var pesca = $("#search").val();
	pesquisar.load(pesca);
});

var db = openDatabase("base.db","1.0","novo", 2 * 1024 * 1024);

title, sinopse, isbn, img, links

	tx.executeSql("CREATE TABLE PESQUISAR("+			
					"BOOK_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"+
					"TITLE TEXT NOT NULL,"+
					"SINOPSE TEXT,"+
					"ISBN INT,"+
					"IMG TEXT,"+
					"LINKS TEXT,"+
					"LIKES INT NOT NULL,"+
					"DISLIKES INT NOT NULL)"
	);

		tx.executeSql("INSERT INTO ARTIST(NAME,CACHE,TYPE)"+
					" VALUES('Quim Barreiors',1000.0,'Pimba');"
		);

		tx.executeSql("INSERT INTO ARTIST(NAME,CACHE,TYPE)"+
					" VALUES('Xutos e Pontapes',800.0,'Rock');"
		);


db.transaction(function(tx){
	
	tx.executeSql('Select * From ARTIST',[], function(tx,results){
		var len = results.rows.length;

		for(var i = 0; i < len; i++){

			alert(results.rows[i]['NAME']);

		}
		console.log(results);
	});
});


