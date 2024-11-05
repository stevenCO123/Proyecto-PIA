<script lang="ts">
    export let data;
</script>

<section><div class="texto_1">
    <table width="407" align="center">
        <tbody>
            <tr>
                <td>
                    <span>
                        <img
                            id="img_usuario"
                            alt="imagen usuario"
                            width="220"
                            height="200"
                            src={data.img_usuario}
                        />
                    </span>
                </td>
                <td>
                    <p id="name_full_usuario">
                        {data.nom_usuario}
                        {data.ape_usuario}
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
    <br />
    <h2>AUDM</h2>
    <span>
        (Administración Universal De Materiales) es un proyecto que
        busca crear una página web con la cual no solo la Institución
        Educativa Lola Gonzales sino los profesores puedan acceder al
        inventario completo de materiales tanto móviles e inmóviles
        dentro de los salones de clase y el resto de instalaciones
        pertenecientes a la institución (coordinación, laboratorio,
        biblioteca, gimnasio, tienda, papelería, enfermería,
        restaurante, etc…) en busca de saber que falta o saber con qué
        cuentan desde un inicio.
    </span>
</div></section>
