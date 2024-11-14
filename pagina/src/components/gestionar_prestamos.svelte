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
                </tr>

                {#each data.pedidos as item}
                    <tr>
                        <td>{item.nombreRecibe} {item.apellidoRecibe}</td>
                        <td>{item.articuloSolicitado}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.descripcion}</td>
                        <td>{data.año_soli}-{data.mes_soli}-{data.dia_soli}</td>
                        <td>{data.año}-{data.mes}-{data.dia}</td>
                    </tr>
                {/each}
        </tbody>
    </table>
{/if}