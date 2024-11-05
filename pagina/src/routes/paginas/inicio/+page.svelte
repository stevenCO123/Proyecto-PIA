<script lang="ts">
    export let data;
</script>

<section><div class="texto_1">
                        <img
                            id="img_usuario"
                            alt="imagen usuario"
                            width="220"
                            height="200"
                            src={data.img_usuario}
                        />
                    <p id="name_full_usuario" style="font-size: larger;"><strong>
                        {data.nom_usuario}
                        {data.ape_usuario}
                    </strong>
                    </p>
    <br/>
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
