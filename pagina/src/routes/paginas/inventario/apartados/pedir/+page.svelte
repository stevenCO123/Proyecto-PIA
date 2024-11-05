<script lang="ts">

export let data;
export let form;
let salon;

form?.salon ? salon = form.salon  as string:  salon = "Seleccione un salon";

function enviarFormulario(event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado
    (event.currentTarget as HTMLSelectElement).form?.submit(); //envía el formulario
}
</script>


<section>
<div class="texto_1">
    <center>
        <h1>Prestamos</h1>
        <form action="?/selecion_docente" method="post" class="prestamo">
            <label for="salon">
                Seleccione un salón:
                <select name="Lugar"  on:change={enviarFormulario}>
                    <option value={salon} selected>{salon}</option>
                    {#each data.result as item}
                        <option value={item.lugar_id}>
                            {item.lugar_des}
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
            <form action="?/crear" class="prestamo1" method="post">
                <label for="docente">
                    Docente: {form?.nombreDocente}                    
                </label>
                <br />

                <label for="inv">
                    Seleccione el objeto a prestar:
                    <select name="inventario" id="inv">
                        <option value="" disabled selected></option>
                        {#each form?.selecion as item}
                            <option value={item.inventario_id}>
                                {item.inventario_des}
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
                <label for="mensaje"> Razon del prestamo:
                    <input type="text" name="mensaje" class="textbox" placeholder="Ej:Para ver cine" size="200" style="width: 25%;"> 
                </label>
                <br>
                <label for="fecha">
                    Fecha de devolucion
                    <input type="date" name="fechadev"/>
                </label>
                <br>
                <input id="boton" type="submit" value="Enviar" />
            </form>
        {/if}
    </center> 
</div>
</section>