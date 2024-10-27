<script>
    import { inventario, lugares } from "$lib/database/schema";

    export let data;
    export let form;

    let nombre_C_docente = form?.selecion[0].docente_nom + ' ' + form?.selecion[0].docente_ape

    function enviarFormulario(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado
        event.target.form.submit(); // Envía el formulario
    }
</script>

<section>
    <div class="texto_1">
        <center>
            <h1>Prestamos</h1>
            <form action="?/selecion_docente" method="post" class="prestamo">
                <label for="salon">
                    Seleccione un salón:
                    <select name="Lugar" on:change={enviarFormulario}>
                        <option value="" disabled selected></option>
                        {#each data.LI_unico.lugar as item}
                            <option value={item.lugar_id}>
                                {@html item.lugar_des}
                            </option>
                        {/each}
                    </select>
                </label>
            </form>

            {#if !form?.docente_sele}
                <p>Primero selecione un salon</p>
            {/if}
            <br />
            {#if form?.docente_sele}
                <form action="?/enviar_prestamo" class="prestamo1">
                    <label for="docente">
                        {@html nombre_C_docente}                       
                    </label>
                    <br />

                    <label for="inv">
                        Seleccione el objeto a prestar:
                        <select name="inventario" id="inv">
                            <option value="" disabled selected></option>
                            {#each form?.selecion as item}
                                <option value={item.inventario_id}>
                                    {@html item.inventario_des}
                                </option>
                            {/each}
                        </select>
                    </label>
                    <br />
                    <label for="can">
                        Seleccione la cantidad deseada:
                        <input type="number" name="sele_can" />
                    </label>
                    <br />
                    <label for="des">
                        Seleccione el salon del destino: 
                        <select name="destino" id="dest">
                            <option value="" disabled selected></option>
                            {#each data.LI_unico.lugar as item}
                            <option value={item.lugar_id}>
                                {@html item.lugar_des}
                            </option>
                            {/each}
                        </select>
                    </label>
                    <br>
                    <label for="mensaje"> Razon del prestamo:
                        <input type="text" id="mensaje" class="textbox" placeholder="Ej:Para ver cine" size="200"> 
                    </label>
                    <label for="fecha">
                        Fecha de devolucion
                        <input type="date" placeholder="00/00/0000" />
                    </label>
                    <br>
                    <input id="boton" type="submit" value="Enviar" />
                </form>
            {/if}
        </center> 
    </div>
</section>
