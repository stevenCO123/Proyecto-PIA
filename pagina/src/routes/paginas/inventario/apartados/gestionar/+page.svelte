<script>
    export let data;
    export let form;
    const pag_ver = false;
    const pag_gestionar = true;
    import InventarioTable from "../../../../../components/inventario_table.svelte";
    import GestionarPrestamos from "../../../../../components/gestionar_prestamos.svelte";
</script>

<section>
    <h1>usted es encargado del lugar: {data.salon_usuario}</h1>
    <InventarioTable {data} {form} {pag_ver} {pag_gestionar} />
    <br>
    <GestionarPrestamos {data} {form} />
</section>
