let cursos = [{
	id: 1,
	nombre: 'ingles',
	duracion: '44 horas',
	valor: 120000
},
{
	id: 2,
	nombre: 'programacion',
	duracion: '64 horas',
	valor: 150000
},
{
	id: 3,
	nombre: 'sociales',
	duracion: '82 horas',
	valor: 200000
}];

const fs = require ('fs');
const opciones = {
	id: {
		demand: true,
		alias:'i'
	},
	nombre: {
		demand:true,
		alias:'n'
	},
	cedula: {
		demand:true,
		alias:'c'
	}
}

const argv = require ('yargs')
.command('inscribir','aspirante',opciones)
.argv

let recorrercurso = (cursos) => {
	for (let i=0; i < cursos.length; i++){
		setTimeout (function(){
			console.log	('El Id: '  + cursos[i].id + ' pertenece al curso: ' + cursos[i].nombre + ' que tiene una intensidad horaria de: ' + cursos[i].duracion + ' y el valor es : ' + cursos[i].valor + ' pesos colombianos ' )
		}, (2000 * i))
	}
}

let crearArchivo = () => {
	var buscar = cursos.find(elemento => elemento.id == argv.id)
	if (buscar){
		texto = 'El estudiante: ' + argv.n + '\r\n' + 
			'con cedula: ' + argv.c + '\r\n' +
			'se ha matriculado en el curso de: ' + buscar.nombre + '\r\n' + 
			'con una duracion de: ' + buscar.duracion + '\r\n' + 
			'y un valor de: ' + buscar.valor + '\r\n' ;
			fs.writeFile ('inscripcion.txt', texto, (err) => {
				if (err) throw (err);
				console.log ('Se ha creado el archivo exitosamente');
			})
	}
	else if ( argv.id != undefined || argv.id != null) {
		console.log('El curso con el id ' + argv.id + ' no se encuentra en el listado ');
		recorrercurso(cursos);
	} 
	else if ( argv.id == undefined ){
		recorrercurso(cursos);
	}		
}

module.exports = { crearArchivo };

