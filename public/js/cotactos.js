// Obtener la URL actual y extraer los datos
const urlParams = new URLSearchParams(window.location.search);
const data = JSON.parse(urlParams.get('data'));

const tbody = document.querySelector('#tabla-contactos tbody');

if (data && data.length > 0) {
  data.forEach(contacto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contacto.nombre}</td>
      <td>${contacto.apellidos}</td>
      <td>${contacto.edad}</td>
    `;
    tbody.appendChild(row);
  });
} else {
  tbody.innerHTML = `
    <tr>
      <td colspan="3" style="text-align:center;">No se encontraron resultados</td>
    </tr>
  `;
}
