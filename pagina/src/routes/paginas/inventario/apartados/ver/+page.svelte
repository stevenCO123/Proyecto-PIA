<script>
    export let data;
    export let form;
    const pag_gestionar = false;
    const pag_ver = true;
    import InventarioTable from "../../../../../components/inventario_table.svelte";
</script>

<section>
    <InventarioTable {data} {form} {pag_ver} {pag_gestionar} />
</section>
