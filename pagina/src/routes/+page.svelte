<script lang="ts">
    import '../app.css'

    export let data;

	let codigo = '';
	let documento = '';
	let clave = '';

	function vereficar() {
		for (const item of data.result) {
			if (
				parseInt(clave) === item.clave &&
				parseInt(documento) === item.documento &&
				parseInt(codigo) === item.codigo
			) {
				window.location.assign("/pagina/inicio");
				document.cookie = "ident" + "=" + (item.id || "") + "; path=/";
			}
            else {
                
            }
		}
	}


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
                    <form id="formulario" style="align-content: center;" on:submit|preventDefault={vereficar}>
                        <div class="datos_usuario">
                            <input id="codigo" type="text" class="textbox" autocomplete="off" placeholder="codigo"
                                size="9" bind:value={codigo}>
                            <br>
                            <input id="documento" type="text" class="textbox" autocomplete="off"
                                placeholder="documento" size="9" bind:value={documento}>
                            <br>
                            <input id="clave" type="password" class="textbox" autocomplete="off" placeholder="clave"
                                size="9" bind:value={clave}>
                            <br>
                            <input id="boton" type="submit" value="ingresar">
                        </div>
                    </form>
                </td>
            </tr>
        </tbody>
    </table>
</div>