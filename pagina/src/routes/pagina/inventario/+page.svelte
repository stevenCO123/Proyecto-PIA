<script>
    export let data;
</script>

<section>
    <div class="texto_1">
        <center>
        <h1>en desarrollo</h1>
        
            {#each data.result as item}
                <li>{@html item.nombre_art}</li>
                <li>{@html item.cantidad}</li>
            {/each}
        </center>
    </div>
</section>
