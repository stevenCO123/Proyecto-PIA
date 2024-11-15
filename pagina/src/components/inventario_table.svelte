<script lang="ts">
    export let data;
    export let form;
    export let pag_ver;
    export let pag_gestionar;

    function cambiar_valor(index) { 
        form.filtro[index].cambio = true; 
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
    <input id="boton" type="submit" value="ingresar"/>
</form>

{#if form?.filtracion}
    <form action="?/quitar">
        <input id="boton" type="submit" value="quitar filtro"/>
    </form>
    <br>
{/if}

{#if form?.no_found}
    <p>no hay resultados para su filtro</p>
{/if}
<br>

{#if pag_ver}
    <table class="inventario"><tbody>
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
                    <td>{item.nombre_art}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.lugar_des}</td>
                    <td>{item.tipo_des}</td>
                    <td>{item.condicion_des}</td>
                    <td>{item.estado_des}</td>
                </tr>
            {/each}
        {/if}
    </tbody></table>
{/if}

{#if pag_gestionar}
    <form action="?/enviar_cambios" method="post" class="gestion">
        <table class="inventario"><tbody>
            {#if form?.success}
            Cambios enviados con exito
            <br>
            <br>
            {/if}
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

                {#each form?.filtro as item, index}
                    <tr>
                        <input type="hidden" name="id_articulo" value={item.id}>
                        <input type= "hidden" name="cambio" value ={item.cambio ? 'true' : 'false'}>
                        <td>
                            <input type="text" name="nomart" value={item.nombre_art} class="inputos" on:change={() => cambiar_valor(index)}/>
                        </td>
                        <td>
                            <input type="number" name="cant" value={item.cantidad} class="inputos" on:change={() => cambiar_valor(index)}/>
                        </td>
                        <td>{item.lugar_des}</td>
                        <td>{item.tipo_des}</td>
                        <td>{item.condicion_des}</td>
                        <td>{item.estado_des}</td>
                    </tr>
                {/each}
                <br>
                <input id="botones" type="submit" value="Enviar"/>
            {/if}
        </tbody></table> 
    </form>
{/if}