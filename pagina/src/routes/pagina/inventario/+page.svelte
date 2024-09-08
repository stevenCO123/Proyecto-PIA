<script>
    export let data;
    export let form;
</script>

<section>
    <div class="texto_1">
        <center>
            <h1>en desarrollo</h1>

            <table>
                <tbody>
                    <form method="get">
                        <tr>
                            <select name="lugares" id="lugares_select">
                                {#each data.result as item}
                                    <option value={item.id_lugar}
                                        >{@html item.lugar_des}</option
                                    >
                                {/each}
                            </select>
                            <select name="tipos" id="tipos_select">
                                {#each data.result as item}
                                    <option value={item.id_tipo}
                                        >{@html item.tipo_des}</option
                                    >
                                {/each}
                            </select>
                            <select name="condiciones" id="condiciones_select">
                                {#each data.result as item}
                                    <option value={item.id_condicion}
                                        >{@html item.condicion_des}</option
                                    >
                                {/each}
                            </select>
                            <select name="estados" id="estados_select">
                                {#each data.result as item}
                                    <option value={item.id_estado}
                                        >{@html item.estado_des}</option
                                    >
                                {/each}
                            </select>
                            <input id="boton" type="submit" value="filtrar" />
                        </tr>
                        <tr>
                            {#if form?.filtracion}
                                {#each data.result as item}
                                    <td>{@html item.nombre_art}</td>
                                    <td>{@html item.cantidad}</td>
                                    <td>{@html item.lugar_des}</td>
                                    <td>{@html item.tipo_des}</td>
                                    <td>{@html item.condicion_des}</td>
                                    <td>{@html item.estado_des}</td>
                                {/each}
                            {/if}
                            {#if !form?.filtracion}
                                {#each data.result as item}
                                    <td>{@html item.nombre_art}</td>
                                    <td>{@html item.cantidad}</td>
                                    <td>{@html item.lugar_des}</td>
                                    <td>{@html item.tipo_des}</td>
                                    <td>{@html item.condicion_des}</td>
                                    <td>{@html item.estado_des}</td>
                                {/each}
                            {/if}
                        </tr>
                    </form>
                </tbody>
            </table>
        </center>
    </div>
</section>
