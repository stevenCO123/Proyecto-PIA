<script lang="ts">
    export let data;
    export let form;
    export let pag_ver;
    
    /* simon
    import { onMount } from 'svelte';
  import { fetch } from '$app/stores';
    // Función para actualizar la base de datos (backend)
  async function updateItem(item: any) {
    try {
      const response = await fetch('/api/update-pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item) // Enviamos el item actualizado
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      const result = await response.json();
      console.log('Update success:', result);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }
  */

  function enviarFormulario(event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado
    (event.currentTarget as HTMLSelectElement).form?.submit(); //envía el formulario
  }
</script>

<form
    id="filtros"
    style="align-content: center;"
    method="post"
    action="?/filtrar"
>
    <label for="Nombre" class="labe_ver">
        Nombre:
        <input
            id="bar_search"
            name="bar_search"
            type="search"
            placeholder="Ejemplo: silla"
        />
        <br>
    </label>
    {#if pag_ver}
        <label for="Lugar" class="labe_ver" >
            Lugar:
            <select name="Lugar" id="Lugar" style="width: 35%;">
                <option value="%%" selected ></option>
                {#each data.LTCE_unico.lugar as item}
                    <option value={item.id_lugar}>
                        {item.lugar_des}
                    </option>
                {/each}
            </select>
        </label>
    {/if}

    <label for="Tipo" class="labe_ver">
        Tipo:
        <select name="Tipo" id="Tipo" style="width: 36.7%;">
            <option value="%%" selected></option>
            {#each data.LTCE_unico.tipo as item}
                <option value={item.id_tipo}>
                    {item.tipo_des}
                </option>
            {/each}
        </select>
    </label>

    <label for="Condicion" class="labe_ver">
        Condicion:
        <select name="Condicion" id="Condicion" style="width: 28.8%;">
            <option value="%%" selected></option>
            {#each data.LTCE_unico.condicion as item}
                <option value={item.id_condicion}>
                    {item.condicion_des}
                </option>
            {/each}
        </select>
    </label>

    <label for="Estado" class="labe_ver">
        Estado:
        <select name="Estado" id="Estado" style="width: 33.6%;">
            <option value="%%" selected></option>
            {#each data.LTCE_unico.estado as item}
                <option value={item.id_estado}>
                    {item.estado_des}
                </option>
            {/each}
        </select>
    </label>
<br>
<br>
    <input id="boton" type="submit" value="ingresar" />
</form>

{#if form?.filtracion}
    <form action="?/quitar">
        <input id="boton" type="submit" value="quitar filtro" />
    </form>
    <br>
{/if}

{#if form?.no_found}
    <p>no hay resultados para su filtro</p>
{/if}
<br>
<form action="" method="post" class="gestion">
    <table class="inventario">
        <tbody>
            {#if !form?.filtracion}
                
                    Ingrese los campos que desea conocer en el inventario.
            {/if}
            {#if form?.filtracion}
                <tr>
                    <th>nombre del articulo</th>
                    <th>Cantidad</th>
                    <th>Lugar del articulo</th>
                    <th>Tipo de articulo</th>
                    <th>condicion del articulo</th>
                    <th>estado de prestamo</th>
                </tr>

                {#each form?.filtro as item}
                    <tr>
                        <td>
                        <input  type="text" name="nomart" bind:value={item.nombre_art} />
                        </td>
                        <td>
                            <input type="number" name="caninv" bind:value={item.cantidad} />
                        </td>
                        <td>
                            {item.lugar_des}
                        </td>
                        <td>
                            {item.tipo_des}
                        </td>
                        <td>
                            {item.condicion_des}
                        </td>
                        <td>
                            {item.estado_des}   
                        </td>
                    </tr>
                {/each}
            {/if}
        </tbody>      
        <br>
        <input id="botones" type="submit" value="Enviar"/>
    </table> 
</form>

<!--
<table class="inventario">
    <tbody>
      <tr>
        <th>Solicitante</th>
        <th>Articulo solicitado</th>
        <th>Cantidad solicitada</th>
        <th>Razon</th>
        <th>Fecha solicitud</th>
        <th>Fecha devolucion propuesta</th>
      </tr>
  
      {#each data.pedidos as item, index}
        <tr>
          <td>
            <input type="text" bind:value={item.nombreRecibe} />
            <input type="text" bind:value={item.apellidoRecibe} />
          </td>
          <td><input type="text" bind:value={item.articuloSolicitado} /></td>
          <td><input type="number" bind:value={item.cantidad} /></td>
          <td><input type="text" bind:value={item.descripcion} /></td>
          <td>
            <input type="date" bind:value={item.fechaSolicitud} />
          </td>
          <td>
            <input type="date" bind:value={item.fechaDevolucion} />
          </td>
          <td>
            <form action="?/">
                <button on:click={() => updateItem(item)} class="botones">
                    Guardar cambios
                </button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  -->