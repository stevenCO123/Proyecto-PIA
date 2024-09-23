<script>
    export let data;
    export let form;
    let pag_ver = false;
    import InventarioTable from "../inventario_table.svelte";
</script>

<section>
    <h1>usted es encargado del lugar: {data.result[0].lugar_des}</h1>
    <InventarioTable {data} {form} {pag_ver} />
</section>
