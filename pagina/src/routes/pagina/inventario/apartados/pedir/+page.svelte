<script>
    export let data;
    export let form;

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
                        {#each data.result as item}
                            <option value={item.lugar_id}>
                                {@html item.lugar_des}
                            </option>
                        {/each}
                    </select>
                </label>
            </form>

            {#if !form?.docente_sele}
                <p>Primero selecione un salon</p>{/if}
            <br />
            {#if form?.docente_sele}
                <form>
                    {#each form?.selecion as text}
                        <label for="docente"
                            >{@html text.docente_nom + " " + text.docente_ape}
                        </label>
                    {/each}
                </form>
            {/if}
        </center>
    </div>
</section>
