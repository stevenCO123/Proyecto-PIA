<script>
    export let data;
    export let form;
    let pag_ver = true;
    import InventarioTable from "../../../../../components/inventario_table.svelte";
</script>

<section>
    <InventarioTable {data} {form} {pag_ver} />
</section>
