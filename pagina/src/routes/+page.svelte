<script lang="ts">
    import '../app.css'
	export let form;
</script>


<div class="campo_de_informacion">
    <div style="text-align: center;">
        <span class="texto1">
            INSTITUCIÓN EDUCATIVA
            <br>
            LOLA GONZÁLEZ
            <br>
        </span>
        <span class="titulo">
            AUDM
        </span>
    </div>
    <table width="407" align="center">
        <tbody>
            <tr>
                <td>
                    <span><img src="https://admin.lola.edu.co/utilidades/escudo.gif" alt="logo-lola" width="292" height="294"></span>
                </td>
                <td>
                    <form id="formulario" style="align-content: center;" method="post" action="?/conectar">
                        <div class="datos_usuario">
                            <label>
                                codigo
                            <input id="codigo" type="text" class="textbox" autocomplete="off" placeholder="EJ :1234"
                                size="9" name= "codigo">
                            </label>
                            <br>
                            <label>
                                documento
                            <input id="documento" type="text" class="textbox" autocomplete="off"
                                placeholder="EJ:123456789" size="9" name ="documento">
                            </label>
                            <br>
                            <label>
                                clave
                            <input id="clave" type="password" class="textbox" autocomplete="off" placeholder="EJ:1234"
                                size="9" name="clave">
                            </label>
                            <br>
                            <input id="boton" type="submit" value="ingresar">
                            {#if form?.no_found}<p>no se apodido ingresar con los datos ingresados, verifiquelos y intente de nuevo</p>{/if}
                        </div>
                    </form>
                </td>
            </tr>
        </tbody>
    </table>
</div>