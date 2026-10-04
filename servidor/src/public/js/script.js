document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tablaVerAtletas');

    // REEMPLAZA '/api/atletas' por la URL exacta de tu backend que retorna el JSON
    fetch('/atletas/verTablaAtletas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(atletas => {
            atletas.forEach(atleta => {
                // Crear una nueva fila
                const fila = document.createElement('tr');
                
                // Insertar las celdas con los nombres exactos de las columnas de tu base de datos
                fila.innerHTML = `
                    <td>${atleta.idatleta}</td>
                    <td>${atleta.paises_ISO}</td>
                    <td>${atleta.nombre}</td>
                    <td>${atleta.genero}</td>
                    <td>${atleta.edad}</td>
                    <td>${atleta.estatura}</td>
                    <td>${atleta.peso}</td>
                `;
                
                // Agregar la fila a la tabla
                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Hubo un problema al cargar los atletas:', error);
        });
});
