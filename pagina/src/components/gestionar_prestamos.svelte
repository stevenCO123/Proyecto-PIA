<script>
    export let data;
    export let form;

  let showTable = false;

function toggleTable() {
  showTable = !showTable;
}
</script>

<button on:click={toggleTable} class="botones">
    {showTable ? 'Ocultar Prestamos' : 'Mostrar Prestamos'}
</button>

{#if showTable}
    <table class="inventario">
        <tbody>
                <tr>
                    <th>Solicitante </th>
                    <th>Articulo solicitado</th>
                    <th>Cantidad solicitada</th>
                    <th>Razon</th>
                    <th>Fecha solicitud</th>
                    <th>Fecha devolucion propuesta</th>
                    <th>Opciones</th>
                </tr>

                {#each data.pedidos as item}
                    <tr>
                        <td>{item.nombreRecibe} {item.apellidoRecibe}</td>
                        <td>{item.articuloSolicitado}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.fechaSolicitud}</td>
                        <td>{item.fechaDevueltaPropuesta}</td>
                        <td>
                            <form action="?/aceptar" method="post">
                                <input type="hidden" name="item_id_pre" value={item.idPrestamo}>
                                <input type="hidden" name="item_id_art" value={item.idArticulo}>
                                <input type="submit"  value="Aceptar"/>
                            </form>
                            <form action="?/rechazar" method="post">
                                <input type="hidden" name="item_id_pre" value={item.idPrestamo}>
                                <input type="hidden" name="item_id_art" value={item.idArticulo}>
                                <input type="submit"  value="Rechazar"/>
                            </form>
                        </td>
                    </tr>
                {/each}
        </tbody>
    </table>
{/if}