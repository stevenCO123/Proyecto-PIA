<script>
    export let data;
    export let form;
</script>

<section>
    <div class="texto_1">
        <center>
            <h1>usted es encargado del lugar: {data.result[0].lugar_des}</h1>
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

                <label for="Tipo">
                    Tipo:
                    <select name="Tipo" id="Tipo">
                        <option value="%%" selected></option>
                        {#each data.result as item}
                            <option value={item.id_tipo}>
                                {@html item.tipo_des}
                            </option>
                        {/each}
                    </select>
                </label>

                <label for="Condicion">
                    Condicion:
                    <select name="Condicion" id="Condicion">
                        <option value="%%" selected></option>
                        {#each data.result as item}
                            <option value={item.id_condicion}>
                                {@html item.condicion_des}
                            </option>
                        {/each}
                    </select>
                </label>

                <label for="Estado">
                    Estado:
                    <select name="Estado" id="Estado">
                        <option value="%%" selected></option>
                        {#each data.result as item}
                            <option value={item.id_estado}>
                                {@html item.estado_des}
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
                    <tr>
                        <td>nombre del articulo</td>
                        <td>Cantidad</td>
                        <td>Lugar del articulo</td>
                        <td>Tipo de articulo</td>
                        <td>condicion del articulo</td>
                        <td>estado de prestamo</td>
                    </tr>

                    {#if form?.filtracion}
                        {#each form?.filtro as item}
                            <tr>
                                <td>{@html item.nombre_art}</td>
                                <td>{@html item.cantidad}</td>
                                <td>{@html item.lugar_des}</td>
                                <td>{@html item.tipo_des}</td>
                                <td>{@html item.condicion_des}</td>
                                <td>{@html item.estado_des}</td>
                            </tr>
                        {/each}
                    {/if}
                    {#if !form?.filtracion}
                        {#each data.result as item}
                            <tr>
                                <td>{@html item.nombre_art}</td>
                                <td>{@html item.cantidad}</td>
                                <td>{@html item.lugar_des}</td>
                                <td>{@html item.tipo_des}</td>
                                <td>{@html item.condicion_des}</td>
                                <td>{@html item.estado_des}</td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </center>
    </div>
</section>
