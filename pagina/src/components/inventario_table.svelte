<script>
    export let data;
    export let form;
    export let pag_ver;
</script>

<form
    id="filtros"
    style="align-content: center;"
    method="post"
    action="?/filtrar"
>
    <label for="Nombre">
        Nombre:
        <input
            id="bar_search"
            name="bar_search"
            type="search"
            placeholder="Ejemplo: silla"
        />
    </label>
    {#if pag_ver}
        <label for="Lugar">
            Lugar:
            <select name="Lugar" id="Lugar">
                <option value="%%" selected></option>
                {#each data.LTCE_unico.lugar as item}
                    <option value={item.id_lugar}>
                        {item.lugar_des}
                    </option>
                {/each}
            </select>
        </label>
    {/if}

    <label for="Tipo">
        Tipo:
        <select name="Tipo" id="Tipo">
            <option value="%%" selected></option>
            {#each data.LTCE_unico.tipo as item}
                <option value={item.id_tipo}>
                    {item.tipo_des}
                </option>
            {/each}
        </select>
    </label>

    <label for="Condicion">
        Condicion:
        <select name="Condicion" id="Condicion">
            <option value="%%" selected></option>
            {#each data.LTCE_unico.condicion as item}
                <option value={item.id_condicion}>
                    {item.condicion_des}
                </option>
            {/each}
        </select>
    </label>

    <label for="Estado">
        Estado:
        <select name="Estado" id="Estado">
            <option value="%%" selected></option>
            {#each data.LTCE_unico.estado as item}
                <option value={item.id_estado}>
                    {item.estado_des}
                </option>
            {/each}
        </select>
    </label>

    <input id="boton" type="submit" value="ingresar" />
</form>

{#if form?.filtracion}
    <form action="?/quitar">
        <input id="boton" type="submit" value="quitar filtro" />
    </form>
{/if}

{#if form?.no_found}
    <p>no hay resultados para su filtro</p>
{/if}

<table>
    <tbody>
        {#if !form?.filtracion}
            <tr>
                <td>ingrese los campos que desea conocer en el inventarior</td>
            </tr>
        {/if}
        {#if form?.filtracion}
            <tr>
                <td>nombre del articulo</td>
                <td>Cantidad</td>
                <td>Lugar del articulo</td>
                <td>Tipo de articulo</td>
                <td>condicion del articulo</td>
                <td>estado de prestamo</td>
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
    </tbody>
</table>
