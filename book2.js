var novo = 0;

function Book(title, sinopse, isbn, img, links){
	this.likes = 0;
	this.dislikes = 0;
	this.title = title;
	this.sinopse = sinopse;
	this.isbn = isbn;
	this.img = img;
	this.links = links;
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

			var idSinopse = "#"+id+" .sino";
			$(idSinopse).html(this.sinopse);

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
			var data = {"livro":this,"id":id};
			$(idHate).off('click');
			$(idHate).click(data,function(event){
				event.data.livro.Hate();
				event.data.livro.Render(event.data.id);
			});
			var idImagem = "#"+id+" .imagem";
			$(idImagem).html(this.img);
			
			var idLink = "#"+id+" .link";
			$(idLink).html(this.links);
			
		}
	
}

var book1 = new Book(
	"Inferno",
	"Inferno. Inferno is a 2013 mystery thriller novel, the sixth by renowned American" +
	" author Dan Brown and the fourth book in his Robert Langdon series, following " +
	"Angels & Demons, The Da Vinci Code and The Lost Symbol.",
	"isbn1",
	"<img src='livro1.jpg' alt='livro1' class='img'>",
	"<a href='www.google.pt'> link 1 </a>"
	);

var book2 = new Book(
	"Lost Symbol",
	"The Lost Symbol. The Lost Symbol is a 2009 novel written by American writer Dan Brown." +
	" It is a thriller set in Washington, D.C., after the events of The Da Vinci Code, and " +
	"relies on Freemasonry for both its recurring theme and its major characters.",
	"isbn2",
	"<img src='livro2.jpg' alt='livro2' class='img'>",
	"<a href='www.google.pt'> link 2 </a>"
	);
var book3 = new Book(
	"Fifty Shades of Grey",
	"When college senior Anastasia Steele (Dakota Johnson) steps in for her sick roommate " +
	"to interview prominent businessman Christian Grey (Jamie Dornan) for their campus " +
	"paper, little does she realize the path her life will take.",
	"isbn3",
	"<img src='livro3.jpg' alt='livro3' class='img'>",
	"<a href='www.google.pt'> link 3 </a>"
	);

var book4 = new Book(
	"Harry Potter and the Sorcerer's Stone",
	"But not everything is quiet at Hogwarts as Harry suspects someone is planning to " +
	"steal the sorcerer's stone. On his eleventh birthday, Harry Potter discovers that he " +
	"is no ordinary boy. Hagrid, a beetle-eyed giant, tells Harry that he is a wizard and " +
	"has a place at Hogwarts School of Witchcraft and Wizardry.",
	"isbn4",
	"<img src='livro4.jpg' alt='livro4' class='img'>",
	"<a href='www.google.pt'> link 4 </a>"
	);

var book5 = new Book(
	"Harry Potter and the Half-Blood Prince",
	"When Harry enters his sixth year at Hogwarts School of Witchcraft and Wizardry, the " +
	"world is in turmoil. Voldemort's army is gaining force and momentum, and tragedies " +
	"are everyday occurrences.",
	"isbn5",
	"<img src='livro5.jpg' alt='livro5' class='img'>",
	"<a href='www.google.pt'> link 5 </a>"
	);

var book6 = new Book(
	"Harry Potter and the Prisoner of Azkaban",
	"Rowling. The book follows Harry Potter, a young wizard, in his third year at Hogwarts " +
	"School of Witchcraft and Wizardry. Along with friends Ron Weasley and Hermione " +
	"Granger, Harry investigates Sirius Black, an escaped prisoner from Azkaban who they " +
	"believe is one of Lord Voldemort's old allies.",
	"isbn6",
	"<img src='livro6.jpg' alt='livro6' class='img'>",
	"<a href='www.google.pt'> link 6 </a>"
	);

/*book1.Render("livro_1");
book2.Render("livro_2");
book3.Render("livro_3");*/


function BookShelf() {
 	this.shelf = {}
 	this.aux = {}
 	this.add = function(book){
 		this.shelf[book.isbn] = book;
 	}
 	this.init = function(index,id){
 		var keys = Object.keys(this.shelf); 
 		this.shelf[keys[index]].Render(id);
 		var idNext = "#" + id + " .next";
 		var data = {"gaveta":this,"id":id};
 		$(idNext).off('click');
 		$(idNext).click(data,function(event){
 			event.data.gaveta.proximo(event.data.id);
	});
 	}
 	this.prox = 2;
 	this.proximo = function(id){ 		
	 	var chaves = Object.keys(this.shelf);
	 	if (this.prox == chaves.length-1){
			this.prox = 0;
			}else{
			this.prox ++;
			}
	 	this.shelf[chaves[this.prox]].Render(id);	 	
 	}
 }


var prateleira = new BookShelf();

prateleira.add(book1);
prateleira.add(book2);
prateleira.add(book3);
prateleira.add(book4);
prateleira.add(book5);
prateleira.add(book6);

prateleira.init(0,"livro_1");
prateleira.init(1,"livro_2");
prateleira.init(2,"livro_3");





