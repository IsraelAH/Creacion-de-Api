// Se importa express 
const express =  require('express');
const app = express();
// App pone la syntaxis en .json
app.use(express.json());

// Arreglo para consumir la api
const students = [
    {id: 1, name: 'Israel', age: 20, enroll: true},
    {id: 2, name: 'Manuel', age: 21, enroll: true},
    {id: 3, name: 'Isabel', age: 21, enroll: false},
    {id: 4, name: 'Daniel', age: 20, enroll: true},
];
// Se obtiene un mensaje de resultado cuando se entra al localhost
app.get('/', (req, res) =>{
    res.send('Api de estudiantes');
});
// Cuando se entra a la url de /api/students se devuelve el arreglo con los datos de los estudiantes. 
app.get('/api/students', (req, res) =>{
    res.send(students);
});
// Aqui se obtiene el estudiante por la id, lo se hace es buscar el estudiante por la id, si no se encuentra se retorna un mesnaje de error.
// de lo contrario si se encuentra el estudiante se retorna "student" que es el estudiante que se busco. 
app.get('/api/students/:id', (req, res)=>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
})

// Esta es una funcion de post obtiene el id de students y le agrega 1, despues se obtiene el nombre desde el body, despues la edad que se obtiene desde el body y se convierte en numero
// por ultmo se obtiene el enroll desde el body y se coloca el dato booleano de true o false
app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
// si los datos anteriores se llenan correctamente, se hace un push a el arreglo de estudiantes y se retorna el estudante guardado
    students.push(students);
    res.send(student);
});
// Esta es una funcion de delete que borra un usuario del arreglo, lo que hace es buscar por id del estudiante, si no encuentra coincidencia se retorna un mensaje de error. 
app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');
// de lo contrario Lo que hace aqui es que con el metodo indexOf se utiliza para encontrar la posicion del indice del estudiante en el arreglo
// Si encuentra concidencias recorre el arreglo y busca el primer elemento que coincida dentro del arreglo, y pasa al metodo splice para eliminar el estudiante del arreglo
// despues retorna el estudiante eliminado
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

// Aqui lo que se hace es que se configura el puerto y arranque del servidor
const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando puerto ${port}...`));



