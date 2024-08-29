<script lang="ts">
    import {onMount} from 'svelte'

    export let data;

    let img_usuario: string | null
    let nom_usuario: string | null
    let ape_usuario: string | null

    onMount(() =>{
        for(const item of data.asig){        
            img_usuario = (item.img)
            nom_usuario = (item.nombre)
            ape_usuario = (item.apellido)
        }
    })


</script>
<section>
    <div class="texto_1">
        <center>
        <table width="407" align="center">
            <tbody>
                <tr>
                    <td>
                        <span><img id="img_usuario" alt="imagen usuario"  width="220" height="200"  src="{img_usuario}"></span>
                    </td>
                    <td>
                        <p id="nombre_C_usuario">{@html nom_usuario} {@html ape_usuario}</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <br>
        <p> <font size="6">AUDM</font></p>
        <span>(Administración Universal De Materiales) 
            es un proyecto que busca crear una página web 
            con la cual no solo la Institución Educativa 
            Lola Gonzales sino los profesores puedan acceder 
            al inventario completo de materiales  tanto móviles 
            e inmóviles dentro de los salones de clase y el resto 
            de instalaciones pertenecientes a la institución 
            (coordinación, laboratorio, biblioteca, gimnasio, tienda, 
            papelería, enfermería, restaurante, etc…) en busca de saber
            que falta o saber con qué cuentan desde un inicio.
        </span>
    </center>
        </div>
</section>